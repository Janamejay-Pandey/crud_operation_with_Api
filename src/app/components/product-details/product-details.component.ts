import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  currentProduct = null;
  message = '';

  constructor(
    private productService: ProductService, 
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.message = '';
    this.getProduct(this.route.snapshot.paramMap.get('id'));
  }

  getProduct(id): void {
    this.productService.read(id)
    .subscribe(
      product => {
        this.currentProduct = product[0];
        console.log(product);
      },
      error => {
        console.log(error);
      }
    );
  }

  setAvailbleStatus(status): void {
    const data = {
      name: this.currentProduct.name,
      description: this.currentProduct.description,
      availabe: status
    };

    this.productService.update(this.currentProduct.id, data)
    .subscribe(
      response => {
        this.currentProduct.availabe = status;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  updateProduct(): void {
   this.productService.update(this.currentProduct.id, this.currentProduct)
   .subscribe(
     response => {
       
       this.message = 'The product was updated!';
       console.log(response)
       this.currentProduct = null;
     },
     error => {
       console.log(error);
     }
   );
  }

  deleteProduct(): void {
    this.productService.delete(this.currentProduct.id)
    .subscribe(
      response => {
        console.log(response);
        this.router.navigate(['/products']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
