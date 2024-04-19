import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent {
  
  mostrarMasGeneros = false;
  genresToShow: string[] = [];

  constructor() {
    this.genresToShow = this.genres.slice(0, 10);
  }

  mostrarMas() {
    this.mostrarMasGeneros = true;
    this.genresToShow = this.genres;
  }

  genres = [
    'Pop',
    'Rock',
    'Electrolatino',
    'Reggae',
    'Disco',
    'Funk',
    'HeavyMetal',
    'Jazz',
    'Blues',
    'Soul',
    'Country',
    'Góspel',
    'Techno',
    'Salsa',
    'Flamenco',
    'Rancher',
    'HipHop',
    'Rap',
    'Reggaetón',
    'Melodic',
    'Clissic',
    'Orchestral',
    'Electronic',
    'Ska',
    'House',
    'Trap',
    'Drill',
    'Garage',
    'Cumbia',
    'Tango',
    'Bachata',
    'Mambo',
    'Rumba',
    'Bolero',
    'Punk',
    'Fado',
    'Dance',
    'KPop',
    'JPop',
    'Experimental',
    'Alternative',
    'Folk',
    'Pasodoble',
    'Dembow',
    'Dancehall',
    'NewAge',
    'PsicodélicRock',
    'Surf',
    'Benga',
    'Afrobeat',
    'Fuji',
    'Chaabi',
    'Higlife'
  ];

  @ViewChild('genreContainer', { static: true }) genreContainer!: ElementRef;

  scrollPlaylists(direction: number) {
    const container = this.genreContainer.nativeElement;
    container.scrollLeft += direction * 200;
  }
}
