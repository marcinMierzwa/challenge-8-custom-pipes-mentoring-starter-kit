import { HttpClient } from '@angular/common/http';
import {
  inject,
  Injectable,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductResponseInterface } from '../Models/product-response.interface';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private httpClient: HttpClient = inject(HttpClient);
  isLoading: WritableSignal<boolean> = signal(true);

  getProducts(): Observable<ProductResponseInterface[]> {
    return this.httpClient
      .get<ProductResponseInterface[]>(
        'https://636ce2d8ab4814f2b2712854.mockapi.io/product-pipes'
      )
      .pipe(tap(() => this.isLoading.set(false)));
  }
}
