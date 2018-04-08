import { Component, OnInit } from '@angular/core';
import { FavouriteService } from '../favourite.service';
import { GetdetailService } from '../getdetail.service';
import { DisplayService } from '../display.service';

@Component({
  selector: 'favourite-table',
  templateUrl: './favourite-table.component.html',
  styleUrls: ['./favourite-table.component.css']
})
export class FavouriteTableComponent implements OnInit {

  results:any[];
  page:number;
  content:any[];
  constructor(public favourite:FavouriteService, public detail:GetdetailService, public display:DisplayService) {
      this.favourite.load();

  }
  ngOnInit() {
    this.results = this.favourite.getList();
    this.page = 0;
  }

  nextPage(){
    this.page = this.page+1;
  }

  prevPage(){
    this.page = this.page-1;
  }

}
