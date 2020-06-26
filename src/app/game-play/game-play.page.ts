import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { PlayerService } from './../player.service';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from './../question.service';
import { Component, OnInit, SkipSelf } from '@angular/core';
import { Router } from '@angular/router';

import { NavController, ToastController, SelectValueAccessor } from '@ionic/angular';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.page.html',
  styleUrls: ['./game-play.page.scss'],
})
export class GamePlayPage implements OnInit {

  started = false;
  stopped = false;
  listaPitanja = [];
  pitanja = [];
  player: any;
  time = 45;
  hintHidden = true;
  answer: string;
  brojac = 0;
  textPitanja: string;
  textHint: string
  kategorija: string;
  ukupnoPoena = 0;
  preostaloPitanja = 10;
  showQuestion = false;

  dosadasnjiBrojPoena;

  constructor(private _questionService: QuestionService, private _playerService: PlayerService, private navCtrl: NavController,
    private activatedRoute: ActivatedRoute, public _toastController: ToastController, private http: HttpClient , private _router : Router) {
   

    console.log("konstr");
  }

  ngOnInit() {
    console.log(this.listaPitanja);
    this.kategorija = this.activatedRoute.snapshot.paramMap.get('id')
    console.log("kategorija iz ngoninit: "  + this.kategorija);
    this._questionService.getQuestions().subscribe(data => this.listaPitanja = data);
    this.player = this._playerService.getPlayer();
    
  

    /*
    setTimeout(() => {
      console.log( this.listaPitanja[0]);
      this.textPitanja = this.listaPitanja[0].name;
      this.textHint = this.listaPitanja[0].hint;

    }, 100);
*/   
  }

  ionViewDidEnter(){
   console.log( this.listaPitanja);
   this.izaberiPitanja(this.kategorija);
   this.izmesajPitanja();
   console.log("prosledjeni igrac:");
   console.log(this.player);


  }

  async openToast(){
    var poruka = "";
    var colour = "";
    this.dosadasnjiBrojPoena = this.player.totalPts;
    console.log("Dosadasnji broj poena: " + this.dosadasnjiBrojPoena);
    if(this.ukupnoPoena > 5){
      poruka = "Odlican rezultat. Svaka cast! Zaradili ste mogućnost da kreirate novo pitanje, kako biste doprineli boljitku ove aplikacije!"
      colour = 'success';
    }
    else if(this.ukupnoPoena >0 && this.ukupnoPoena <= 5){
      poruka = "Slab rezultat. Mozete vi to mnogo bolje."
      colour = 'warning';
    }
    else if(this.ukupnoPoena == 0){
      poruka = "Cvonjak.. Krompir.. Nula.. Sto tako lose?"
      colour = 'danger';
    }
    else if(this.ukupnoPoena < 0){
      poruka = "Vi ste fenomen. Usli ste u negativne poene."
      colour = 'dark';
    }

    this._playerService.setPlayerPoints(this.ukupnoPoena);
    console.log("dodao igracu : " + this.ukupnoPoena + " poena");
    const toast = await this._toastController.create({
      message:'Broj osvojenih poena: ' + this.ukupnoPoena + " " + poruka + " Ovaj rezultat bice sacuvan na Django REST Api-ju",
      duration: 3500,
      position: 'middle',
      color: colour
    });
    toast.present();
    
  }

  izaberiPitanja(kategorija){
    for (var property in this.listaPitanja) {
      if( this.listaPitanja.hasOwnProperty( property ) ) {
        let pitanje = this.listaPitanja[property];
        console.log(pitanje.category.name);
        console.log(kategorija);
        if(pitanje.category.name == kategorija){
          this.pitanja.push(pitanje);
        }

      }
    }
    console.log(this.pitanja.length);
  }

  izmesajPitanja(){
    this.pitanja.sort( () => Math.random() - 0.5);
  }

  startButton(){
    this.showQuestion = true;
    this.napraviPitanja();
    this.startTimer();
    this.started = true;
    this.textPitanja = this.pitanja[0].name;
    this.textHint = this.pitanja[0].hint;
  }

  napraviPitanja(){
    
  }
  startTimer() {
    var interval = setInterval(function() {
    if(this.time <=11){
      this.pocrveni();
    }
    if (this.time > 0) {
      this.time--;
    }
    if(this.time <= 0 || this.preostaloPitanja == 0){
      console.log("Kraj");
      this.time = 0;

      this.started = false;
      this.stopped = true;
      this.openToast();
      
      this.zapamtiRezultat();
      if(this.ukupnoPoena > 5){
        this._router.navigate(['kreiraj-pitanje'])
      }
      else {
        this._router.navigate(['tabs/t/game-types'])
      }
      clearInterval(interval);
      
      return;
    }
    }.bind(this), 1000);
  }

  pocrveni(){
    let boja = document.getElementById('time') as HTMLElement;
    if(boja != undefined){
      boja.style.color="red";
      return;
    }
  }

  zapamtiRezultat(){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': this._questionService.token
      })
    };

     this._playerService.azurirajPoene(this.dosadasnjiBrojPoena, this.ukupnoPoena).subscribe((result) => {
      console.log(result);
      console.log("Uspesno si azurirao broj poena");
      },(err:HttpErrorResponse)=>{
        console.log("Neispravni podaci");
      });
 

  }

  showHint() {
    if(this.hintHidden){
      this.time -= 5;
    if(this.time <0){
      this.time = 0;
    }
    }
    this.hintHidden = !this.hintHidden;
    
    
  }

  async submitAnswer() {
    
   
    if(this.answer != undefined){
     
    if(this.answer.toUpperCase() == this.pitanja[this.brojac].answer.toUpperCase()){
      console.log("pogodio si");
      this.ukupnoPoena+=1;
    }
    else {
      console.log("pogresio si");
      this.ukupnoPoena-=1;
      
    }
    this.nextQuestion();
     
    }
    else {
      console.log("prazno polje");
      const toast = await this._toastController.create({
      message:"Unesite odgovor!",
      duration: 500,
      position: 'top',
    });
    toast.present();
    }

  }

  nextQuestion(){
    this.brojac +=1;
    this.textPitanja = this.pitanja[this.brojac].name;
    this.textHint = this.pitanja[this.brojac].hint;
    this.hintHidden = true;
    this.answer = "";

    this.preostaloPitanja -=1;
    if(this.time <=0){
      this.time = 0;
      this.stopped = true;
      this.started = false;
    }
    if(this.preostaloPitanja <=0){
      this.stopped = true;
      this.started = false;

    }
  }

  skipAnswer(){
    this.nextQuestion();
    if(this.time <= 3){
      this.time = 0;
    }
    else {
      this.time -= 3;
    }

  }
}
