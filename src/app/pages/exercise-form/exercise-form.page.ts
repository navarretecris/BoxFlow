import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExercisesService } from 'src/app/services/exercises.service';
import { NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonButton, IonInput, IonTextarea, IonSelectOption, IonSelect, IonIcon, IonButtons } from '@ionic/angular/standalone';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.page.html',
  styleUrls: ['./exercise-form.page.scss'],
  standalone: true,
  imports: [IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonButton, IonInput, IonTextarea, IonSelectOption, IonSelect, IonIcon]
})
export class ExerciseFormPage implements OnInit {

  exercise: any = {};
  isEditing = false;

  constructor(
    private route: ActivatedRoute,
    private exerciseService: ExercisesService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      const id = Number(idParam);
      this.isEditing = true;
      this.exerciseService.getExerciseById(id).subscribe({
        next: (res) => this.exercise = res,
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
        imagen: this.exercise.imagen,
        video: this.exercise.video,
        id_categoria: Number(this.exercise.id_categoria),
        id_tipo: Number(this.exercise.id_tipo)
      };

      console.log('Editando ejercicio:', payload);

      this.exerciseService.actualizar(payload).subscribe({
        next: () => {
          alert('Ejercicio actualizado correctamente');
          this.navCtrl.navigateRoot('/exercises');
        },
        error: (err) => {
          console.error(err);
          alert('Error al actualizar el ejercicio');
        },
      });

    } else {
      // Modo creación
      const payload = {
        accion: 'alta',
        nombre: this.exercise.nombre,
        observacion: this.exercise.observacion,
        imagen: this.exercise.imagen,
        video: this.exercise.video,
        id_categoria: Number(this.exercise.id_categoria),
        id_tipo: Number(this.exercise.id_tipo)
      };

      console.log('Creando nuevo ejercicio:', payload);

      this.exerciseService.agregar(payload).subscribe({
        next: () => {
          alert('Ejercicio guardado correctamente');
          this.navCtrl.navigateRoot('/exercises');
        },
        error: (err) => {
          console.error(err);
          alert('Error al guardar el ejercicio');
        },
      });
    }
  }

  categorias = [1, 2, 3, 4, 5, 6];
  tipos = Array.from({ length: 34 }, (_, i) => i + 1);

   volverExercise() {
  this.navCtrl.navigateRoot('/exercises'); // Navega a la página de ejercicios
}

}