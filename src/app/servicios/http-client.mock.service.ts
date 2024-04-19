import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class HttpClientMock {
  get<T>(_url: string): Observable<T> {
    const exampleData: T = {} as T;
    return of(exampleData);
  }
  post<T>(_url: string, _data: any): Observable<T> {
    const exampleData: T = {} as T;
    return of(exampleData);
  }
}
