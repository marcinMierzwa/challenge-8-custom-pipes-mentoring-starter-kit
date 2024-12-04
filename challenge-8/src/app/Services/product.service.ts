import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductResponseInterface } from '../Models/product-response.interface';
import { Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private httpClient: HttpClient = inject(HttpClient);

  getProducts(): Observable<ProductResponseInterface[]> {
    return this.httpClient.get<ProductResponseInterface[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/product-pipes') 
  }

}

