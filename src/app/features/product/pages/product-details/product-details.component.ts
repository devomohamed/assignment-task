import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CurrencyPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [DatePipe, CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss',
})
export class ProductDetailsComponent implements OnInit {
  productId: number | null = null;
  productDetails!: Product;
  index: number = 0;
  currentImageIndex: number = 0;

  constructor(
    private route: ActivatedRoute,
    private _productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'] ? +params['id'] : null;
      console.log('this.productId: ', this.productId);

      if (this.productId) {
        this.getProductDetails();
      }
    });
  }

  getProductDetails() {
    this._productService.getProductById(this.productId!).subscribe({
      next: (product) => {
        this.productDetails = product;
        console.log('Product details:', this.productDetails);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }

  get image(): string {
    return (
      this.productDetails?.images?.[this.currentImageIndex] ||
      'https://prd.place/400'
    );
  }

  handleImageError(event: Event) {
    (event.target as HTMLImageElement).src = 'https://prd.place/400';
  }
}
