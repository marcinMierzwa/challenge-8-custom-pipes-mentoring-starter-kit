import {
  Component,
  inject,
  signal,
  Signal,
  WritableSignal,
} from '@angular/core';
import { ProductService } from './Services/product.service';
import { ProductInterface } from './Models/product-interface';
import { toSignal } from '@angular/core/rxjs-interop';
import { Language } from './Models/language.enum';
import { SearchBarComponent } from './Components/search-bar/search-bar.component';
import { TableComponent } from './Components/table/table.component';
import { TRANSLATIONS } from './translations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SearchBarComponent, TableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: 'TRANSLATION',
      useValue: TRANSLATIONS,
    },
  ],
})
export class AppComponent {
  title = 'mentoring-program-starter-kit';
  language: WritableSignal<Language> = signal<Language>(Language.EN);

  productService: ProductService = inject(ProductService);

  readonly productsSignal: Signal<ProductInterface[]> = toSignal(
    this.productService.getProducts(),
    { initialValue: [] }
  );
  searchBarSignal: WritableSignal<string> = signal<string>('');

  onLanguageChange(language: 'EN' | 'PL'): void {
    language === 'EN'
      ? this.language.set(Language.EN)
      : this.language.set(Language.PL);
  }

  captureSearchBarValue(searchBarValue: string): void {
    this.searchBarSignal.set(searchBarValue);
  }
}
