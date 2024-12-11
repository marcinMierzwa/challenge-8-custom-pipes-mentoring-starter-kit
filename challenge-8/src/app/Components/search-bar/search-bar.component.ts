import { Component, inject, input, InputSignal, OnInit, output } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { TranslatePipe } from '../../Pipes/translate.pipe';
import { Language } from '../../Models/language.enum';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [ReactiveFormsModule, TranslatePipe],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent implements OnInit {

  formBuilder: NonNullableFormBuilder = inject(NonNullableFormBuilder);

  searchBarControl: FormControl<string> = this.formBuilder.control('');

  language: InputSignal<Language> = input.required<Language>();
  sendSearchBarValue = output<string>();

  ngOnInit() {
    this.searchBarControl.valueChanges
      .pipe(
        debounceTime(100), 
      )
      .subscribe((value: string) => {
        this.sendSearchBarValue.emit(value);
      });
  }

}
