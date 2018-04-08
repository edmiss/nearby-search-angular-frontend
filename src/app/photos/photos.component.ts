import { Component, OnInit, Input } from '@angular/core';
import { GetdetailService } from '../getdetail.service';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnInit {

  @Input() photos:Observable<any>;
  constructor() {
  }
  ngOnInit() {
  }

}
