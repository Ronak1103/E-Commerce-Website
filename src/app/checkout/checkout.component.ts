import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { order } from '../data-type';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  totalPrice:number|undefined;
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price=0;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity);  
        }
      });
      this.totalPrice = Math.floor(price + (price / 10) + 100 - (price / 10));
    })
  }

  orderNow(data: { email: string, address: string, contact: string , city: string , pincode:string,image:string}){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }
      this.product.orderNow(orderData).subscribe((result)=>{
        if(result){
          alert('Order placed')
        }
      })
  }
}
}
