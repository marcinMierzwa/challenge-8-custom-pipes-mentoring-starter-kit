import { Component, computed, effect, inject, Signal } from '@angular/core';
import { ProductService } from './Services/product.service';
import { JsonPipe,} from '@angular/common';
import { ProductInterface } from './Models/product-interface';
import { toSignal } from '@angular/core/rxjs-interop'
import {CdkTableModule} from '@angular/cdk/table';
import { TruncatePipe } from './Pipes/truncate.pipe';
import { FallbackImagePipe } from './Pipes/fallback-image.pipe';
import { FormatPricePipe } from './Pipes/format-price.pipe';
import { PublishedSincePipe } from './Pipes/published-since.pipe';
import { TimePeriod } from './Models/time-period.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [JsonPipe, CdkTableModule, TruncatePipe, FallbackImagePipe, FormatPricePipe, PublishedSincePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'mentoring-program-starter-kit';
  timePeriod: TimePeriod = TimePeriod.YEARS;

  productService: ProductService = inject(ProductService);

  readonly productsSignal: Signal <ProductInterface[]> = toSignal(this.productService.getProducts(), {initialValue: []}); 

  displayedColumns: string[] = ['name', 'imageUrl', 'price', 'publishedAt', 'id']
  dataSource: ProductInterface[] = this.productsSignal();

  constructor() {
    effect(() =>  this.dataSource = this.productsSignal());
  }  
}
