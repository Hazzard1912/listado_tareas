import { Injectable } from '@angular/core';
import { Tarea } from '../interfaces/interfaces';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  listadoTareas: Tarea[] = [];

  private listadoTareasSubject: Subject<Tarea[]> = new Subject<Tarea[]>();

  get listadoTareas$() {
    return this.listadoTareasSubject.asObservable();
  }

  set tarea(tarea: Tarea) {
    this.listadoTareas.push(tarea);
    this.listadoTareasSubject.next(this.listadoTareas);
  }

  constructor() {}

  cambiarEstado(nombre: string): void {
    const tarea = this.listadoTareas.find((tarea) => tarea.nombre === nombre);

    if (tarea) {
      const tareaIndex = this.listadoTareas.findIndex(
        (tarea) => tarea.nombre === nombre
      );
      this.listadoTareas[tareaIndex].estado =
        !this.listadoTareas[tareaIndex].estado;
    }
    this.listadoTareasSubject.next(this.listadoTareas);
  }
}
