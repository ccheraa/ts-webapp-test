import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable, Subject } from 'rxjs';

import { LoaderService } from '@ts-webapp/front';

@Injectable()
export class DBService {
  changes = new Subject<{action, table, request, response}>();
  constructor(private http: Http, private loader: LoaderService) {}
  notify(): Observable<{action, table, request, response}> {
    return this.changes;
  }
  find(table: string, data: any): Observable<any> {
    let observable = new Subject<any>();
    this.loader.load('find:' + table);
    this.http.post('/api/data/' + table + '/find', data).subscribe(response => {
      this.loader.unload('find:' + table);
      observable.next(response.json());
      observable.complete();
    });
    return observable;
  }
  list(table: string): Observable<any> {
    let observable = new Subject<any>();
    this.loader.load('list:' + table);
    this.http.get('/api/data/' + table).subscribe(response => {
      this.loader.unload('list:' + table);
      observable.next(response.json());
      observable.complete();
    });
    return observable;
  }
  delete(table: string, id: string): Observable<any> {
    let observable = new Subject<any>();
    this.loader.load('delete:' + table);
    this.http.delete('/api/data/' + table + '/' + id).subscribe(response => {
      this.loader.unload('delete:' + table);
      response = response.json();
      observable.next(response);
      if (response.ok) {
        this.changes.next({ action: 'delete', table, request: id, response });
      }
      observable.complete();
    });
    return observable;
  }
  set(table: string, id: string, doc: any): Observable<any> {
    let observable = new Subject<any>();
    this.loader.load('set:' + table);
    this.http.put('/api/data/' + table + '/' + id, {doc}).subscribe(response => {
      this.loader.unload('set:' + table);
      response = response.json();
      observable.next(response);
      if (response.ok) {
        this.changes.next({ action: 'put', table, request: id, response });
      }
      observable.complete();
    });
    return observable;
  }
}