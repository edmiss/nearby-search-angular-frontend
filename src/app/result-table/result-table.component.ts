import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../search.service';
import { SearchObj } from '../search.service';
import { GetdetailService } from '../getdetail.service';
import { DisplayService } from '../display.service';

@Component({
  selector: 'result-table',
  templateUrl: './result-table.component.html',
  styleUrls: ['./result-table.component.css']
})
export class ResultTableComponent implements OnInit {

  @Input('tableContent') data:SearchObj;
  @Output() emitter = new EventEmitter();

  @Input('locError') locError:boolean;

  prevData:SearchObj[];

  constructor(private search:SearchService,private detail:GetdetailService,private display:DisplayService) { 
    this.unLoadData();
    this.prevData = [];
  }

  requestNextPage(search:SearchService){
    if(this.data.next_page_token!='undefined'){
      console.log(this.data.next_page_token);
      let token = this.data.next_page_token;
      this.prevData.push(this.data);
      this.unLoadData();
      this.search.getNextResult(token).subscribe(res=>{
        //console.log(res);
         this.data = res;
      });
    }
  }

  popLastPage(){
    this.data = this.prevData.pop();
  }

  unLoadData(){
    this.data = {error : 'unload'}; 
  }

  clearTable(){
    this.unLoadData();
    this.prevData = []; 
  }


  ngOnInit() {
  }

}