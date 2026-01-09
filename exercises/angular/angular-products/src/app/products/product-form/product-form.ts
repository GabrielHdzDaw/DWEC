import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../interfaces/product';
import { UpperCasePipe } from '@angular/common';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64-directive';
import { ProductsService } from '../services/products-service';
import { Router } from '@angular/router';

@Component({
  selector: 'product-form',
  imports: [FormsModule, UpperCasePipe, EncodeBase64Directive],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  newProduct: Product = {
    id: 0,
    description: '',
    available: '',
    imageUrl: '',
    rating: 1,
    price: 0,
  };

  saved = false;

  #productsService = inject(ProductsService);
  #router = inject(Router);

  addProduct() {
    this.#productsService.insertProduct(this.newProduct).subscribe(() => {
      this.saved = true;
      this.#router.navigate(['/products']);
    });
  }
}
