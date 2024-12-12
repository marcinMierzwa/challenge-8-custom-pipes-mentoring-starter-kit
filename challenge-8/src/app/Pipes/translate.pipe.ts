import { Inject, Pipe, PipeTransform } from '@angular/core';
import { Language } from '../Models/language.enum';

@Pipe({
  name: 'translate',
  standalone: true,
})
export class TranslatePipe implements PipeTransform {
  constructor(@Inject('TRANSLATION') private translation: any) {}

  transform(text: string, language: Language): string {
    return this.translation[language]?.[text] || text;
  }
}
