import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: "products" , component:ProductsComponent},
  { path: "newProduct" , component:ProductAddComponent},
  { path: "" , component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
