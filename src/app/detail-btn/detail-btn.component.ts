import { Component, OnInit ,Input, Output, EventEmitter } from '@angular/core';
import { GetdetailService } from '../getdetail.service';
import { DisplayService } from '../display.service';


@Component({
  selector: 'detail-btn',
  templateUrl: './detail-btn.component.html',
  styleUrls: ['./detail-btn.component.css']
})
export class DetailBtnComponent implements OnInit {
  @Input() placeId : string;
  @Output() emitter = new EventEmitter<string>();

  onPlaceId:string;


  constructor(private detail:GetdetailService,private display:DisplayService) { }

  ngOnInit() {
    this.onPlaceId = '';
    this.detail.detail.subscribe(detail=>{
      if(detail['place_id'])
      this.onPlaceId = detail['place_id'];
    });

  }

  requestDetail(){
    if(this.onPlaceId == this.placeId){
      console.log('same location');    
      this.display.showDetail();
      return;
    }

    this.detail.clearResult();
    this.detail.fetchResults(this.placeId);
    this.display.showDetail();

  }




}
