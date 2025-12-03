import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  output,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Product } from '../interfaces/product';

@Component({
  selector: 'product-form',
  imports: [FormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm {
  added = output<Product>();
  fileName = '';
  newProduct: Product = {
    id: 0,
    description: '',
    available: '',
    imageUrl: '',
    rating: 1,
    price: 0,
  };
  #changeDetector = inject(ChangeDetectorRef); // Necessary in new Angular zoneless apps

  changeImage(event: Event) {
    const fileInput = event.target as HTMLInputElement;
    if (!fileInput.files?.length) return;
    const reader = new FileReader();
    reader.readAsDataURL(fileInput.files[0]);
    reader.addEventListener('loadend', () => {
      this.newProduct.imageUrl = reader.result as string;
      this.#changeDetector.markForCheck(); // Necessary in new Angular zoneless apps
    });
  }

  addProduct(productForm: NgForm) {
    this.added.emit({ ...this.newProduct }); // Enviamos al padre una copia del producto a insertar
    productForm.resetForm(); // Reseteamos los campos de newProduct
    this.newProduct.imageUrl = ''; // La imagen también (no está vinculada al formulario)
  }
}
