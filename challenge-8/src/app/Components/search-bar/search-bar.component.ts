import { Component,  inject,  input, InputSignal, output } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '../../Pipes/translate.pipe';
import { Language } from '../../Models/language.enum';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent  {

  formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);
  searchBar: FormControl = this.formBuilder.control("");


  language: InputSignal<Language> = input.required<Language>();
  SearchBarValueChange = output<string>();

  onInputChange() {
    const inputValue = this.searchBar.getRawValue();
    this.SearchBarValueChange.emit(inputValue);
  }

}
