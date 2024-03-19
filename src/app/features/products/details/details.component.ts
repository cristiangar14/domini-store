import { CurrencyPipe } from '@angular/common';
import { Component, OnInit, Signal, inject, input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export default class DetailsComponent implements OnInit{
  starsArray: number[] = new Array(5).fill(0);
  productId = input<number>(0, {alias: 'id'});
  product!: Signal<Product | undefined>;
  cartStore = inject(CartStore);

  private readonly productSvc = inject(ProductService);
  private readonly _sanitazer = inject(DomSanitizer);

  ngOnInit(): void {
    this.product = this.productSvc.getProductById(this.productId());
  }

  generateSVG(index: number): SafeHtml{
    let svgContent = null;
    const rate = this.product()?.rating.rate as number;

    if (index + 1 <= Math.floor(rate)) {
      svgContent = `<svg class="ui-review-capability__rating__rating__star" aria-hidden="true" width="16.8" height="16" viewBox="0 0 10 10"><path fill="#3483FA" fill-rule="evenodd" d="M5.056 8L1.931 9.648l.597-3.49L0 3.684l3.494-.509L5.056 0l1.562 3.176 3.494.51-2.528 2.471.597 3.491z"></path></svg>`;
    } else if (index < rate) {
      svgContent = `<svg aria-hidden="true" class="ui-review-capability__rating__rating__star" width="16.8" height="16" viewBox="0 0 10 10"><g fill="none" fill-rule="evenodd"><path fill="transparent" d="M5.256 8L2.131 9.648l.597-3.49L.2 3.684l3.494-.509L5.256 0l1.562 3.176 3.494.51-2.528 2.471.597 3.491z" stoke-width="1" stroke="rgba(0, 0, 0, 0.25)" vector-effect="non-scaling-stroke"></path><path fill="#3483FA" d="M5.272 8.026L2.137 9.679l.6-3.502L.2 3.697l3.505-.51L5.272 0z" stoke-width="1" stroke="#3483FA" vector-effect="non-scaling-stroke"></path></g></svg>`;
    } else {
      svgContent = `<svg aria-hidden="true" class="ui-review-capability__rating__rating__star" width="16.8" height="16" viewBox="0 0 10 10"><g fill="none" fill-rule="evenodd"><path fill="transparent" d="M5.256 8L2.131 9.648l.597-3.49L.2 3.684l3.494-.509L5.256 0l1.562 3.176 3.494.51-2.528 2.471.597 3.491z" stoke-width="1" stroke="rgba(0, 0, 0, 0.25)" vector-effect="non-scaling-stroke"></path></g></svg>`;
    }
    return this._sanitazer.bypassSecurityTrustHtml(svgContent);
  }

  onAddToCart(){
    this.cartStore.addToCart(this.product() as Product);
  }

}
