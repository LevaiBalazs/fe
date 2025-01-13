import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit, OnDestroy {


  oszlopok = [
    { key: "category", text: "Category", type: "text" },
    { key: "description", text: "Description", type: "text" },
    { key: "price", text: "Price", type: "number" },
    { key: "name", text: "Name", type: "text" },
  
  ];


  products: any[] = [];
  newProduct: any = {};
  feliratkozas!: Subscription;
  error = false;
  errorText = "";

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getProduct();
  }

  ngOnDestroy(): void {
    if (this.feliratkozas) this.feliratkozas.unsubscribe();
  }


  getProduct() {
    this.api.getProduct().subscribe((data: any) => {
      this.products = data ? Object.entries(data).map(([key, value]: any) => ({ ...value, id: key })) : []
    })
  }


  createProduct(){
    this.api.createProduct(this.newProduct).subscribe(() => this.getProduct());
  }

  

  updateProduct(product: any): void {
    this.api.updateProduct(product, product.id).subscribe(() => this.getProduct());
  }

  deleteProduct(id: number): void {
    this.api.deleteProduct(id).subscribe(() => this.getProduct());
  }
}
