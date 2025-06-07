import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AlertController, NavController, IonicModule } from '@ionic/angular';
import { ClasesService, ClassType } from '../../services/clases.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class ClasesPage implements OnInit {
  types: ClassType[] = [];
  form: FormGroup;
  isEditing = false;

  constructor(
    private navCtrl: NavController,
    private service: ClasesService,
    private fb: FormBuilder,
    private alertCtrl: AlertController
  ) {
    this.form = this.fb.group({
      id_class_type: [null],
      nombre: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadTypes();
    this.cancel();
  }

   private loadTypes() {
    this.service.list().subscribe(data => this.types = data);
  }

  edit(type: ClassType) {
    this.isEditing = true;
    this.form.patchValue(type);
  }

  delete(type: ClassType) {
    this.alertCtrl.create({
      header: 'Confirmar',
      message: `¿Eliminar tipo de clase '${type.nombre}'?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          handler: () => {
            this.service.eliminar(type.id_class_type)
              .subscribe(() => this.loadTypes());
          }
        }
      ]
    }).then(alert => alert.present());
  }

  submit() {
    if (this.form.invalid) return;

    const data = this.form.value as ClassType;

    if (this.isEditing) {
      this.service.actualizar(data).subscribe(() => this.finish());
    } else {
      this.service.agregar({ nombre: data.nombre }).subscribe(() => this.finish());
    }
  }

  private finish() {
    this.loadTypes();
    this.cancel();
  }

  cancel() {
    this.isEditing = false;
    this.form.reset();
  }

   volverHome() {
    this.navCtrl.navigateRoot('/home');
  }
}