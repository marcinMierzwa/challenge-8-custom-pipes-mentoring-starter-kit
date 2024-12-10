import { Component, computed, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
import { ProductService } from './Services/product.service';
import { ProductInterface } from './Models/product-interface';
import { toSignal } from '@angular/core/rxjs-interop'
import {CdkTableModule} from '@angular/cdk/table';
import { TruncatePipe } from './Pipes/truncate.pipe';
import { FallbackImagePipe } from './Pipes/fallback-image.pipe';
import { FormatPricePipe } from './Pipes/format-price.pipe';
import { PublishedSincePipe } from './Pipes/published-since.pipe';
import { TimePeriod } from './Models/time-period.enum';
import { FormatProductCodePipe } from './Pipes/format-product-code.pipe';
import { Language } from './Models/language.enum';
import { TranslatePipe } from './Pipes/translate.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CdkTableModule, TruncatePipe, FallbackImagePipe, FormatPricePipe, PublishedSincePipe, FormatProductCodePipe, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: 'TRANSLATION',
      useValue: {
        en: {
          NAME: 'Name',
          IMAGE: 'Image',
          PRICE: 'Price',
          PUBLISHED_SINCE: 'Published Since',
          PRODUCT_CODE: 'Product Code',
          PUBLISHED_AT: 'Published At',
          YEAR_AGO: 'year ago',
          YEARS_AGO: 'years ago',
          MONTHS_AGO: 'months ago',
          DAYS_AGO: 'days ago',
        },
        pl: {
          NAME: 'Nazwa',
          IMAGE: 'Zdjęcie',
          PRICE: 'Cena',
          PUBLISHED_SINCE: 'Opublikowano',
          PRODUCT_CODE: 'Kod Produktu',
          YEAR_AGO: 'rok temu',
          YEARS_AGO: 'lata temu',
          MONTHS_AGO: 'miesięcy temu',
          DAYS_AGO: 'dni temu',
        },
      },
    },
  ]
})
export class AppComponent {
  title = 'mentoring-program-starter-kit';
  timePeriod: TimePeriod = TimePeriod.MONTHS;
  language: WritableSignal<Language> = signal<Language>(Language.EN);

  productService: ProductService = inject(ProductService);

  readonly productsSignal: Signal <ProductInterface[]> = toSignal(this.productService.getProducts(), {initialValue: []}); 

  displayedColumns: string[] = ['name', 'imageUrl', 'price', 'publishedAt', 'id']
  dataSource: ProductInterface[] = this.productsSignal();

  constructor() {
    effect(() =>  this.dataSource = this.productsSignal());
  }  

  onLanguageChange(language: 'EN' | 'PL'): void {
    language === 'EN' ? this.language.set(Language.EN) : this.language.set(Language.PL);
  }
}
