import { PlayerService } from './../player.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController} from '@ionic/angular';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {

  igrac;
  azurniPlayer;
  urlSlike;

  constructor(private _playerService: PlayerService, private _router : Router, public _toastController: ToastController, private _alertController: AlertController) { }

  ngOnInit() {
    console.log("ng on init");
    this.igrac = this._playerService.getPlayer();
    this._playerService.getUpToDatePlayer(this.igrac.url).subscribe(igr => {
      this.igrac = igr;
      console.log(this.azurniPlayer);
      }
      );
    
  }

  ionViewWillEnter(){
    console.log("ng will enter");
    this.urlSlike = this.igrac;
    console.log(this.urlSlike);
   console.log(this.igrac);
  }


    async logOut(){
        const alert = await this._alertController.create({
          header: 'Alert',
          message: 'Are you sure you want to logout?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler:() => {
                console.log("Ostavi me prijavljenog");
              }
            },
              {
              text: 'Yes',
              role: 'logout',
              handler:() => {
                console.log("Odjavio si se");
                this._router.navigate(['home'])

              }

            }
          ]
        });

        await alert.present();
    }


    async deleteAccount(){
              const alert = await this._alertController.create({
          header: 'Alert',
          message: 'Are you sure you want to delete your account?',
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              handler:() => {
                console.log("Nemoj da obrises profil");
              }
            },
              {
              text: 'Yes',
              role: 'delete',
              handler:() => {
                console.log("Profil je obrisan!");
                this._playerService.deleteAccount(this.igrac.url);
                this._router.navigate(['signup'])
                this.prikaziPoruku();
              }

            }
          ]
        });

        await alert.present();

    }

   async prikaziPoruku(){
            const toast = await this._toastController.create({
            message:'Vas account je izbrisan. Mozete nam se pridruziti ponovo ako hocete!',
            duration: 2000,
            position: 'top',
            color: 'danger'
          });
          toast.present();
          return;
    }
}
