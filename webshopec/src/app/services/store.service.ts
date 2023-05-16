import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

const store_base_url = 'https://fakestoreapi.com';
@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private httpClient: HttpClient) { }

  getAllProdcuts(limit= '12', sort='desc', category?: string): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>(
      `${store_base_url}/products${
        category ? '/category/' + category : ''
      }?sort=${sort}$limit${limit}`
    );
  }

  getAllCategories(): Observable<Array<string>>{
    return this.httpClient.get<Array<string>>(
      `${store_base_url}/products/categories`
    );
  }
}
