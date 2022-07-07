import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root' // le service est disponible ds toute l'application
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<Product[]>{
    let host = environment.host;
    return this.http.get<Product[]>(host+"/products")
  }


  getSelectedProducts():Observable<Product[]>{
    let host = environment.host;
    return this.http.get<Product[]>(host+"/products?selected=true")
  }


  getAvailableProducts():Observable<Product[]>{
    let host = environment.host;
    return this.http.get<Product[]>(host+"/products?available=true")
  }

  SearchProducts(keyword: string):Observable<Product[]>{
    let host = environment.host;
    return this.http.get<Product[]>(host+"/products?name_like=" +keyword)
  }

  Select(product: Product):Observable<Product>{
    let host = environment.host;
    product.selected = !product.selected
    return this.http.put<Product>(host+"/products/" +product.id,product);
  }

  deleteProduct(product: Product):Observable<void>{
    let host = environment.host;
    product.selected = !product.selected
    return this.http.delete<void>(host+"/products/" +product.id);
  }
}
