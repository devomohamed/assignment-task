import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { ProductComponent } from '../../../../shared/componnents/product/product.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [ProductComponent, RouterModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(private _productService: ProductService) {}
  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._productService.getProducts().subscribe(
      (products) => {
        this.products = products;
        console.log(products);
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getAnimationDelay(index: number): number {
    return (index % 4) * 150; // Same stagger logic
  }
}
