export interface Player {
  nombre: string;
  AP: number; // Acreditación Pastoral
  CC: number; // Caja Chica
  RF: number; // Requerimiento Físico
  CI: number; // Compromiso con la Iglesia
  RT: number; // Reglamento y Testimonio
}

export interface PlayerWithAverage extends Player {
  promedio: number;
}