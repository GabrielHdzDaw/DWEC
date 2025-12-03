import { DatePipe, UpperCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { Product } from '../interfaces/product';
import { IntlCurrencyPipe } from '../pipes/intl-currency-pipe';

@Component({
  selector: 'products-item',
  standalone: true,
  imports: [DatePipe, UpperCasePipe, IntlCurrencyPipe],
  templateUrl: './product-item.html',
  styleUrl: './product-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductItem {
  product = input.required<Product>(); // required (obligatorio)
  showImage = input(true); // Con valor inicial por defecto (opcional)

  deleted = output<void>();

  deleteProduct() {
    this.deleted.emit(); // Lanzamos el evento
  }
}
