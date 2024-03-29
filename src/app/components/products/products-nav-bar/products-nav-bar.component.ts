import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-nav-bar',
  templateUrl: './products-nav-bar.component.html',
  styleUrls: ['./products-nav-bar.component.css']
})
export class ProductsNavBarComponent implements OnInit {
    @Output() productEventEmitter : EventEmitter<ActionEvent> =new EventEmitter(); // le comp nav_bar a une sortie productEventEmiter

  constructor() { }

  ngOnInit(): void {
  }

  onGetAllProducts(){
    this.productEventEmitter.emit({type:ProductActionsTypes.GET_ALL_PRODUCTS});

  }

  onGetSelectedProducts(){
    this.productEventEmitter.emit({type:ProductActionsTypes.GET_SELECTED_PRODUCTS});

  }

  onGetAvailableProducts(){
    this.productEventEmitter.emit({type:ProductActionsTypes.GET_AVAILABLE_PRODUCTS});


  }

  onNewProduct(){
    this.productEventEmitter.emit({type:ProductActionsTypes.NEW_PRODUCT});


  }

  onSearch(dataForm: any){
    this.productEventEmitter.emit({type:ProductActionsTypes.SEARCH_PRODUCTS, payload:dataForm });


  }

}
