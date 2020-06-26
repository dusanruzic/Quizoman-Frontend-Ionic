import { PlayerService } from './../player.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-ranglista',
  templateUrl: './ranglista.page.html',
  styleUrls: ['./ranglista.page.scss'],
})
export class RanglistaPage implements OnInit {

  ranglista = [];
  igrac;
  constructor(private _playerService: PlayerService, public navCtrl: NavController) { }

  ngOnInit() {
    console.log("ng on init"); 
       this._playerService.getPlayers().subscribe(data => this.ranglista = data);
       this.igrac = this._playerService.getPlayer();
  }

  ionViewWillEnter(){
    //this._playerService.getPlayers().subscribe(data => this.ranglista = data);
    
    console.log("will enter");
    console.log(this.igrac);
    this.sortirajListu();
       

  }
  ionViewDidEnter(){
        console.log("did enter");
  }

  sortirajListu(){
    this.ranglista.sort((a,b) => (a.totalPts < b.totalPts) ? 1 : ((b.totalPts < a.totalPts) ? -1 : 0)); 

  }

}
