import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonFooter, IonTabBar, IonTabButton, IonItem, IonLabel, IonContent, IonSegmentButton, IonSegment, IonMenuButton , IonButton , IonHeader, IonTitle, IonToolbar ,IonIcon, NavController, IonButtons, IonNote, IonCard } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonFooter, IonTabBar, IonTabButton, IonItem, IonLabel, IonNote, IonButtons, IonSegmentButton, IonSegment, IonMenuButton, IonContent, IonButton , IonHeader, IonTitle, IonToolbar, IonCard, CommonModule, FormsModule, IonIcon]
})
export class HomePage implements OnInit {

  constructor() {}

  ngOnInit() {
    // Ya no necesitas cargar el usuario aquí
  }

}