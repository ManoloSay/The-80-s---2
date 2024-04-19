import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientMock } from './http-client.mock.service';


describe('HttpClientMock', () => {
  let httpClientMock: HttpClientMock;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClientMock],
    });

    httpClientMock = TestBed.inject(HttpClientMock);
  });

  it('should be created', () => {
    expect(httpClientMock).toBeTruthy();
  });

  it('should return an observable with example data for get requests', (done) => {
    const url = 'https://example.com/api/resource';
    httpClientMock.get(url).subscribe((data) => {
      expect(data).toEqual({});
      done();
    });
  });

  it('should return an observable with example data for post requests', (done) => {
    const url = 'https://example.com/api/resource';
    const requestData = { key: 'value' };
    httpClientMock.post(url, requestData).subscribe((data) => {
      expect(data).toEqual({});
      done();
    });
  });
});
