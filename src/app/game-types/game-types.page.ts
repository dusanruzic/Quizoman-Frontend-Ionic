import { CategoryService } from './../category.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-game-types',
  templateUrl: './game-types.page.html',
  styleUrls: ['./game-types.page.scss'],
})
export class GameTypesPage implements OnInit {
  //listaKategorija = ['Zivotinje', 'Filmovi', 'Glumci'];
  listaKategorija = [];

  constructor(private _categoryService: CategoryService, public navCtrl: NavController) {
    
   }

  ngOnInit() {
   this._categoryService.getCategories().subscribe(data => 
    {
    this.listaKategorija = data;
    console.log(this.listaKategorija);
    }
    );
  }

  proslediKategoriju(category){
    var data = category;

  }

}
