import { Component } from '@angular/core';
import type { Product } from '../interfaces/product';
import { NgClass } from '@angular/common';

@Component({
  selector: 'products-page',
  imports: [NgClass],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {
  title = 'Mi lista de productos';
  
  printDesc(product: Product){
    console.log(product.description);
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
