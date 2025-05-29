import { Component, Input } from '@angular/core';
import { Product } from '../../../features/product/models/product.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-product',
  imports: [RouterModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  @Input() product!: Product;
  index: number = 0;

  get image(): string {
    return this.product?.images?.[this.index] || 'https://prd.place/400';
  }

  handleImageError() {
    let length = this.product?.images?.length || 0;
    if (length > this.index) {
      this.index++;
    } else {
      this.index = -1; // Reset to the first image if no images are available
    }
  }
}
