import { Component,  input, InputSignal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../Pipes/translate.pipe';
import { Language } from '../../Models/language.enum';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent  {

  searchBarControl = '';

  language: InputSignal<Language> = input.required<Language>();
  SearchBarValueChange = output<string>();

  onInputChange(inputValue: string): void {
    this.SearchBarValueChange.emit(inputValue);
    
  }

}
