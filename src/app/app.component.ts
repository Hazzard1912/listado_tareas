import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { AgregarTareaComponent } from './home/components/agregar-tarea/agregar-tarea.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HomePageComponent, AgregarTareaComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'listado-tareas';
}
