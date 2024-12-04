import { Component, inject, Signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductService } from './Services/product.service';
import { JsonPipe } from '@angular/common';
import { ProductInterface } from './Models/product-interface';
import { toSignal } from '@angular/core/rxjs-interop'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mentoring-program-starter-kit';
  private productService: ProductService = inject(ProductService);
  readonly products: Signal <ProductInterface[]> = toSignal(this.productService.getProducts(), {initialValue: []})   

  getProducts(): void {
    // this.productService.getProducts()
  }
}
