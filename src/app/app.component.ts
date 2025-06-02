import { Component, OnInit } from '@angular/core';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  NavController,
  IonFooter,
  MenuController
} from '@ionic/angular/standalone';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service'; // ✅ Importa tu servicio

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    IonIcon,
    IonLabel,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonFooter
  ],
})
export class AppComponent implements OnInit {
  user: any;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService, // ✅ Inyecta el servicio
    private menuCtrl: MenuController // ✅ Inyecta el controlador de menú
  ) {}

  ngOnInit() {
    // ✅ Escucha cambios en el usuario desde el servicio
    this.authService.currentUser.subscribe(user => {
      this.user = user;
    });
  }

  logout() {
    this.authService.clearUser(); // ✅ Limpia desde el servicio también
    this.navCtrl.navigateRoot('/login');
  }

  goToHome() {
    this.menuCtrl.close();
    this.navCtrl.navigateForward('/home');
  }

  goToExercises() {
    this.menuCtrl.close();
    this.navCtrl.navigateForward('/exercises');
  }

}