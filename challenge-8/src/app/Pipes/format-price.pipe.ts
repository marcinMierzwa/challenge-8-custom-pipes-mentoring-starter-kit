import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPrice',
  standalone: true,
})
export class FormatPricePipe implements PipeTransform {
  
  transform(price: string): string {
    const formatedPrice = Number(price);
    if (formatedPrice === null) return '';
    return formatedPrice % 1 === 0
      ? formatedPrice.toFixed(0)
      : formatedPrice.toFixed(2);
  }
}
