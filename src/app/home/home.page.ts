import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Emotion } from '../shared/interfaces/emotion';
import { GlobalService, ApplicationService } from 'fwk4-services';
import { UserModel } from 'fwk4-authentication';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
   counter:number = 0
   user:UserModel

   constructor(
      private afs: AngularFirestore,
      private appSrv: ApplicationService,
      private globalSrv: GlobalService
   ) {
      console.log('HomePage constructor')
   }

   async ngOnInit() {
      this.user = this.globalSrv.getItemRAM('userInfo')
      await this.record()
      await this.shuttingDownTimeout(5)
   }

   record(){
      var reg = new Emotion();
      reg.emotion = 'Consciencia';
      reg.user = this.user.displayName;
      reg.datetime = new Date().getTime();

      const pr = this.saveEmotion(reg).then(x => {
         this.appSrv.message('Se ha registrado la emocion!');
      }).catch(err => {
         this.appSrv.message('Error: ', 'Ha ocurrido un error al registrar la emocion!');
      })
      return pr
   }

   private saveEmotion(pl): Promise<any> {
      //const path = `emotions/${pl.user}_${pl.datetime}`;
      const path = `emotions/${pl.user}_${pl.datetime}`;
      var p = this.afs.doc(path).set(Object.assign({}, pl));
      // var ref = this.afs.collection<Emotion>('emotions');
      // var p = ref.add({ ...pl });
      return p;
   }
   private async shuttingDownTimeout(secs) {
      this.counter = secs
      while (this.counter > 0) {
         await this.sleep(1)
         console.log('shutting down in ... ',this.counter)
         this.counter--
      } 
      navigator['app'].exitApp()
   }
   private sleep(tout) {
      return new Promise((resolve) => {
         setTimeout(() => {
            resolve()
         }, tout * 1000)
      })
   }
}
