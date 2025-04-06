import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../src/app/services/data.service';
import { ChartConfiguration } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';

@Component({
    selector: 'app-metricas',
    imports: [CommonModule, FormsModule, NgChartsModule],
    templateUrl: './metricas.component.html',
    styleUrl: './metricas.component.css'
})
export class MetricasComponent implements OnInit{
  atributos = ['km', 'entrenamiento', 'iglesia', 'caja chica'];
  atributoSeleccionado = 'km';
  datos: any[] = [];
  chartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: '',
      },
    ],
  };

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    this.dataService.getData().subscribe((data) => {
      this.datos = data;
      this.actualizarGrafico();
    });
  }

  actualizarGrafico() {
    const sumaPorJugador: { [nombre: string]: number } = {};

    this.datos.forEach((registro) => {
      const nombre = registro.nombre;
      const valor = registro[this.atributoSeleccionado];

      if (!sumaPorJugador[nombre]) {
        sumaPorJugador[nombre] = 0;
      }

      if (this.atributoSeleccionado === 'entrenamiento' || this.atributoSeleccionado === 'iglesia') {
        if (valor === 'S') {
          sumaPorJugador[nombre] += 1;
        }
      } else {
        sumaPorJugador[nombre] += Number(valor) || 0;
      }
    });

    const jugadoresOrdenados = Object.entries(sumaPorJugador)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    this.chartData.labels = jugadoresOrdenados.map((j) => j[0]);
    this.chartData.datasets[0].data = jugadoresOrdenados.map((j) => j[1]);
    this.chartData.datasets[0].label = this.atributoSeleccionado;
  }

}
