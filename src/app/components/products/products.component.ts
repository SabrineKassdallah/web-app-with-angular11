import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';
import { catchError, map, startWith} from 'rxjs/operators'
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products$: Observable <AppDataState<Product[]>> | null=null; // soit un tableau de products ,soit prend valeur null s'il n' y a pas des products
    readonly DataStateEnum = DataStateEnum;
  constructor(private productService:ProductsService, private router: Router) { }

  ngOnInit(): void {
  }

  // solution 1:
  // onGetAllProducts(){
  //   this.productService.getAllProducts().subscribe(data=>{
  //     this.products = data;
  //   }, err=>{
  //     console.log(err);
  //   })
  // }

  // solution 2
  onGetAllProducts(){
    this.products$ = 
     this.productService.getAllProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
     );

  }

  onGetSelectedProducts(){
    this.products$ = 
     this.productService.getSelectedProducts().pipe(
      map(data=>({dataState:DataStateEnum.LOADED, data:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
     );

  }

  onGetAvailableProducts() {
    this.products$ = 
     this.productService.getAvailableProducts().pipe(
      map(data=>{
        console.log(data);
        return ({dataState:DataStateEnum.LOADED, data:data})
      }),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
     );

  }

  onSearch(dataForm: any) {
    this.products$ = 
    this.productService.SearchProducts(dataForm.keyword).pipe(
     map(data=>{
       console.log(data);
       return ({dataState:DataStateEnum.LOADED, data:data})
     }),
     startWith({dataState:DataStateEnum.LOADING}),
     catchError(err=>of({dataState:DataStateEnum.ERROR,errorMessage:err.message}))
    );

  }

  onSelect(p: Product){
    this.productService.Select(p).subscribe(data=>{
      p.selected = data.selected;
    })

  }

  onDelete(p: Product){
    let v= confirm("Etes vous sure ?")
    if (v==true)
    this.productService.deleteProduct(p).subscribe(data=>{
      this.onGetAllProducts();
    })
  }

  onNewProduct(){
    this.router.navigateByUrl("/newProduct")
  }

  onEdit(p: Product){
    this.router.navigateByUrl("/editProduct/"+p.id)

  }

}
