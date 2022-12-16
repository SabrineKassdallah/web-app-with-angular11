import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, startWith, catchError } from 'rxjs/operators';
import { Product } from 'src/app/model/product.model';
import { NotificationService } from 'src/app/services/notification.service';
import { ProductsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  productId:number
  productFormGroup?:FormGroup;
  submitted:boolean=false;
  all_products$: Observable <AppDataState<Product[]>> | null=null;
  constructor(private activatedRoute:ActivatedRoute, 
    private productService:ProductsService, private fb:FormBuilder, private notifyService: NotificationService) { 
    this.productId = activatedRoute.snapshot.params.id;
  }

  ngOnInit(): void {
    this.productService.getProduct(this.productId).subscribe(product=>{
      this.productFormGroup = this.fb.group({
        id:[product.id,Validators.required],
        name:[product.name,Validators.required],
        price:[product.price,Validators.required],
        quantity:[product.quantity,Validators.required],
        selected:[product.selected,Validators.required],
        available:[product.available,Validators.required]
      })
    });
  }

  onUpdateProduct(){
    this.productService.updateProduct(this.productFormGroup?.value).subscribe(
      data => {
        this.notifyService.showSuccess(data["successMessage"], "Update Success")

      },
      error => {
        this.notifyService.showError(error.error.message, "failed")
      });
    

  }

}
