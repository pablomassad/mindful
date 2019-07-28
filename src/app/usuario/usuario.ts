import { Component, OnInit, NgZone } from '@angular/core'
import { NavController, NavParams, ModalController, ActionSheetController } from '@ionic/angular'
import { environment } from '../../environments/environment'

import { Emotion } from '../shared/interfaces/emotion'

import { AuthService } from 'fwk4-authentication'
import { ApplicationService, GlobalService } from 'fwk4-services'
import { DBService } from '../shared/services/db.service';
import { Router } from '@angular/router';


@Component({
   selector: 'page-usuario',
   templateUrl: 'usuario.html'
})
export class UsuarioPage implements OnInit {
   emotions: any
   user: any
   disableButtons: boolean = false
   lastEmo: any
   photoPath: string
   totals: any = {}

   constructor(
      private authSrv: AuthService,
      private actionCtrl: ActionSheetController,
      private navCtrl: NavController,
      private navParams: NavParams,
      private appSrv: ApplicationService,
      private globalSrv: GlobalService,
      private fs: DBService,
      private route:Router
   ) {
      console.log('UsuarioPage constructor');
      this.emotions = [
         { img: "assets/imgs/happy.png", txt: "Alegria", color: 'yellow' },
         { img: "assets/imgs/angry.png", txt: "Queja", color: '#9d3a9e' },
         { img: "assets/imgs/thanksfull.png", txt: "Agradecimiento", color: 'green' },
         { img: "assets/imgs/sad.png", txt: "Tristeza", color: '#0089ff' },
         { img: "assets/imgs/lover.png", txt: "Amor", color: 'red' },
         { img: "assets/imgs/scared.png", txt: "Miedo", color: '#71687b' }
      ];
      this.user = this.navParams.get('usr')
      this.appSrv.message('Bienvenido: ' + this.user.displayName)
      this.photoPath = (this.user.photoURL)?this.user.photoURL:"assets/imgs/person.png"

      const isMobile = this.globalSrv.getItem('isMobile')
      if (isMobile) {
         // this.oneSignal.setLogLevel({ logLevel: 1, visualLevel: 1 })
         // const firebaseConfig = ENVIRONMENTS.firebase   
         // const oneSignalId = ENVIRONMENTS.oneSignalId
         // //this.oneSignal.startInit('994ca981-ece6-48b8-bc11-154ec73066db', '966739792993')
         // this.oneSignal.startInit(oneSignalId, firebaseConfig.messagingSenderId)

         // this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None)
         // //this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert)

         // this.oneSignal.handleNotificationReceived().subscribe((x) => {
         //    this.appSrv.basicAlert(JSON.stringify(x))
         // })
         // this.oneSignal.handleNotificationOpened().subscribe((x) => {
         //    this.appSrv.basicAlert(JSON.stringify(x))
         // })
         // this.oneSignal.endInit();
         // this.oneSignal.sendTag('legajo', this.user.legajo)
         // this.oneSignal.getIds().then(x => { //x.userId: id de app cliente  -  x.pushToken: random chars
         //    console.log(JSON.stringify(x))
         // })
      }  
   }

   ngOnInit() {
      console.log('UsuarioPage init');
      this.fs.getTotals(this.user.uid).subscribe(t => {
         if (t != null)
            this.totals = t;
      });
      this.globalSrv.getItem('lastEmo').then(x => {
         this.lastEmo = x;
      });
      this.globalSrv.getItem('pushData').then(x => {
         if (x != null)
            this.evalNotification(x);
      })
   }

   tapEmo(ev, emo) {
      var reg = new Emotion();
      reg.emotion = emo.txt;
      reg.user = this.user.uid;
      reg.datetime = new Date().getTime();
      this.disableButtons = true;
      setTimeout(x => {
         this.disableButtons = false;
      }, 10000);

      this.fs.saveEmotion(reg).then(x => {
         this.appSrv.message('Se ha registrado la emocion!');
         this.lastEmo = reg;
         this.globalSrv.setItem('lastEmo', this.lastEmo, true);
      }).catch(err => {
         this.appSrv.message('Error: ', 'Ha ocurrido un error al registrar la emocion!');
      })
   }
   pressEmo(ev, emo) {
      this.appSrv.message('Abriendo opciones.....');
   }
   getColor(col) {
      var exp = 'radial-gradient(' + col + ' 63%, #fff 79%)';
      return exp;
   }

   private evalNotification(data) {
      if (data.type == "config") {
         this.appSrv.message('Configuracion remota');
      }
      if (data.type == "chat") {
         this.appSrv.message('Mensaje remoto');
      }
   }
}







