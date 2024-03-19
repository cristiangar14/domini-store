import { Component, inject } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ProductService } from '@api/products.service';
import { Product } from '@shared/models/product.interface';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export default class ProductsComponent {
  private readonly productSvc = inject(ProductService);
  products = this.productSvc.products;
  cartStore = inject(CartStore);

  public onAddToCardEvent(product: Product): void{
    this.cartStore.addToCart(product);
  }
}
