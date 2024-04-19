import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface AlbumData {
  songs: string[];
  cover: string;
}

@Component({
  selector: 'app-disc-profile',
  templateUrl: './disc-profile.component.html',
  styleUrls: ['./disc-profile.component.css']
})
export class DiscProfileComponent {
  email = '';
  albumData: AlbumData = { songs: [], cover: '' };
  albumName: string = '';

  constructor(private router: Router, private route: ActivatedRoute, private httpClient: HttpClient) {
    this.route.params.subscribe(params => {
      this.albumName = params['albumName'];
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const albumName = params['albumName']; // Obtén el nombre del álbum de los parámetros
      this.httpClient.get<any>('assets/api-discos.json').subscribe(data => {
        for (const artistName in data) {
          if (data.hasOwnProperty(artistName)) {
            const artist = data[artistName];
            if (artist.albums.hasOwnProperty(albumName)) {
              this.albumData = artist.albums[albumName];
              this.albumName = albumName; // Actualiza el nombre del álbum
              break; // Sal del bucle una vez que encuentres el álbum
            }
          }
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
}
