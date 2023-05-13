import { Component, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';

const ROWS_HEIGHT: {[id:number]: number} = {1: 400 , 3: 335, 4: 350};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {
  [x: string]: any;

  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];

  
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }
  
  onColumnsCountChange(colsNum: number) {
    this.cols = colsNum;
  }

  onShowCategory(nwCategory: string) {
     this.category = nwCategory;
     this.rowHeight = ROWS_HEIGHT[this.cols];
  }


}
