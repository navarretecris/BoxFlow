import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExercisesService } from 'src/app/services/exercises.service';
import { NavController, ToastController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonTextarea,
  IonSelectOption,
  IonSelect,
  IonIcon,
  IonButtons,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.page.html',
  styleUrls: ['./exercise-form.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonItem,
    IonLabel,
    IonButton,
    IonInput,
    IonTextarea,
    IonSelectOption,
    IonSelect,
    IonIcon,
  ],
})
export class ExerciseFormPage implements OnInit {
  exercise: any = {};
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExercisesService,
    private navCtrl: NavController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.cargarCategorias();
    this.cargarTipos();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.isEditing = true;
      this.exerciseService.getExerciseById(id).subscribe({
        next: (res) => (this.exercise = res),
        error: (err) => console.error(err),
      });
    }
  }

  guardarEjercicio() {
    if (this.isEditing) {
      // Modo edición
      const payload = {
        id_exercise: this.exercise.id_exercise,
        nombre: this.exercise.nombre,
        observacion: this.exercise.observacion,
        imagen: this.exercise.imagen || null,
        video: this.exercise.video || null,
        id_categoria: Number(this.exercise.id_categoria),
        id_tipo: Number(this.exercise.id_tipo),
      };

      console.log('Editando ejercicio:', payload);

      this.exerciseService.actualizar(payload).subscribe({
        next: () => {
          this.mostrarToast('Ejercicio actualizado correctamente', 'success');
          this.navCtrl.navigateRoot('/exercises');
        },
        error: (err) => {
          console.error(err);
          this.mostrarToast('Error al actualizar el ejercicio', 'danger');
        },
      });
    } else {
      // Modo creación
      const payload = {
        accion: 'alta',
        nombre: this.exercise.nombre,
        observacion: this.exercise.observacion,
        imagen: this.exercise.imagen || null,
        video: this.exercise.video || null,
        id_categoria: Number(this.exercise.id_categoria),
        id_tipo: Number(this.exercise.id_tipo),
      };

      console.log('Creando nuevo ejercicio:', payload);

      this.exerciseService.agregar(payload).subscribe({
        next: () => {
          this.mostrarToast('Ejercicio guardado correctamente', 'success');
          this.navCtrl.navigateRoot('/exercises');
        },
        error: (err) => {
          console.error(err);
          this.mostrarToast('Error al guardar el ejercicio', 'danger');
        },
      });
    }
  }

  volverExercise() {
    this.navCtrl.navigateRoot('/exercises'); // Navega a la página de ejercicios
  }

  categorias: { id_categoria: number; nombre: string }[] = [];
  tipos: { id_tipo: number; nombre: string }[] = [];

  cargarCategorias() {
  this.exerciseService.obtenerCategorias().subscribe({
    next: (res: any) => {
      console.log('Categorías cargadas:', res); // Asegúrate que vienen bien
      this.categorias = res as { id_categoria: number; nombre: string }[];
    },
    error: (err) => console.error('Error cargando categorías', err),
  });
}

cargarTipos() {
  this.exerciseService.obtenerTipos().subscribe({
    next: (res: any) => {
      console.log('Tipos cargadas:', res); 
      this.tipos = res as { id_tipo: number; nombre: string }[];
    },
    error: (err) => console.error('Error cargando tipos', err),
  });
}

async mostrarToast(mensaje: string, color: string = 'success') {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 2000,
    position: 'bottom',
    color: color
  });
  await toast.present();
}

}
