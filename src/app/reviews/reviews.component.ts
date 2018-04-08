import { Component, OnInit, Input } from '@angular/core';
import { GetdetailService } from '../getdetail.service';
import { ConvertTimeService } from '../convert-time.service';
import * as moment from 'moment';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() reviews: Observable<any>;

  reviewObj:any;

  
  googleYelp:string;
  sortMethod:string;
  isGoogle:boolean;

  
  constructor(public service:GetdetailService, public convertTime:ConvertTimeService) {
  }
  ngOnInit() {
    this.googleYelp = 'Google Reviews';
    this.sortMethod = 'Default Order';
    this.isGoogle = true;
    this.reviews.subscribe(data=>{
      this.reviewObj = data;
      console.log('Got new reivews');
      console.log(this.reviewObj);
    });
  }

  getGoogle(){
    this.googleYelp = 'Google Reviews';
    this.isGoogle = true;
  }

  getYelp(){
    this.googleYelp = 'Yelp Reviews';
    this.isGoogle = false;
  }

  getSortedReviews(){
    switch(this.sortMethod){
      case 'Default Order':
        return this.defaultSort();
      case 'Highest Rating':
        return this.highRateSort();
      case 'Lowest Rating':
        return this.lowRateSort();
      case 'Most Recent':
        return this.mostRecentSort();
      case 'Least Recent':
        return this.leastRecentSort();
      default:
        return this.defaultSort();
    }
  }

  defaultSort(){
     this.sortMethod = 'Default Order';
    // let google = this.reviews.map(x => x.google);
    // let yelp = this.reviews.map(x => x.yelp);
    return this.isGoogle? this.reviewObj.google: this.reviewObj.yelp;
  }

  highRateSort(){
    this.sortMethod = 'Highest Rating';
    let input =  this.isGoogle? this.reviewObj.google: this.reviewObj.yelp;
    let newOutput = input.slice();//copy original array
    newOutput.sort(function(a,b){
      return b.rating-a.rating;
    });
    return  newOutput;
  }
  
  lowRateSort(){
    this.sortMethod = 'Lowest Rating';
    let input =  this.isGoogle? this.reviewObj.google: this.reviewObj.yelp;
    let newOutput = input.slice();//copy original array
    newOutput.sort(function(a,b){
      return a.rating-b.rating;
    });
    return  newOutput;
  }

  mostRecentSort(){
    this.sortMethod = 'Most Recent';
    let input =  this.isGoogle? this.reviewObj.google: this.reviewObj.yelp;
    let newOutput = input.slice();//copy original array
    newOutput.sort(function(a,b){
      var newb = moment(b.time).unix();
      var newa = moment(a.time).unix();
      return newb-newa;
    });
    return  newOutput;
  }

  leastRecentSort(){
    this.sortMethod = 'Least Recent';
    let input =  this.isGoogle? this.reviewObj.google: this.reviewObj.yelp;
    let newOutput = input.slice();//copy original array
    newOutput.sort(function(a,b){
      var newb = moment(b.time).unix();
      var newa = moment(a.time).unix();
      return newa-newb;
    });
    return  newOutput;
  }

}
