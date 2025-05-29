import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Product } from '../../models/product.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-create-and-update',
  imports: [ReactiveFormsModule],
  templateUrl: './product-create-and-update.component.html',
  styleUrl: './product-create-and-update.component.scss',
})
export class ProductCreateAndUpdateComponent implements OnInit {
  productForm: FormGroup = new FormGroup({});
  productId: number | null = null;
  productDetails!: Product;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formCreation();
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
        this.bindFormData(product);
      },
      error: (error) => {
        console.error('Error fetching product details:', error);
      },
    });
  }

  formCreation() {
    this.productForm = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3)]],
      description: [null],
      price: [null, [Validators.required, Validators.min(0.01)]],
    });
  }

  bindFormData(product: Product | null) {
    this.productForm.patchValue({
      title: product?.title || '',
      description: product?.description || '',
      price: product?.price || null,
      images: product?.images || [],
    });
  }

  onSubmit() {
    if (this.productForm.valid) {
      const productData: Product = this.productForm.value;
      if (this.productId) {
        // Update existing product logic
        console.log('Updating product:', this.productId, productData);
        this.updateProduct(this.productId, productData);
      } else {
        // Create new product logic
        console.log('Creating new product:', productData);
        this.createProduct();
      }
    } else {
      console.error('Form is invalid');
    }
  }

  createProduct() {
    const productData: Product = this.productForm.value;
    this._productService.createProduct(productData).subscribe({
      next: (createdProduct) => {
        console.log('Product created successfully:', createdProduct);
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Error creating product:', error);
      },
    });
  }

  updateProduct(productId: number, productData: Product) {
    this._productService.updateProduct(productId, productData).subscribe({
      next: (updatedProduct) => {
        console.log('Product updated successfully:', updatedProduct);
        this.router.navigate(['/products']);
      },
      error: (error) => {
        console.error('Error updating product:', error);
      },
    });
  }
}
