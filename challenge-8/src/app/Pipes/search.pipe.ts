import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value: string, searchText: string){
    // if (!value) return '';
    // console.log(value);
    return searchText.length >= 3 ?  value.toLowerCase().match(searchText) : value
    
    

    
  }

}
