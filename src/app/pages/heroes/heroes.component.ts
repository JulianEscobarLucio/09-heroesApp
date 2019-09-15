import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { HeroeModel } from 'src/app/Models/heroes.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];
  cargando = false;

  constructor(private heroeService: HeroesService) { }

  ngOnInit() {

    this.cargando = true;
    this.heroeService.getHeroes()
    .subscribe(response => { 
      this.heroes = response ;
      this.cargando = false;
     });
  }

  borrarHeroe(heroe: HeroeModel, i: number) {
    
    Swal.fire({
      title: 'Está seguro?',
      text: `Está seguro que desea borrar a ${ heroe.nombre} `,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then( resp => {
        if (resp.value) {
          this.heroes.splice(i, 1);
          this.heroeService.borrarHeroe(heroe.id)
          .subscribe( response => {
             console.log(response);
          });
        }
    });


 }

}
