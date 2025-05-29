import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get(environment.apiUrl);
  }
  getProductById(id: number) {
    return this.http.get(`${environment.apiUrl}/${id}`);
  }
  createProduct(product: any) {
    return this.http.post(environment.apiUrl, product);
  }
  updateProduct(id: number, product: any) {
    return this.http.put(`${environment.apiUrl}/${id}`, product);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${environment.apiUrl}/${id}`);
  }
}
