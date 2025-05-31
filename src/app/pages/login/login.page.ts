import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonProgressBar, IonTitle, IonToolbar,
  IonItem, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle,
  IonCardTitle, IonInput, IonText, MenuController
} from '@ionic/angular/standalone';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonText, IonContent, IonHeader, IonProgressBar, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonItem, IonButton, IonCard, IonCardContent,
    IonCardHeader, IonCardSubtitle, IonCardTitle, IonInput
  ]
})
export class LoginPage implements OnInit {

  isLoading: boolean = true;
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private navCtrl: NavController,
    private toastController: ToastController,
    private menuCtrl: MenuController // 👈 inyectar MenuController
  ) {}

  async ngOnInit() {
    await new Promise(resolve => setTimeout(resolve, 5000));
    this.isLoading = false;

    // 👇 al entrar al login, desactiva el menú por seguridad
    this.menuCtrl.enable(false);
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
      position: 'top',
      color: 'danger'
    });
    await toast.present();
  }

  onLogin() {
  this.authService.login(this.username, this.password).subscribe(
    (response: any) => {
      if (response.success) {
        // ✅ Guarda en servicio y emite el cambio globalmente
        this.authService.setUser(response.user);

        // ✅ Activa el menú
        this.menuCtrl.enable(true);

        // ✅ Navega al home
        this.navCtrl.navigateRoot('/home');
      } else {
        this.presentToast('Incorrect username or password.');
      }
    },
    (error) => {
      console.error('Error en la solicitud:', error);
      this.presentToast('Connection error. Please try again.');
    }
  );
}
}