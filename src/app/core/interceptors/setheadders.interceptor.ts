import { HttpHeaders, HttpInterceptorFn } from '@angular/common/http';

export const setheaddersInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.headers.has('Content-Type') || req.body instanceof FormData) {
    return next(req);
  }

  // Clone request with JSON headers
  const jsonReq = req.clone({
    headers: new HttpHeaders({
      ...req.headers.keys().reduce((acc, key) => {
        acc[key] = req.headers.getAll(key)?.join(', ') || '';
        return acc;
      }, {} as { [key: string]: string }),
      'Content-Type': 'application/json',
    }),
    body: req.body ? JSON.stringify(req.body) : null,
  });

  return next(jsonReq);
};
