// artists-profile.component.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface ArtistData {
  artistPhoto: string; // Cambia esta propiedad a la foto del artista
  albums: {
    [albumName: string]: {
      songs: string[];
      cover: string;
    };
  };
}

@Component({
  selector: 'app-artists-profile',
  templateUrl: './artists-profile.component.html',
  styleUrls: ['./artists-profile.component.css']
})
export class ArtistsProfileComponent implements OnInit {
  email = '';
  artistData: ArtistData = { artistPhoto: '', albums: {} };
  artistName: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {
    this.route.params.subscribe(params => {
      this.email = params['email'];
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const artistName = params['artistName'];
      this.httpClient.get<any>('assets/api-discos.json').subscribe(data => {
        if (data.hasOwnProperty(artistName)) {
          this.artistName = artistName;
          this.artistData = data[artistName];
        }
      });
    });
  }

  redirectToBienvenido() {
    const navigationExtras: NavigationExtras = {
      state: {
        email: this.email,
        authorized: true,
      },
    };

    this.router.navigate(['/bienvenido', { email: this.email }], navigationExtras);
  }
  albumClicked(albumName: string) {
    // Utiliza el método navigate para redirigir al usuario con el parámetro albumName
    this.router.navigate(['/disc-profile', albumName]);
  }
}
