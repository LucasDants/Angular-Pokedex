import { PokeapiService } from 'src/app/services/pokeapi.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import{  takeWhile } from 'rxjs/operators'

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit, OnDestroy {
  isAlive = true;
  pokemonNumber: number
  pokemon: any = {}

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeapi: PokeapiService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.pipe(takeWhile(() => this.isAlive))
    .subscribe((params: any) => {
      this.pokemonNumber = parseInt(params['number'], 10)
      this.getPokemon()
    })
  }

  ngOnDestroy(): void {
    this.isAlive = false
  }


  getPokemon() {
    this.pokeapi.getPokemon(this.pokemonNumber).pipe(takeWhile(() => this.isAlive)).subscribe(response => {
      this.pokemon = response
    })
  }

}
