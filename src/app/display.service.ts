import { Injectable } from '@angular/core';



@Injectable()
export class DisplayService {
  public searchState: string 
  public detailState: string 
  public favouriteState: string 
  public resultState:string
  //four type of display, table, none, detail, favourite
  constructor() {
    this.searchState = 'inactive';
    this.detailState = 'inactive';
    this.favouriteState = 'inactive';
    this.resultState = 'inactive';
   }

   showNone(){
     this.searchState = 'inactive';
     this.detailState = 'inactive';
     this.resultState = 'inactive';
     this.favouriteState = 'inactive';
   }

   showSearch(){
    this.searchState = 'active';
    this.detailState = 'inactive';
    this.showResults();
   }

   showDetail(){
    this.searchState = 'inactive';
    this.detailState = 'active';
    this.showResults();

   }

   showResults(){
    this.resultState = 'active';
    this.favouriteState = 'inactive';
   }


   showFavourite(){
     this.favouriteState = 'active';
     this.resultState = 'inactive';
   }
  
}
