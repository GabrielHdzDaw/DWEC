import { inject, Injectable } from '@angular/core';
import { Product, SingleProductResponse } from '../interfaces/product';
import { ProductsResponse } from '../interfaces/products-response';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  #http = inject(HttpClient);
  #productsUrl = 'https://api.fullstackpro.es/products-example/products';

  getProducts(): Observable<Product[]> {
    return this.#http.get<ProductsResponse>(this.#productsUrl).pipe(map((res) => res.products));
  }

  changeRating(idProduct: number, rating: number): Observable<void> {
    return this.#http.put<void>(`${this.#productsUrl}/${idProduct}/rating`, {
      rating: rating,
    });
  }

  insertProduct(product: Product): Observable<Product> {
    return this.#http
      .post<SingleProductResponse>(this.#productsUrl, product)
      .pipe(map((resp) => resp.product));
  }

  deleteProduct(id: number): Observable<void> {
    return this.#http.delete<void>(`${this.#productsUrl}/${id}`);
  }
}
