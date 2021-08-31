import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';

import { Routes, RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
const routes:Routes = [
  //first match wins, define from most specific to most generic
  {path:'category/:id',component:ProductListComponent},//
  {path:'category',component:ProductListComponent},//default id
  {path:'products',component:ProductListComponent},//default id
  {path:'',redirectTo:'/products',pathMatch:'full'},//no specified path
  {path:'**',redirectTo:'/products',pathMatch:'full'}//anything else - generic wildcard


]
@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
