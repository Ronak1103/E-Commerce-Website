import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { product } from '../data-type';
import { faTrash ,faEdit} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  productlist: product[] | undefined;
  productMessage: undefined | string;
  icon = faTrash;
  iconEdit = faEdit;
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.fetchProductList();
  }

  deleteProduct(id: number) {
    this.productService.deleteProduct(id).subscribe(
      (result: any) => {
        if (result) {
          this.productMessage = "Product Deleted Successfully";
          this.fetchProductList();
        }
      },
      (error: any) => {
        console.error(error); // Handle or display the error message as needed
      }
    );
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  fetchProductList() {
    this.productService.productList().subscribe(
      (result: any) => {
        console.warn(result);
        if (result) {
          this.productlist = result;
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
