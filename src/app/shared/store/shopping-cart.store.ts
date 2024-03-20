import { computed, inject } from "@angular/core";
import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { Product } from "@shared/models/product.interface";
import { ToastrService } from "ngx-toastr";

export interface CartStore {
  products: Product[];
  totalAmount: number;
  productsCount: number;
}

const initialState: CartStore = {
  products: [],
  totalAmount: 0,
  productsCount: 0
}

export const CartStore = signalStore(
  { providedIn: 'root'},
  withState(initialState),
  withComputed(({products})=>({
    productsCount: computed(()=> calculateProductsCount(products())),
    totalAmount: computed(()=> calculateTotalAmount(products()))
  })),
  withMethods(
    ({products, ...store}, toastSvc = inject(ToastrService)) => ({
      addToCart(product: Product){
        const isProductInCart = products().find((item: Product) => product.id === item.id);

        if (isProductInCart) {
          isProductInCart.qty++;
          isProductInCart.subTotal = isProductInCart.qty * isProductInCart.price;
          patchState(store, {products: [...products()]});
        } else {
          patchState(store, {products: [...products(), product]});
        }

        toastSvc.success('Product added', 'Domini Store')
      },
      removeToCart(id: number){
        const updateProducts = products().filter(product => product.id != id);
        patchState(store, {products: updateProducts});
        toastSvc.info('Product removed', 'Domini Store');
      },
      clearCart(){
        patchState(store, initialState);
        toastSvc.info('Cart cleared', 'Domini Store');
      },
    })
  ),
);

function calculateTotalAmount(products: Product[]): number{
  return products.reduce((acc, product) => acc + product.subTotal, 0);
};

function calculateProductsCount(products: Product[]): number{
  return products.reduce((acc, product) => acc + product.qty, 0);
};
