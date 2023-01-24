import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.css']
})

export class PokemonListComponent {
  pokemons: any[] = [];
  page = 1;
  totalPokemons: number = 0;

  constructor (
    private dataService: DataService
  ) {}
    // On init to execute logic on component load
  ngOnInit(): void {
   this.getPokemons();
  }
  
  getPokemons(){
     // bring our data service to use it in our component
     this.dataService
       .getPokemons(10, this.page + 0)
       // use suscribe to execute method
       .subscribe((response: any) => {
         // set totalPokemon values from our response
         this.totalPokemons = response.count;
         // for each result we get from our get pokemons method
         response.results.forEach((result: any) => {
           // take name of pokemon from result and prepare getMoreData method
           this.dataService
             .getMoreData(result.name)
             //execute it
             .subscribe((uniqueResponse: any) => {
               // add any pokemon response object to pokemons array
               this.pokemons.push(uniqueResponse);
               console.log(this.pokemons);
             });
         });
       });
  }
}
