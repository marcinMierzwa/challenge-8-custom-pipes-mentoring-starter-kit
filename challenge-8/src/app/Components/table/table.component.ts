import { Component, input, InputSignal } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { ProductInterface } from '../../Models/product-interface';
import { TruncatePipe } from '../../Pipes/truncate.pipe';
import { TimePeriod } from '../../Models/time-period.enum';
import { Language } from '../../Models/language.enum';
import { FallbackImagePipe } from '../../Pipes/fallback-image.pipe';
import { FormatPricePipe } from '../../Pipes/format-price.pipe';
import { PublishedSincePipe } from '../../Pipes/published-since.pipe';
import { FormatProductCodePipe } from '../../Pipes/format-product-code.pipe';
import { TranslatePipe } from '../../Pipes/translate.pipe';
import { SearchPipe } from '../../Pipes/search.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CdkTableModule,
    TruncatePipe,
    FallbackImagePipe,
    FormatPricePipe,
    PublishedSincePipe,
    FormatProductCodePipe,
    TranslatePipe,
    SearchPipe,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  timePeriod: TimePeriod = TimePeriod.MONTHS;
  language: InputSignal<Language> = input.required<Language>();
  displayedColumns: string[] = [
    'name',
    'imageUrl',
    'price',
    'publishedAt',
    'id',
  ];
  dataSource: InputSignal<ProductInterface[]> =
    input.required<ProductInterface[]>();
  searchBarSignal: InputSignal<string> = input.required<string>();
}
