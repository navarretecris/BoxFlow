import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular/standalone';
import {
  ScheduledClassesService,
  ScheduledClass,
} from 'src/app/services/scheduled-classes.service';
import { ClasesService, ClassType } from 'src/app/services/clases.service';
import { InstructorsService } from 'src/app/services/instructors.service';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonSelectOption,
  IonList,
  IonCard,
  IonText,
  IonSelect,
  IonInput,
  IonDatetime,
  IonModal,
  IonNote

} from '@ionic/angular/standalone';

interface Instructor {
  id_instructor: number;
  nombre: string;
}

@Component({
  selector: 'app-scheduled-classes',
  templateUrl: './scheduled-classes.page.html',
  styleUrls: ['./scheduled-classes.page.scss'],
  standalone: true,
  imports: [
    IonButton,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonButtons,
    IonIcon,
    IonItem,
    IonLabel,
    IonSelectOption,
    IonList,
    IonCard,
    IonText,
    ReactiveFormsModule,
    IonSelect,
    IonInput,
    IonDatetime,
    IonModal,
    IonNote
  
  ],
})
export class ScheduledClassesPage implements OnInit {
  clases: ScheduledClass[] = [];
  form: FormGroup;
  isEditing = false;
  tiposClase: ClassType[] = [];
  instructores: Instructor[] = [];
  mostrarModal = false; // Nuevo: control del modal

  constructor(
    private service: ScheduledClassesService,
    private fb: FormBuilder,
    private alertCtrl: AlertController,
    private clasesService: ClasesService,
    private http: HttpClient,
    private navCtrl: NavController,
    private instructorsService: InstructorsService,
    private toastCtrl: ToastController
  ) {
    this.form = this.fb.group({
      id_class: [null],
      id_class_type: [null, Validators.required],
      dia_semana: ['', Validators.required],
      hora: ['', Validators.required],
      cupo_maximo: [null, Validators.required],
      duracion: [null, Validators.required],
      id_instructor: [null, Validators.required],
      
    });
  }

  ngOnInit() {
    this.loadData();
    this.cancel();
  }

 private loadData() {
  this.service.listar().subscribe((res) => (this.clases = res.datos));
  this.clasesService.list().subscribe((data) => (this.tiposClase = data));
  this.instructorsService.listar().subscribe((res) => (this.instructores = res.datos));
}

  edit(clase: ScheduledClass) {
    this.isEditing = true;
    this.form.patchValue(clase);
  }

  eliminar(clase: ScheduledClass) {
  this.alertCtrl
    .create({
      header: 'Confirmar',
      message: `¿Eliminar clase del ${clase.dia_semana} a las ${clase.hora}?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.service.eliminar(clase.id_class).subscribe(() => {
              this.mostrarMensajeExito('Clase eliminada correctamente.');
              this.loadData();
            });
          },
        },
      ],
    })
    .then((alert) => alert.present());
}

  submit() {
  if (this.form.invalid) return;

  const data = this.form.value as ScheduledClass;

  if (this.isEditing) {
    this.service.modificar(data).subscribe(() => {
      this.mostrarMensajeExito('Clase actualizada correctamente.');
      this.finish();
    });
  } else {
    this.service.agregar(data).subscribe(() => {
      this.mostrarMensajeExito('Clase agregada correctamente.');
      this.finish();
    });
  }
}

  private finish() {
    this.loadData();
    this.cancel();
  }

  abrirModal() {
    this.isEditing = false;
    this.form.reset();
    this.mostrarModal = true;
  }

  cancel() {
    this.isEditing = false;
    this.form.reset();
    this.mostrarModal = false;
  }

  volverHome() {
    this.navCtrl.navigateBack('/home');
  }

mostrarSelectorHora = false;

abrirSelectorHora() {
  this.mostrarSelectorHora = true;
}

cerrarSelectorHora() {
  this.mostrarSelectorHora = false;
}

onHoraChange(event: any) {
  const isoTime = event.detail.value;
  if (isoTime) {
    const d = new Date(isoTime);
    const hh = d.getHours().toString().padStart(2, '0');
    const mm = d.getMinutes().toString().padStart(2, '0');
    const horaFormateada = `${hh}:${mm}`;
    this.form.get('hora')?.setValue(horaFormateada);
    this.form.markAsDirty();
    this.mostrarSelectorHora = false; // Cierra el modal
  }
}

private mostrarMensajeExito(mensaje: string) {
  this.toastCtrl.create({
    message: mensaje,
    duration: 2000,
    position: 'top',
    color: 'success' // También puedes usar 'warning', 'danger' según el caso
  }).then(toast => toast.present());
}

private mostrarMensajeError(mensaje: string) {
  this.toastCtrl.create({
    message: mensaje,
    duration: 2500,
    position: 'top',
    color: 'danger'
  }).then(toast => toast.present());
}


}
