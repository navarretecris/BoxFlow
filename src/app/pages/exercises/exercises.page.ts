import { NavController, IonBackButton, IonAvatar, IonFab } from '@ionic/angular/standalone';
// Importaciones necesarias de Angular e Ionic
import { Component, OnInit } from '@angular/core';
import { ExercisesService } from 'src/app/services/exercises.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton,
  IonButtons, IonRefresher, IonRefresherContent, IonIcon,
  IonSpinner, IonText, IonItem, IonLabel, IonList, IonThumbnail,
  IonInfiniteScroll, IonInfiniteScrollContent, IonCard, IonCardContent, IonMenuButton, IonFabButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
  standalone: true,
  imports: [IonFab, IonAvatar, IonBackButton,  // Todos los componentes/directivas que necesita este componente
    IonIcon, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonButton, IonButtons, IonRefresher,
    IonRefresherContent, IonSpinner, IonText, IonItem, IonLabel,
    IonList, IonThumbnail, IonInfiniteScroll, IonInfiniteScrollContent, IonCard, IonCardContent, IonMenuButton, IonFab, IonFabButton]
})
export class ExercisesPage implements OnInit {
 // Propiedades de la clase:

  // Array para almacenar los artículos/ejercicios
  articulos: any[] = [];

  // Flag para indicar si está cargando datos iniciales
  isLoading = false;

  // Flag para indicar si está cargando más datos (paginación)
  isLoadingMore = false;

  // Mensaje de error para mostrar al usuario
  errorMessage = '';

  // Flag para controlar si hay más datos por cargar
  hasMoreData = true;

  // Constructor: inyecta el ejercicio exercisesService
  constructor(private exerciseService: ExercisesService, private navCtrl: NavController) { }

  // Metodo del ciclo de vida: se ejecuta al inicializar el componente

  ngOnInit() {
    this.cargarArticulos(); // Carga los artículos al inicializar el componente
  }


  /**
   * Método para cargar los artículos iniciales
   * - Reinicia los estados de carga
   * - Hace la petición al servicio
   * - Maneja la respuesta y los errores
   */
  cargarArticulos() {
    this.isLoading = true; // Activa flag de carga
    this.errorMessage = ''; // Limpia mensajes de error previos
    this.articulos = []; // Vacía el array de artículos
    this.hasMoreData = true; // Asume que hay más datos por cargar

    // Llama al servicio para obtener los artículos
    this.exerciseService.recuperarTodos().subscribe({
      next: (result: any) => {
        // Si la respuesta es un array, lo asigna, sino array vacío
        this.articulos = Array.isArray(result) ? result : [];
        this.isLoading = false; // Desactiva flag de carga

        // Determina si hay más datos (si la respuesta no está vacía)
        this.hasMoreData = result.length > 0;
      },
      error: (error) => {
        this.errorMessage = 'Error al cargar los productos'; // Mensaje de error
        this.isLoading = false; // Desactiva flag de carga
        console.error("Error al recuperar los datos", error); // Log del error
      }
    });
  }

  /**
   * Método para cargar más artículos (paginación)
   * @param event Evento del infinite-scroll
   */
  cargarMasArticulos(event: any) {
    // Si no hay más datos, deshabilita el infinite-scroll y retorna
    if (!this.hasMoreData) {
      event.target.disabled = true;
      return;
    }

    this.isLoadingMore = true; // Activa flag de carga adicional

    // Llama al servicio para cargar más artículos
    this.exerciseService.loadMore().subscribe({
      next: (result: any) => {
        // Procesa los nuevos artículos
        const nuevosArticulos = Array.isArray(result) ? result : [];

        // Concatena los nuevos artículos con los existentes
        this.articulos = [...this.articulos, ...nuevosArticulos];

        // Determina si hay más datos por cargar
        this.hasMoreData = nuevosArticulos.length > 0;
        this.isLoadingMore = false; // Desactiva flag de carga

        // Completa el evento del infinite-scroll
        event.target.complete();

        // Si no hay más datos, deshabilita el infinite-scroll
        if (!this.hasMoreData) {
          event.target.disabled = true;
        }
      },
      error: (error) => {
        console.error("Error al cargar más artículos", error);
        this.isLoadingMore = false; // Desactiva flag de carga
        event.target.complete(); // Completa el evento aunque haya error
      }
    });
  }

  /**
   * Método para refrescar/recargar los artículos
   * @param event Evento del ion-refresher
   */
  refrescarArticulos(event: any) {
    this.cargarArticulos(); // Vuelve a cargar los artículos
    event.target.complete(); // Completa el evento de refresco
  }



  verDetalleExercise(id: number) {

    this.navCtrl.navigateForward(`/exercise-detail/${id}`, {
      animationDirection: 'forward'
    }); // Navegación optimizada para Ionic


  }

  volverHome() {
  this.navCtrl.navigateRoot('/home');
}

crearNuevoEjercicio() {
  console.log('Redirigiendo al formulario...');
  this.navCtrl.navigateForward('/exercise-form');
}


}