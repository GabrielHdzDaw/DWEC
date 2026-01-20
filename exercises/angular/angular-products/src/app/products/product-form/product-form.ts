import { UpperCasePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { EncodeBase64Directive } from '../../shared/directives/encode-base64-directive';
import { Product } from '../interfaces/product';
import { ProductsService } from '../services/products-service';

@Component({
  selector: 'product-form',
  imports: [FormsModule, FormField, UpperCasePipe, EncodeBase64Directive],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  productModel = signal<Product>({
    description: '',
    available: '',
    imageUrl: '',
    rating: 1,
    price: 0,
  });

  productForm = form(this.productModel);

  setFormData(p: Product) {
    this.productModel.set(p);
  }

  resetForm() {
    this.productModel.set({
      description: '',
      available: '',
      imageUrl: '',
      rating: 1,
      price: 0,
    });
  }

  clearDescription() {
    this.productForm.description().value.set(''); // Si hay debounce tarda
    this.productForm.description().setControlValue(''); // Cambio inmediato
  }

  saved = false;

  #productsService = inject(ProductsService);
  #router = inject(Router);

  addProduct(event: Event) {
    event.preventDefault();
    this.#productsService.insertProduct(this.productModel()).subscribe(() => {
      this.saved = true;
      this.#router.navigate(['/products']);
    });
  }
}
