import { Injectable } from '@angular/core';
import {LockerModule, Locker, DRIVERS} from 'angular-safeguard'
@Injectable()
export class FavouriteService {
  localKey:string;
  favMap:{};
  constructor(private locker:Locker) {
    this.localKey = 'fav';
    this.favMap = {};
   }
   //local can be null or object
   empty(){
    this.locker.remove(DRIVERS.LOCAL,this.localKey);
    console.log(this.locker.get(DRIVERS.LOCAL,this.localKey));
   }

   showLocal(){
    console.log(this.locker.get(DRIVERS.LOCAL,this.localKey));
   }

   initialize(){
     if (this.locker.get(DRIVERS.LOCAL,this.localKey) == undefined)
     this.locker.set(DRIVERS.LOCAL,this.localKey,'{}');
     if (this.locker.get(DRIVERS.LOCAL,this.localKey) == {})
     this.locker.set(DRIVERS.LOCAL,this.localKey,'{}');
   }

   load(){
    this.initialize();
    this.favMap = JSON.parse(this.locker.get(DRIVERS.LOCAL,this.localKey));
    console.log(this.favMap);
   }

   save(){
     let favStr = JSON.stringify(this.favMap);
     this.locker.set(DRIVERS.LOCAL,this.localKey,favStr)
     console.log(favStr);
   }

   add(listItem){
     this.favMap[listItem.place_id] = listItem;
     this.save();
   }

   delete(place_id){
     delete this.favMap[place_id];
     this.save();
   }

   check(place_id){
    return (place_id in this.favMap);
   }

   toggle(listItem){
     if(!this.check(listItem.place_id)){
      this.add(listItem);
     }
     else{
      this.delete(listItem.place_id);
     }
   }

   show(){
     console.log(this.favMap);
   }

   getList(){
     return Object.values(this.favMap);
    }


}

interface result{
  index:number;
  lat:number;
  lng:number;
  icon:string;
  place_id:string;
  address:string;
}