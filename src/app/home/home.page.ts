import { PlayerService } from './../player.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  username: string;
  password: string;
  email: string;
  ime: string;
  prezime: string;

  listaKorisnika = [];



  constructor(private _playerService: PlayerService, private _router: Router, public _toastController: ToastController) {
    console.log("constr");
  }

  ngOnInit() {
    console.log("ng on init");
    this._playerService.getPlayers().subscribe(data => 
      {
      this.listaKorisnika = data;
      console.log(this.listaKorisnika);
      }
      );
    
  }


  ionViewWillEnter(){
   console.log("will enter");
   this._playerService.getPlayers().subscribe(data => 
    {
    this.listaKorisnika = data;
    console.log(this.listaKorisnika);
    });
    
   this.username = "";
   this.email = "";

  }

  ionViewWillLeave(){
   console.log("ion leave")
  }

  

  async logInValidation() {
    this._playerService.getPlayers().subscribe(data => this.listaKorisnika = data);

    console.log(this.listaKorisnika);

    for (var property in this.listaKorisnika) {
      if( this.listaKorisnika.hasOwnProperty( property ) ) {
        let igrac = this.listaKorisnika[property];

         if(igrac.email == this.email && igrac.username == this.username){
           console.log("poklopio se.Prijavi ga");
          this._playerService.setPlayer(igrac);
          
          this._router.navigate(['tabs'])
          
           return;
         }
      }
      
  }
  const toast = await this._toastController.create({
    message:'Taj korisnik ne postoji u bazi podataka!',
    duration: 2000,
    position: 'top',
    color: 'danger'
  });
  toast.present();

  console.log("Ne postojis u bazi");

    
    
  }
}
