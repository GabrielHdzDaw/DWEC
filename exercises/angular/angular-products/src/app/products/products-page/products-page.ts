import { Component, inject, linkedSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../interfaces/product';
import { ProductItem } from '../product-item/product-item';
import { ProductsService } from '../services/products-service';

@Component({
  selector: 'products-page',
  imports: [FormsModule, ProductItem],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {
  showImage = signal(true);
  search = signal('');

  #productsService = inject(ProductsService);
  productsResource = this.#productsService.getProductsResource(this.search);

  products = linkedSignal(() =>
    this.productsResource.hasValue() ? this.productsResource.value().products : []
  );

  toggleImage() {
    this.showImage.update((show) => !show);
  }

  deleteProduct(product: Product) {
    this.products.update((products) => products.filter((p) => p !== product));
  }
}
