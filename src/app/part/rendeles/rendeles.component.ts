import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { BaseService } from 'src/app/services/base.service';
import { KosarService } from 'src/app/services/kosar.service';

@Component({
  selector: 'app-rendeles',
  templateUrl: './rendeles.component.html',
  styleUrls: ['./rendeles.component.css']
})
export class RendelesComponent {
nev:any;
cim: any;
kosar:any;
novenyek:any;

constructor(
  private router:Router, 
  private kosarService:KosarService, 
  private base: BaseService){
  this.kosarService.getKosar().subscribe(
    (res)=>this.kosar=res
  )

  this.base
    .getPlants()
    .snapshotChanges()
    .pipe(
      map(
        (ch)=>ch.map(
          (c)=>({key:c.payload.key, ...c.payload.val()})
        )      
    ))
    .subscribe((res)=>this.novenyek=res)
  }
  nevKereses(key:any){
    let i= this.novenyek.findIndex(
      (elem:any)=>elem.key==key
    )

    return this.novenyek[i].megnevezes
  }
  tetelTorol(key:any){
    this.kosarService.deleteTetel(key)
  }

  megrendelesLead(){
      let body = {
      nev: this.nev,
      cim: this.cim,
      datum: new Date().toLocaleString(),
      statusz: "Leadva",
      tetelek: this.kosar
    }
    console.log(body)
    this.base.megrendel(body).then(
      ()=>{this.kosarService.deleteKosar()
        this.router.navigate(['/novenyek'])
      }
    )
  }
}
