import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/model/product.model';
import { ActionEvent, ProductActionsTypes } from 'src/app/state/product.state';


@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product| null=null;
  @Output() eventEmitter : EventEmitter<ActionEvent> =new EventEmitter(); 

  constructor() { }

  ngOnInit(): void {
  }

  onSelect(product: Product){
    this.eventEmitter.emit({type:ProductActionsTypes.SELECT_PRODUCT,payload:product})

  }

  onDelete(product: Product){
    this.eventEmitter.emit({type:ProductActionsTypes.DELETE_PRODUCT,payload:product})

  }

  onEdit(product: Product){
    this.eventEmitter.emit({type:ProductActionsTypes.EDIT_PRODUCT,payload:product})


  }

}
