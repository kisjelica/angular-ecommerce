import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  

  private baseUrl = "http://localhost:8080/api/products";
  constructor(private httpClient:HttpClient) { }
  private categoryUrl = "http://localhost:8080/api/product-category";
  getProductList(categoryId: number):Observable<Product[]>{
    //build url based on category id

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories():Observable<ProductCategory[]> {
  
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
  
}
//unwraps the JSON from the Spring Data REST _embedded entry
interface GetResponseProduct{
  _embedded:{
    products:Product[];
  }
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory:ProductCategory[];
  }
}
