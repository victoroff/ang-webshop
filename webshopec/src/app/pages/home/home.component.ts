import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Cart } from 'src/app/models/cart.model';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: {[id:number]: number} = {1: 400 , 3: 335, 4: 350};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit , OnDestroy{
  [x: string]: any;

  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubscripiton: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.getProducts();
  }
  
  getProducts(): void{
    this.productsSubscripiton = this.storeService.getAllProdcuts(this.count,this.sort, this.category)
    .subscribe((_products) => {
      this.products = _products;
    });
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

  onItemsCountChange(nwCount: number): void{
    this.count = nwCount.toString();
    this.getProducts();
  }
  onSortChange(nwSort:string): void{
    this.sort = nwSort;
    this.getProducts();
  }
  onShowCategory(nwCategory: string) {
     this.category = nwCategory;
     this.getProducts();
  }

  ///avoid memory leaks
  ngOnDestroy(): void {
    if(this.productsSubscripiton){
      this.productsSubscripiton.unsubscribe();
    }
  }

}
