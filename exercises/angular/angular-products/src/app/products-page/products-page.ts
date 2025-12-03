import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import type { Product } from '../interfaces/product';
import { ProductForm } from '../product-form/product-form';
import { ProductItem } from '../product-item/product-item';


@Component({
  selector: 'products-page',
  imports: [FormsModule, ProductItem, ProductForm],
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
  newProduct = {
    id: 0,
    description: '',
    available: '',
    imageUrl: '',
    rating: 1,
    price: 0,
  };
  fileName = '';

  search = signal('');
  filteredProducts = computed(() =>
    this.products().filter((p) =>
      p.description.toLocaleLowerCase().includes(this.search().toLocaleLowerCase())
    )
  );

  // #changeDetector = inject(ChangeDetectorRef); // Necessary in new Angular zoneless apps

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

  addProduct(product: Product) {
    product.id = Math.max(...this.products().map((p) => p.id!)) + 1;
    this.products.update((products) => [...products, product]);
  }

  deleteProduct(product: Product) {
    this.products.update((products) => products.filter((p) => p !== product));
  }

  // private resetProduct() {
  //   this.
  //   this.fileName = '';
  // }

  toggleImage() {
    this.showImage.update((show) => !show);
  }

  // products: Product[] = [];
  products = signal<Product[]>([
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
  ]);
}
