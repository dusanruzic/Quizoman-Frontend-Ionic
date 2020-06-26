import { PlayerService } from './../player.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  ime:string;
  prezime:string;
  email: string;
  username: string;

  players;

  constructor(private _playerService: PlayerService, private _router : Router, public _toastController: ToastController) { 
    console.log("konstruktor");
  }

  ngOnInit() {
    console.log("ngoninit");
    //this.players = this._playerService.getPlayers().subscribe(data => this.players = data);
  }

  ionViewWillEnter(){
   console.log("iondidenter");
   this.players = this._playerService.getPlayers().subscribe(data => this.players = data);

  }

  async signUpValidation(){
    
    console.log("sign up validacija");
    console.log(this.players);

    if(this.ime == undefined || this.prezime == undefined || this.email == undefined || this.username == undefined){
      const toast = await this._toastController.create({
        message:'Popunite sva polja!',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
      return;
    }

    if(!this.email.includes("@")){
      const toast = await this._toastController.create({
        message:'Email nije u dobrom formatu!',
        duration: 2000,
        position: 'top',
        color: 'danger'
      });
      toast.present();
      return;
    }

    for (var property in this.players) {
      if( this.players.hasOwnProperty( property ) ) {
        let igrac = this.players[property];
        console.log("ispisivanje iz for petlje provera usernamea");
        console.log(igrac.username);
        console.log(this.username);
        if(igrac.username == this.username){
          const toast = await this._toastController.create({
            message:'Neko vec koristi taj username!',
            duration: 2000,
            position: 'top',
            color: 'danger'
          });
          toast.present();
          return;
        }

      }
    }

      for (var property in this.players) {
        if( this.players.hasOwnProperty( property ) ) {
          let igrac = this.players[property];
          
          if(igrac.email == this.email){
            const toast = await this._toastController.create({
              message:'Neko vec koristi taj email!',
              duration: 2000,
              position: 'top',
              color: 'danger'
            });
            toast.present();
            return;
          }
  
        }
    }
    
    this._playerService.createPlayer(this.ime, this.prezime, this.email, this.username).subscribe((result) => {
      console.log(result);
      console.log("Uspesno si se registrovao");
      this._router.navigate(['home'])
},(err:HttpErrorResponse)=>{
  console.log("Nisi se uspesno registrovao!");
});;
    //return;


  }

}
