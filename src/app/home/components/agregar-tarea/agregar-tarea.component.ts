import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { Tarea } from '../../interfaces/interfaces';
import { TareasService } from '../../services/tareas.service';

@Component({
  selector: 'app-agregar-tarea',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
  ],
  templateUrl: './agregar-tarea.component.html',
  styleUrls: ['./agregar-tarea.component.css'],
})
export class AgregarTareaComponent {
  formulario: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
  });

  tarea!: Tarea;

  constructor(
    private fb: FormBuilder,
    private tareasService: TareasService,
  ) {}

  agregarTarea() {
    this.tarea = {
      nombre: this.formulario.get('nombre')?.value,
      descripcion: this.formulario.get('descripcion')?.value,
      estado: false,
    };

    this.tareasService.tarea = this.tarea;

    this.formulario.reset();
  }
}
