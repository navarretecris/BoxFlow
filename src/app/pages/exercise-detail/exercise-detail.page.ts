import { SafeUrlPipe } from './../../pipes/safe-url.pipe';
import { NavController } from '@ionic/angular/standalone';
// Importaciones necesarias de Angular e Ionic
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,
  IonButtons, IonThumbnail, IonLabel, IonItem, IonList, IonIcon,
  IonText, IonGrid, IonRow, IonCol, IonButton ,IonFab, IonFabButton, IonSpinner } from '@ionic/angular/standalone';
import { ExercisesService} from 'src/app/services/exercises.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-exercise-detail',
  templateUrl: './exercise-detail.page.html',
  styleUrls: ['./exercise-detail.page.scss'],
  standalone: true,
  imports: [IonSpinner,
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton,
    IonButtons, IonThumbnail, IonLabel, IonItem, IonList, IonIcon,
    IonText, IonGrid, IonRow, IonCol, IonButton ,IonFab, IonFabButton, SafeUrlPipe]
})
export class ExerciseDetailPage implements OnInit {

  exercise: any = null;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private exercisesService: ExercisesService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadExercise(parseInt(id));
    }
  }

  loadExercise(id: number) {
    this.isLoading = true;
    this.exercisesService.getExerciseById(id).subscribe({
      next: (response: any) => {
        this.exercise = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar el producto';
        this.isLoading = false;
        console.error('Error:', error);
      }
    });
  }

  volverExercise() {
  this.navCtrl.navigateRoot('/exercises'); // Navega a la página de ejercicios
}

}