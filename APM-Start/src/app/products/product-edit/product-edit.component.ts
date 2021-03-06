import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../../messages/message.service';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  pageTitle = 'Product Edit';
  errorMessage: string;

  //product: Product;
  private dataIsValid:{[key:string]:boolean} = {};

  get isDirty():boolean{
    return JSON.stringify(this.originalProduct) !== JSON.stringify(this.currentProduct);
  }
  private currentProduct:Product;
  private originalProduct:Product;

  get product():Product{
    return this.currentProduct;
  }
  set product(value:Product){
    this.currentProduct = value;
    //Clone the object to retain a copy (spread operator)
    this.originalProduct = {...value};
  }


  constructor(private productService: ProductService,
              private messageService: MessageService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }
  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.onProductRetrieved(data['product']);
    });
    //Old Code without using resolver
    // this.activatedRoute.paramMap.subscribe(params => {
    //   this.getProduct(+params.get('id'));
    // })
  }

  //Old Code without using resolver
  // getProduct(id: number): void {
  //   this.productService.getProduct(id).subscribe({
  //     next: product => this.onProductRetrieved(product),
  //     error: err => this.errorMessage = err
  //   });
  // }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (!this.product) {
      this.pageTitle = 'No product found';
    } else {
      if (this.product.id === 0) {
        this.pageTitle = 'Add Product';
      } else {
        this.pageTitle = `Edit Product: ${this.product.productName}`;
      }
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete(`${this.product.productName} was deleted`);
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id).subscribe({
          next: () => this.onSaveComplete(`${this.product.productName} was deleted`),
          error: err => this.errorMessage = err
        });
      }
    }
  }

  isValid(path?:string) :boolean{
    this.validate();
    if(path){
      return this.dataIsValid[path];
    }
    return(this.dataIsValid && 
      Object.keys(this.dataIsValid).every(d=> this.dataIsValid[d] === true));
  }
  saveProduct(): void {
    if (this.isValid()) {
      if (this.product.id === 0) {
        this.productService.createProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The new ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      } else {
        this.productService.updateProduct(this.product).subscribe({
          next: () => this.onSaveComplete(`The updated ${this.product.productName} was saved`),
          error: err => this.errorMessage = err
        });
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }
    this.router.navigate(['/products']);
    // Navigate back to the product list
  }

  validate():void{
    this.dataIsValid ={};
    //info tab
    if(this.product.productName&& 
      this.product.productName.length >=3 &&
      this.product.productCode){
        this.dataIsValid['info'] = true;
      }else{
        this.dataIsValid['info'] = false;
      }
      //tags tab
      if(this.product.productName&& 
        this.product.productName.length >=3 &&
        this.product.productCode){
          this.dataIsValid['tags'] = true;
        }else{
          this.dataIsValid['tags'] = false;
        }
  }
}
