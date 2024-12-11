import { Component, effect, inject, signal, Signal, WritableSignal } from '@angular/core';
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
import { SearchBarComponent } from './Components/search-bar/search-bar.component';
import { TRANSLATIONS } from './translations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ SearchBarComponent ,CdkTableModule, TruncatePipe, FallbackImagePipe, FormatPricePipe, PublishedSincePipe, FormatProductCodePipe, TranslatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: 'TRANSLATION',
      useValue: TRANSLATIONS
    },
  ]
})
export class AppComponent {
  title = 'mentoring-program-starter-kit';
  timePeriod: TimePeriod = TimePeriod.MONTHS;
  language: WritableSignal<Language> = signal<Language>(Language.EN);

  productService: ProductService = inject(ProductService);

  readonly productsSignal: Signal <ProductInterface[]> = toSignal(this.productService.getProducts(), {initialValue: []});
  searchBarValueSignal: WritableSignal<string> = signal<string>(''); 

  displayedColumns: string[] = ['name', 'imageUrl', 'price', 'publishedAt', 'id']
  dataSource: ProductInterface[] = this.productsSignal();

  constructor() {
    effect(() =>  this.dataSource = this.productsSignal());
    effect(() =>  console.log(this.searchBarValueSignal())
    );
  }  

  onLanguageChange(language: 'EN' | 'PL'): void {
    language === 'EN' ? this.language.set(Language.EN) : this.language.set(Language.PL);
  }

  captureSearchBarValue(searchBarValue: string): void {
    this.searchBarValueSignal.update(()=> searchBarValue);
  }
}
