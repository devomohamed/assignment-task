import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./pages/product-list/product-list.component').then(
        (m) => m.ProductListComponent
      ),
  },
  {
    path: 'create',
    loadComponent: () =>
      import(
        './pages/product-create-and-update/product-create-and-update.component'
      ).then((m) => m.ProductCreateAndUpdateComponent),
  },
  {
    path: 'product-details/:id',
    loadComponent: () =>
      import('./pages/product-details/product-details.component').then(
        (m) => m.ProductDetailsComponent
      ),
  },
  {
    path: ':id',
    loadComponent: () =>
      import(
        './pages/product-create-and-update/product-create-and-update.component'
      ).then((m) => m.ProductCreateAndUpdateComponent),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
