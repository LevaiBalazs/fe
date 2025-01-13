import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 

  }


  private url = 'https://dolgozat-79584-default-rtdb.europe-west1.firebasedatabase.app/';

  

  getProduct(): any {
    return this.http.get(`${this.url}/.json`);
  }

  createProduct(product: any): any {
    return this.http.post(`${this.url}/.json`, product);
  }

  updateProduct(product:any,id: number): any {
    return this.http.put(`${this.url}/${product.id}.json/`, product);
  }


  deleteProduct(id: number): any {
    return this.http.delete(`${this.url}/${id}.json/`);
  }

}
