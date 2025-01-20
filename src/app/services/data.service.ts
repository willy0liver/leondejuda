import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataUrl = 'assets/data.json'; // Ruta del archivo JSON

  constructor(private http: HttpClient) {
    console.log('Data Service is working');
  }

  // Método para obtener los datos
  getData(): Observable<any> {
    return this.http.get(this.dataUrl);
  }
}
