import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Crudprofile } from '../crudprofile';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public baseUrl = "http://127.0.0.1:2021/server/products"; 

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl);
  }

  read(id): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/${id}`);
  }

  create(data):Observable<Crudprofile> {
    return this.httpClient.post<Crudprofile>(this.baseUrl, data);
  }

  update(id, data): Observable<Crudprofile> {
    return this.httpClient.put<Crudprofile>(`${this.baseUrl}/${id}`, data);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete(`${this.baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(this.baseUrl);
  }

  searchByName(name): Observable<Crudprofile> {
    return this.httpClient.get<Crudprofile>(`${this.baseUrl}?name=${name}`);
  }

}
