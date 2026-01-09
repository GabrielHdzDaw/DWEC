import {
  ChangeDetectorRef,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  numberAttribute,
} from '@angular/core';
import { ProductsService } from '../services/products-service';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IntlCurrencyPipe } from '../../shared/pipes/intl-currency-pipe';
import { StarRating } from '../star-rating/star-rating';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'product-detail',
  imports: [IntlCurrencyPipe, StarRating, DatePipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css',
})
export class ProductDetail {
  id = input.required({ transform: numberAttribute });
  #productsService = inject(ProductsService);
  productResource = this.#productsService.getProductIdResource(this.id);

  product = computed(() => this.productResource.value()?.product);

  #title = inject(Title);
  #router = inject(Router);
  #destroyRef = inject(DestroyRef);
  #changeDetector = inject(ChangeDetectorRef);

  constructor() {
    effect(() => {
      if (this.productResource.hasValue())
        this.#title.setTitle(this.product()?.description + ' | Angular Products');
      if (this.productResource.error()) this.#router.navigate(['/products']);
    });
  }

  changeRating(rating: number) {
    const product = this.product()!;
    const oldRating = product.rating;
    product.rating = rating;

    this.#productsService
      .changeRating(product.id!, rating)
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe({
        error: () => {
          product.rating = oldRating;
          this.#changeDetector.markForCheck();
        },
      });
  }

  goBack() {
    this.#router.navigate(['/products']);
  }
}
