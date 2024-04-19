import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { ArtistService } from './artist.service';
import { HttpClient } from '@angular/common/http';

describe('ArtistService', () => {
  let service: ArtistService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArtistService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

describe('ArtistService', () => {
  let service: ArtistService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClient],
      providers: [ArtistService],
    });
    service = TestBed.inject(ArtistService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve artists from the API via GET request', () => {
    const mockArtists = [
      { id: 1, name: 'Artist 1' },
      { id: 2, name: 'Artist 2' },
      { id: 3, name: 'Artist 3' },
    ];

    service.getArtists().subscribe((artists) => {
      expect(artists).toEqual(mockArtists);
    });

    const req = httpMock.expectOne(service['artistsUrl']);
    expect(req.request.method).toBe('GET');
    req.flush(mockArtists);
  });
});
