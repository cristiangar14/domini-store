import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CheckoutSvc } from '@api/checkout.service';
import { CartStore } from '@shared/store/shopping-cart.store';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export default class CheckoutComponent {
  cartStore = inject(CartStore);
  private readonly _checkoutService = inject(CheckoutSvc);

  public clearAll(): void{
    this.cartStore.clearCart();
  }

  public removeItem(id: number): void {
    this.cartStore.removeToCart(id);
  }

  public onProceedToPay(){
    this._checkoutService.onProceedToPay(this.cartStore.products());
  }
}
