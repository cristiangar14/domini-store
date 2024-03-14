import { HttpClient } from "@angular/common/http";
import { EnvironmentInjector, Injectable, inject, runInInjectionContext, signal } from "@angular/core";
import { Product } from "@shared/models/product.interface";
import { environment } from "@envs/environment";
import { toSignal } from "@angular/core/rxjs-interop";

import { tap } from "rxjs";

@Injectable({providedIn: 'root'})
export class ProductService {

  public products = signal<any>([]);
  private readonly _http = inject(HttpClient);
  private readonly _endpoint = environment.apiURL;
  private readonly _injector = inject(EnvironmentInjector);

  constructor() {
    this.getProducts();
  }

  public getProducts(): void {
    this._http.get<Product[]>(`${this._endpoint}/products?sort=desc`)
    .pipe(tap((data: Product[]) => this.products.set(data)))
    .subscribe();
  }

  public getProductById(id: number) {
    const product$ = this._http.get<any>(`${this._endpoint}/products/${id}`);
    return runInInjectionContext(this._injector, () => toSignal<Product>(product$))
  }
}
