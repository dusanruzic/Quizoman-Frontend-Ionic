import { PlayerService } from './../player.service';
import { QuestionService } from './../question.service';
import { CategoryService } from './../category.service';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-kreiraj-pitanje',
  templateUrl: './kreiraj-pitanje.page.html',
  styleUrls: ['./kreiraj-pitanje.page.scss'],
})
export class KreirajPitanjePage implements OnInit {

  pitanje: string;
  hint: string;
  listaKategorija: any[];
  tacanOdgovor: any;
  category: any;
  player:any;


  constructor(private categoryService: CategoryService, private questionService: QuestionService,
     private alertCtrl: AlertController, private router: Router, private toast: ToastController, private playerService: PlayerService) { 
      this.player = this.playerService.getPlayer();
      this.playerService.getUpToDatePlayer(this.player.url).subscribe(igr => {
        this.player = igr;
        console.log(this.player);
        }
        );
  }

  ngOnInit() {
    this.categoryService.getCategories().subscribe(data => 
      {
      this.listaKategorija = data;
      console.log(this.listaKategorija);
      }
      );
  }


  kreirajPitanje() {
    if (this.category == undefined){
      console.log('Odaberite kategoriju...');
      this.alertCtrl.create({
        header: 'Unesite kategoriju pitanja',
        message: 'Molimo unesite kategoriju pitanja. Pitanje ne može biti nekategorizovano.'
      }).then(alertEl => {
        alertEl.present()
      })
      return
    }
    else {
      console.log('kreiracu pitanje');
      this.questionService.createQuestion(this.category, this.pitanje, this.hint, this.tacanOdgovor).subscribe((result) => {
        console.log(result);
        console.log("Uspesno si napravio pitanje");
        this.router.navigate(['tabs']);
        this.toast.create({
          message: 'Uspešno si kreirao pitanje!',
          duration: 3000,
          position: 'top'
        }).then(t => t.present()
        );
        this.playerService.azurirajBrojKreiranihPitanja(this.player.totalQuestionsCreated).subscribe(rez => {
          console.log(rez);
        })
        },
        (err:HttpErrorResponse)=>{
          console.log("Nisi napravio pitanje!");
          this.toast.create({
            message: 'Nisi uspeo da kreiraš pitanje!',
            duration: 3000,
            position: 'top'
          }).then(t => t.present()
          );
        });
    }
  }

  odustani() {
    this.router.navigate(['tabs']);
  }

  promenaDropdown() {
    console.log(this.category);

  }

}
