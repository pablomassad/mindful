import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { UsuarioService } from './usuario.service'
import { UsuarioPage } from './usuario'
import { DBService } from '../shared/services/db.service';

@NgModule({
  imports: [
    IonicModule
  ],
  declarations: [ UsuarioPage ],
  entryComponents: [ ],
  providers: [
    UsuarioService,
    DBService
  ]
})
export class UsuarioModule {
  constructor() {
    console.log('UsuarioModule constructor');
  }
}
