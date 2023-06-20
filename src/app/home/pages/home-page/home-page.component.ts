import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Tarea } from '../../interfaces/interfaces';
import { TareasService } from '../../services/tareas.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Subscription } from 'rxjs';
import { AnimateModule } from 'primeng/animate';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, AnimateModule],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit, OnDestroy {
  tareasPendientes: Tarea[] = [];
  listaTareas: Tarea[] = [];
  tareasCompletadas: Tarea[] = [];
  private tareasSubscripcion!: Subscription;

  verTareasCompletadas: boolean = false;
  verTareasPendientes: boolean = false;
  verTodasLasTareas: boolean = true;

  constructor(private tareasService: TareasService) {}

  ngOnInit(): void {
    this.tareasSubscripcion = this.tareasService.listadoTareas$.subscribe(
      (tareas: Tarea[]) => {
        this.listaTareas = tareas;
        this.actualizarTareas();
      }
    );
  }

  cambiarEstado(nombre: string) {
    this.tareasService.cambiarEstado(nombre);
  }

  private actualizarTareas() {
    this.tareasPendientes = this.listaTareas.filter((tarea) => !tarea.estado);
    this.tareasCompletadas = this.listaTareas.filter((tarea) => tarea.estado);
  }

  ngOnDestroy(): void {
    this.tareasSubscripcion.unsubscribe();
  }

  cambiarVista(nombre: string) {
    switch (nombre) {
      case 'completadas':
        this.verTareasCompletadas = true;
        this.verTodasLasTareas = false;
        this.verTareasPendientes = false;
        break;

      case 'pendientes':
        this.verTareasCompletadas = false;
        this.verTodasLasTareas = false;
        this.verTareasPendientes = true;
        break;

      case 'todas':
        this.verTareasCompletadas = false;
        this.verTodasLasTareas = true;
        this.verTareasPendientes = false;
        break;
      default:
        break;
    }
  }
}
