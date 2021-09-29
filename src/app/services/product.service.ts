import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {




  private baseUrl =  environment.MyShopApiUrl + "/products";
  constructor(private httpClient: HttpClient) { }
  private categoryUrl =  environment.MyShopApiUrl + "/product-category";

  getProductListPaginate(page:number, pageSize:number, categoryId: number): Observable<GetResponseProduct> {
    //build url based on category id, page, page size

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`
    +`&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }


  getProductList(categoryId: number): Observable<Product[]> {
    //build url based on category id

    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {

    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }
  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;

    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(keyword:string, page:number, pageSize:number): Observable<GetResponseProduct> {
    //build url based on keyword, page, page size

    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`
    +`&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProduct(productId: number): Observable<Product> {
    //build url based on product id
    const productUrl = `${this.baseUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }
}
//unwraps the JSON from the Spring Data REST _embedded entry
interface GetResponseProduct {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number;
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}
