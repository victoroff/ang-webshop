import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js'
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl:'./cart.component.html'
})
export class CartComponent implements OnInit {


  constructor(private cartService: CartService, private httpClient: HttpClient) { }

  cart: Cart = {items: [{
    product: 'https://via.placeholder.com/150',
    name: 'Nike',
    price: 150,
    quantity: 1,
    id: 6360
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'Nike',
    price: 150,
    quantity: 3,
    id: 6361
  }
]};
  dataSource: Array<CartItem> = [];
  displayColumns: Array<string> = [
    'product',
    'name',
    'quantity',
    'total',
    'action'
  ];
 

  ngOnInit(): void {
    this.cartService.cart.subscribe((_cart: Cart) => {
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
    
  }

  getTotal(items: Array<CartItem>): number{
    return this.cartService.getTotal(items);
  }

  onClearCart(): void{
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
    
  }

  onAddQuantity(item: CartItem): void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem): void {
   this.cartService.removeQuantity(item);
  }

  onCheckout(): void {
    this.httpClient.post('http://localhost:4200/checkout',{
      items: this.cart.items
    }).subscribe(async (res: any) => {
      let stripe = await loadStripe('pk_test_51N8jGYFb9v1C0r9kF7UidazNGQZV7E6PZzjmUFMQiyZdg9Z8kccfamkFJJgbW6xTPw87V640ZbxzEyaaZ2ioHuBi00wg1A9unV');
        stripe?.redirectToCheckout({
          sessionId:res.id
        })
    });
  }
    
}
