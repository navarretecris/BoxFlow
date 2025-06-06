import { NavController, IonBackButton, IonAvatar, IonFab } from '@ionic/angular/standalone';
// Importaciones necesarias de Angular e Ionic
import { Component, OnInit } from '@angular/core';
import { ExercisesService } from 'src/app/services/exercises.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
  IonButtons, IonRefresher, IonRefresherContent, IonIcon,
  IonSpinner, IonText, IonItem, IonLabel, IonList, IonThumbnail,
  IonInfiniteScroll, IonInfiniteScrollContent, IonCard, IonCardContent, IonMenuButton, IonFabButton, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
  standalone: true,
  imports: [IonFab, IonAvatar, IonBackButton,  // Todos los componentes/directivas que necesita este componente
    IonIcon, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonButton, IonButtons, IonRefresher,
    IonRefresherContent, IonSpinner, IonText, IonItem, IonLabel,
    IonList, IonThumbnail, IonInfiniteScroll, IonInfiniteScrollContent, IonCard, IonCardContent, IonMenuButton, IonFab, IonFabButton, IonSearchbar ]
})
export class ExercisesPage implements OnInit {
articulos: any[] = [];
  articulosFiltrados: any[] = [];
  isLoading = false;
  searchTerm = '';

  constructor(
    private exercisesService: ExercisesService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.cargarArticulos();
  }

  cargarArticulos() {
    this.isLoading = true;
    this.exercisesService.recuperarTodos().subscribe({
      next: (res: any) => {
        this.articulos = res;
        this.filtrarEjercicios();
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  refrescarArticulos(event: any) {
    this.cargarArticulos();
    event.target.complete();
  }

  cargarMasArticulos(event: any) {
    this.exercisesService.loadMore().subscribe({
      next: (res: any) => {
        this.articulos = [...this.articulos, ...res];
        this.filtrarEjercicios();
        event.target.complete();
      },
      error: (err) => {
        console.error(err);
        event.target.complete();
      }
    });
  }

  crearNuevoEjercicio() {
    this.navCtrl.navigateForward('/exercise-form');
  }

  verDetalleExercise(id: number) {
    this.navCtrl.navigateForward(`/exercise-detail/${id}`);
  }

  volverHome() {
    this.navCtrl.navigateRoot('/home');
  }

  filtrarEjercicios() {
  const termino = this.searchTerm.trim();

  if (termino.length > 0) {
    this.isLoading = true;
    this.exercisesService.buscarEjercicios(termino).subscribe({
      next: (res: any) => {
        this.articulosFiltrados = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  } else {
    this.articulosFiltrados = this.articulos; // Restablece la lista
  }
}
}