import { inject, Injectable, Signal } from '@angular/core';
import { Product, SingleProductResponse } from '../interfaces/product';
import { ProductsResponse } from '../interfaces/products-response';
import { HttpClient, httpResource } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  #http = inject(HttpClient);
  #productsUrl = 'https://api.fullstackpro.es/products-example/products';

  getProductsResource(search: Signal<string>) {
    return httpResource<ProductsResponse>(() => {
      const urlSearchParams = new URLSearchParams({ search: search() });
      return `${this.#productsUrl}?${urlSearchParams.toString()}`;
    });
  }

  getProductIdResource(id: Signal<number>) {
    return httpResource<SingleProductResponse>(() => `${this.#productsUrl}/${id()}`);
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
