import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../Models/heroes.model';
import { map, delay } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  
  private url = 'https://login-app-61b8b.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${ this.url }/heroes.json`, heroe)
    .pipe(
      map((response: any) => {
         heroe.id = response.name;
         return heroe;
      })
    );
  }

  actualizarHeroe( heroe: HeroeModel ) {
    const heroeTemp = {
      ...heroe
    };

    delete heroeTemp.id;

    return this.http.put(`${ this.url }/heroes/${ heroe.id }.json`, heroeTemp);
  }

  getHeroe(id: string) {
    return this.http.get(`${ this.url }/heroes/${id}.json`);
  }

  borrarHeroe(id: string) {
    return this.http.delete(`${ this.url }/heroes/${id}.json`);
  }


  getHeroes() {
    return this.http.get(`${ this.url }/heroes.json`)
    .pipe(
      map(this.crearArreglo),
      delay(0)

    );
  }

  private crearArreglo(heroesObj: object) {
    const heroes: HeroeModel[] = [];
  
    console.log(heroesObj);
    if (heroesObj === null ) {
      return [];
    }

    Object.keys( heroesObj ).forEach( key => {
      console.log(key);
      const heroe: HeroeModel =  heroesObj[key];
      heroe.id = key;
      heroes.push( heroe );
    });

    return heroes;
  }


}
