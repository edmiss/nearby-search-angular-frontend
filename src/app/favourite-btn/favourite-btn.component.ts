import { Component, OnInit, Input } from '@angular/core';
import { FavouriteService } from '../favourite.service';


@Component({
  selector: 'favourite-btn',
  templateUrl: './favourite-btn.component.html',
  styleUrls: ['./favourite-btn.component.css']
})
export class FavouriteBtnComponent implements OnInit {
  @Input() result:any;

  constructor(public favourite:FavouriteService) {
    
   }

  ngOnInit() {
  }
}