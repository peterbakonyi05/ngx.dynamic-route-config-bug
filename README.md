# Ngx.DynamicRouteConfigBug

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Issue

When route configuration contains some shared static data, that data will be ignore with AOT compiler. However it works as expected with JIT compiler.

```ts
const sharedConfig = {
  data: {
    trackingArea: 'some-feature',
    product: 'some-feature'
  }
};

// `data` property will not be present with AOT
const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, ...sharedConfig },
  { path: '**', component: NotFoundComponent, ...sharedConfig }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## How to replicate the issue?

Start the application and open the console. With JIT compiler, route config will contain `data` property as expected, with AOT it will be `undefined`.

Run the JIT compiler with `npm start`
Run the AOT compiler with `npm run start-prod`

In both cases the app will run on `http://localhost:4200`

## Why is it a problem?
Imagine having 100+ routes split into 3-4 big features. Some of the routes needs the same static configuration in the `data` property. Without sharing
not config the route configuration will be quite verbose and not DRY at all (~30% more config with a lot of duplication).
