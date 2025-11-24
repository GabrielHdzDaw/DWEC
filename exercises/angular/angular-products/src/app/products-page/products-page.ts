import { ChangeDetectorRef, Component, inject } from '@angular/core';
import type { Product } from '../interfaces/product';
import { JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'products-page',
  imports: [FormsModule, JsonPipe],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {
  title = 'Mi lista de productos';
  showImage = true;
  printDesc(product: Product) {
    console.log(product.description);
  }

  newProduct!: Product;
  fileName = '';

  #changeDetector = inject(ChangeDetectorRef); // Necessary in new Angular zoneless apps

  constructor() {
    this.resetProduct();
  }

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

  addProduct() {
    this.newProduct.id = Math.max(...this.products.map((p) => p.id!)) + 1;
    this.products.push(this.newProduct);
    this.fileName = '';
    this.resetProduct();
  }

  private resetProduct() {
    this.newProduct = {
      id: 0,
      description: '',
      available: '',
      imageUrl: '',
      rating: 1,
      price: 0,
    };
    this.fileName = '';
  }

  toggleImage() {
    this.showImage = !this.showImage;
  }

  // products: Product[] = [];
  products: Product[] = [
    {
      id: 1,
      description: 'SSD hard drive',
      available: '2016-10-03',
      price: 75,
      imageUrl: 'ssd.jpg',
      rating: 5,
    },
    {
      id: 2,
      description: 'LGA1151 Motherboard',
      available: '2016-09-15',
      price: 96.95,
      imageUrl: 'motherboard.jpg',
      rating: 4,
    },
    {
      id: 3,
      description: 'RAM 16GB',
      available: '2016-10-03',
      price: 320,
      imageUrl: 'ram.jpg',
      rating: 10,
    },
    {
      id: 5,
      description: 'HDD 4TB',
      available: '2016-09-15',
      price: 542,
      imageUrl: 'hdd.jpg',
      rating: 2,
    },
  ];
}
