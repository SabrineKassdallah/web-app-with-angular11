import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import {  DataStateEnum, AppDataState, ProductActionsTypes } from 'src/app/state/product.state';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ActionEvent } from 'src/app/state/product.state';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {
  @Input() productsInput$: Observable <AppDataState<Product[]>> | null=null; // soit un tableau de products ,soit prend valeur null s'il n' y a pas des produits
  @Output() productEventEmitter : EventEmitter<ActionEvent> =new EventEmitter(); 

  readonly DataStateEnum = DataStateEnum;

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(p: Product){
    this.productEventEmitter.emit({type: ProductActionsTypes.SELECT_PRODUCT, payload:p});

  }

  onDelete(p: Product){
    this.productEventEmitter.emit({type: ProductActionsTypes.DELETE_PRODUCT, payload:p});

  }

  onEdit(p: Product) {
    this.productEventEmitter.emit({type: ProductActionsTypes.EDIT_PRODUCT, payload:p});

  }

  onActionEvent($event: ActionEvent){
    this.productEventEmitter.emit($event);
    
  }

}
