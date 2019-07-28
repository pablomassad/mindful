import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ChartsModule } from 'ng2-charts';
import { RouterModule } from '@angular/router';
// import 'hammerjs';
// import 'chartjs-plugin-zoom';

import { AdminPage } from './admin';

@NgModule({
   imports: [
      ChartsModule,
      IonicModule,
      RouterModule.forChild([
         {
            path: '',
            component: AdminPage
         }
      ])
   ],
   declarations: [AdminPage],
   entryComponents: [],
   providers: []
})
export class AdminModule {
   constructor() {
      console.log('AdminModule constructor');
   }
}
