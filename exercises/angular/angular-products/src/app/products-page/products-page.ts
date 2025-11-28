import { DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  signal,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import type { Product } from '../interfaces/product';
import { IntlCurrencyPipe } from '../pipes/intl-currency-pipe';
import { ProductFilterPipe } from '../pipes/product-filter-pipe';

@Component({
  selector: 'products-page',
  imports: [FormsModule, JsonPipe, DatePipe, UpperCasePipe, IntlCurrencyPipe, ProductFilterPipe],
  standalone: true,
  providers: [],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsPage {
  title = 'Mi lista de productos';
  showImage = signal(true);
  printDesc(product: Product) {
    console.log(product.description);
  }

  newProduct!: Product;

  fileName = '';

  search = signal('');

  #changeDetector = inject(ChangeDetectorRef); // Necessary in new Angular zoneless apps

  constructor() {
    this.newProduct = {
      id: 0,
      description: '',
      available: '',
      imageUrl: '',
      rating: 1,
      price: 0,
    };
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

  addProduct(form: NgForm) {
    this.newProduct.id = Math.max(...this.products.map((p) => p.id!)) + 1;
    this.products = [...this.products, {...this.newProduct}];
    this.fileName = '';
    this.newProduct.imageUrl = '';
    form.resetForm();
  }

  // private resetProduct() {
  //   this.newProduct = {
  //     id: 0,
  //     description: '',
  //     available: '',
  //     imageUrl: '',
  //     rating: 1,
  //     price: 0,
  //   };
  //   this.fileName = '';
  // }

  toggleImage() {
    this.showImage.update((show) => !show);
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
