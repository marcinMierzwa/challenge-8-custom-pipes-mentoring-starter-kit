import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value: string, searchText: string) : string{
    if (!value || searchText.length < 3) {
      return value;
    }
    const words = value.split(/\s+/);

    const result = words.map(word => {
      return word.toLowerCase().includes(searchText.toLowerCase())
        ? `*${word}*` 
        : word;
    });

    return result.join(' ');    
  }

}
