import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';

declare const YT: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  youtubeID: SafeResourceUrl = '54W8kktFE_o';
  email = '';
  spainPhoto =
    'https://a.cdn-hotels.com/gdcs/production33/d808/bcab0931-5243-49ce-a250-cfedaf73721c.jpg';
  spainPhoto2 =
    'https://turismo.org/wp-content/uploads/2016/09/peniscola-en-verano-espana-1024x686.jpg';
  rockClassics =
    'https://resources.tidal.com/images/64fc71d0/70f8/414d/ba14/30059e01f14c/640x640.jpg';
  blues =
    'https://images.ctfassets.net/3s5io6mnxfqz/1OB3S3xv8EmUHra4cg8xzX/1bcc144b6698f55e80c241b4b78dfc9c/AdobeStock_249428244.jpeg';
  private apiUrl = 'http://localhost:3000/scraping-cantantes';
  videoEnded: boolean = false;
  videoIds: string[] = ['VIDEO_ID_1', 'VIDEO_ID_2', 'VIDEO_ID_3'];
  currentVideoIndex: number = 0;
  player: any;
  cantanteList: string[] = [];
  cantantes: string[] = [];

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe((params) => {
      this.email = params['email'];
    });
  }
  ngOnInit(): void {}

  redirectToBienvenido() {
    const navigationExtras: NavigationExtras = {
      state: {
        email: this.email,
        authorized: true,
      },
    };

    this.router.navigate(
      ['/bienvenido', { email: this.email }],
      navigationExtras
    );
  }

  onVideoEnded() {
    this.videoEnded = true;
    this.youtubeID = 'OhfvzxYXlBU';
  }

  playNextVideo() {
    this.currentVideoIndex =
      (this.currentVideoIndex + 1) % this.videoIds.length;
    this.player.loadVideoById(this.videoIds[this.currentVideoIndex]);
  }

  initYouTubePlayer() {
    this.player = new YT.Player('youtube-player', {
      height: '315',
      width: '560',
      videoId: this.videoIds[this.currentVideoIndex],
      playerVars: {
        autoplay: 1, // Reproducir automáticamente al cargar el reproductor
        controls: 0, // Ocultar los controles del reproductor
        modestbranding: 1, // Ocultar el logo de YouTube
        showinfo: 0, // Ocultar la información del video
        autohide: 1, // Ocultar automáticamente los controles
      },
    });
  }

  getCantantes(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl);
  }
}
