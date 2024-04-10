import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Noveny } from '../model/noveny';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  refNovenyek: AngularFireList<Noveny>
  refMegrendeles: AngularFireList<any>

  constructor(private db:AngularFireDatabase) {
    this.refNovenyek= this.db.list("/novenyek")
    this.refMegrendeles= this.db.list("/megrendelesek")
   }
   getPlants(){
    return this.refNovenyek
   }

   megrendel(body:any){
    return this.refMegrendeles.push(body)
   }

}
