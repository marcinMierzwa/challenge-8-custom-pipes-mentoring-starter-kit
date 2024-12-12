import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatProductCode',
  standalone: true,
})
export class FormatProductCodePipe implements PipeTransform {
  transform(productId: string, productName: string): string {
    if (!productId || !productName) return '';

    const paddedId = productId.padStart(3, '0');
    const consonants = productName.replace(/[^bcdfghjklmnpqrstvwxyz]/gi, '');
    const codePart = consonants.slice(0, 3).toLowerCase();

    return `${paddedId}-${codePart}`;
  }
}
