import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
    selector: 'app-plantel', // Si es standalone
    imports: [CommonModule], // Asegúrate de importar CommonModule aquí
    templateUrl: './plantel.component.html',
    styleUrls: ['./plantel.component.css']
})
export class PlantelComponent {
  selectedFoto: string | null = null;
  popupMessage: string | null = null; // Mensaje para jugadores no habilitados
  jugadores = [
    {
      apodo: 'Juan',
      nombre: 'Juan Chilcon',
      numero: 1,
      habilitado: 1,
      foto: 'assets/jugadores/1_Juan.jpg',
    },
    {
      apodo: 'Irwin',
      nombre: 'Irwin Vásquez',
      numero: 3,
      habilitado: 1,
      foto: 'assets/jugadores/3_Irwin.jpg',
    },
    {
      apodo: 'Victor',
      nombre: 'Victor Mendoza',
      numero: 4,
      habilitado: 0,
      foto: 'assets/jugadores/4_Victor.jpg',
    },
    {
      apodo: 'Marco',
      nombre: 'Marco Paz',
      numero: 4,
      habilitado: 1,
      foto: 'assets/jugadores/4_Marco.jpg',
    },
    {
      apodo: 'Junior',
      nombre: 'Junior Cabanillas',
      numero: 5,
      habilitado: 1,
      foto: 'assets/jugadores/5_Junior.jpg',
    },
    {
      apodo: 'Angello',
      nombre: 'Angello Salazar',
      numero: 6,
      habilitado: 0,
      foto: 'assets/jugadores/6_Angello.jpg',
    },
    {
      apodo: 'Cristian',
      nombre: 'Cristian Villalobos',
      numero: 7,
      habilitado: 0,
      foto: 'assets/jugadores/7_Cristian.jpg',
    },
    {
      apodo: 'Willy',
      nombre: 'Willy Morales',
      numero: 7,
      habilitado: 1,
      foto: 'assets/jugadores/7_Willy.jpg',
    },
    {
      apodo: 'Luis',
      nombre: 'Luis Hernández',
      numero: 8,
      habilitado: 0,
      foto: 'assets/jugadores/8_Luis.jpg',
    },
    {
      apodo: 'Bautista',
      nombre: 'Gerson Bautista',
      numero: 9,
      habilitado: 0,
      foto: 'assets/jugadores/9_Bautista.jpg',
    },
    {
      apodo: 'Peluche',
      nombre: 'Segundo Laynes',
      numero: 10,
      habilitado: 1,
      foto: 'assets/jugadores/10_Peluche.jpg',
    },
    {
      apodo: 'Ivan',
      nombre: 'Ivan Morales',
      numero: 11,
      habilitado: 1,
      foto: 'assets/jugadores/11_Ivan.jpg',
    },
    {
      apodo: 'Tommy',
      nombre: 'Tommy Huamán',
      numero: 11,
      habilitado: 0,
      foto: 'assets/jugadores/0_Tommy.jpg',
    },
    {
      apodo: 'Alejandro',
      nombre: 'Alejandro Gálvez',
      numero: 14,
      habilitado: 0,
      foto: 'assets/jugadores/14_Alejandro.jpg',
    },
    {
      apodo: 'Olano',
      nombre: 'Alexander Olano',
      numero: 16,
      habilitado: 0,
      foto: 'assets/jugadores/16_Alexander.jpg',
    },
    {
      apodo: 'Yuhsef',
      nombre: 'Yuhsef Julian',
      numero: 17,
      habilitado: 1,
      foto: 'assets/jugadores/17_Yuhsef.jpg',
    },
    {
      apodo: 'Maxi',
      nombre: 'Maximiliano Farroñan',
      numero: 19,
      habilitado: 0,
      foto: 'assets/jugadores/19_Maxi.jpg',
    },
    {
      apodo: 'Danny',
      nombre: 'Danny Miranda',
      numero: 23,
      habilitado: 0,
      foto: 'assets/jugadores/23_Danny.jpg',
    },
    {
      apodo: 'Gerson',
      nombre: 'Gerson Barturen',
      numero: 25,
      habilitado: 0,
      foto: 'assets/jugadores/25_Gerson.jpg',
    },
    {
      apodo: 'Anderson',
      nombre: 'Anderson Ruiz',
      numero: 14,
      habilitado: 0,
      foto: 'assets/jugadores/0_Anderson.jpg',
    },
    {
      apodo: 'Cristofer',
      nombre: 'Cristofer Rimarachin',
      numero: 0,
      habilitado: 0,
      foto: 'assets/jugadores/0_Cristofer.jpg',
    },
    {
      apodo: 'Klismar',
      nombre: 'Klismar Chinchay',
      numero: 93,
      habilitado: 1,
      foto: 'assets/jugadores/0_Klismar.jpg',
    },
    {
      apodo: 'Maycol',
      nombre: 'Maycol Chávez',
      numero: 0,
      habilitado: 0,
      foto: 'assets/jugadores/0_Maicol.jpg',
    },
    // Agrega más jugadores aquí
  ];

  comandoTecnico = [
    {
      apodo: 'William',
      nombre: 'William Rojas',
      foto: 'assets/tecnicos/Tec_William.jpg',
    },
    {
      apodo: 'Carmona',
      nombre: 'Luis Carmona',
      foto: 'assets/tecnicos/Tec_Carmona.jpg',
    },
    // Agrega más integrantes del comando técnico aquí
  ];

  verFoto(foto: string): void {
    this.selectedFoto = foto;
    this.popupMessage = null; // Limpia cualquier mensaje anterior
  }

  mostrarMensaje(nombre: string): void {
    this.selectedFoto = null; // Limpia cualquier foto seleccionada
    this.popupMessage = `Jugador ${nombre} aún no habilitado`; // Muestra el mensaje
  }

  cerrarFoto(): void {
    this.selectedFoto = null;
    this.popupMessage = null;
  }
}
