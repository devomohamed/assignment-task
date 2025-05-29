import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  url: string = environment.apiUrl + 'products/';

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.url}${id}`);
  }
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.url, product);
  }
  updateProduct(id: number, product: Product): Observable<Product> {
    return this.http.patch<Product>(`${this.url}${id}`, product);
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.url}${id}`);
  }
}
