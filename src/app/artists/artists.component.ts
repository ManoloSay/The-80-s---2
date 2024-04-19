import { Component, OnInit } from '@angular/core';
import { ArtistService } from '../servicios/artist.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-artists',
  templateUrl: './artists.component.html',
  styleUrls: ['./artists.component.css']
})
export class ArtistsComponent implements OnInit {
  randomArtists: any[] = [];
  artistsPerRow = 1; // Número de artistas por fila
  visibleArtists: any[] = []; // Lista de artistas visibles
  showAll = false; // Controlar si se muestran todos los artistas

  ngOnInit(): void {
    this.artistService.getArtists().subscribe((data: any) => {
      if (data) {
        this.randomArtists = Object.values(data);
        this.showArtists();
      } else {
        console.error('No se encontraron datos de artistas.');
      }
    });
  }
  
  constructor(private artistService: ArtistService, private router: Router, private route: ActivatedRoute, private httpClient: 
    HttpClient, private auth: AuthService) {}

  showArtists(): void {
    if (this.showAll) {
      this.visibleArtists = this.randomArtists;
    } else {
      this.visibleArtists = this.randomArtists.slice(0, 10);
    }
  }

  showAllArtists(): void {
    this.showAll = true;
    this.showArtists();
  }

  onArtistClick(artist: any) {
    this.router.navigate(['/artists-profile', artist.name]);
  }
}
