
# Angular kickstart
To start with the workshop it is necessary that both TypeScript and the Angular CLI have been installed.
To do so run `npm install -g typescript` and `npm install -g @angular/cli`.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.9.
If you checkout the project and want to run the application ... don't forget to run `npm install` :wink:

Below the steps to recreate this app.

## Get Started
#### Create a new project
`ng new ng-demo`  
You will be asked to provide additional information:

`? Would you like to add Angular routing?`.  
Whith `y` a routing module is created that makes it easy to define your routes.

`? Which stylesheet format would you like to use? (Use arrow keys)`.   
You can select your preferred way to define styling. You can choose between `CSS`, `SCSS`, `Sass`, `Less` and `Stylus`. 

After providing the info your project is generated.
  
#### Navigate to the project folder
`cd ng-demo`

#### Start the development server
Run `ng serve` for a dev server. 
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Inspect the project structure
Have a look at:
* `index.html`
* `src/app.module.ts` - the root module of the project
* `src/app.component.ts` - the root component and it's template `src/app.component.html`
* `angular.json` - config for Angular CLI

## Code scaffolding

Run `ng generate component Account` to generate a new account component. 
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

By default components are prefixed with `app-` so the selector for the account component is `app-account`
The component is automatically added to the `imports` section in `app.module.ts`


#### Display the account component
Replace all content from `app.component.html` by `<app-account></app-account>`

As the server is still running the browser will refresh and show the `app-account` component.
It will show something like `account works!`

#### Create a model class
Add a file `account.ts` to the `src/account` folder.
The file could contain something like: 
```typescript
  export class Account {
    accountNumber: string;
    registrationName: string;
    balance = 123.12;
  
    constructor(accountNumber: string, registrationName: string) {
      this.accountNumber = accountNumber;
      this.registrationName = registrationName;
    }
  }
```
#### Use the model class in the account component
Declare a property `account: Account` in `account.component.ts` and initialize the account in `ngOnInit()`.

#### Use string interpolation to display the account values
Replace the content in `account.component.html` with something like:
```html
<h4>{{ account.accountNumber }}</h4>
<p>{{ account.registrationName }}</p>
<p>{{ account.balance }}</p>
```

#### Use property and event binding to change a value in the model once
Add a property and function to `account.component.ts` that can be used to interact from a button.
In example:
```typescript
  nameChangeAllowed = true;
  
  onNameChange() {
    this.account.registrationName = 'New Name';
    this.nameChangeAllowed = false;
  }
```

Add a button to the `account.component.html` template and hook it up ...
```html
<button (click)="onNameChange()" [disabled]="!nameChangeAllowed">Change Name</button>
```

#### Use two way binding
For two way binding it is required to import the `FormsModule` from `@angular/forms`.
To do so add `FormsModule` to the `imports` section in `app.module.ts`.

Add an input field to `account.component.html` and use `[(ngModel)]` to bind the model to the input field.
```html
<input type="text" [(ngModel)]="account.registrationName">
```

When changeing the registration name you will see that `<p>{{ account.registrationName }}</p>` is automatically updated and follows the entered registration name.
 
#### Use a pipe to format the balance
Pipes can be used to transform data to a certain format.
Add a pipe in `account.component.html` to format the balance as a currency.

```html
<p>{{ account.balance | currency:'EUR' }}</p>
```

## Component interaction

Run `ng generate component AccountList` to generate a new account list component.

Replace the content in `app.component.html` by the selector of the just created component ...
```html
<app-account-list></app-account-list>
```

We will implement a master/detail view so the account list will contain a number of accounts and when clicking an account the account component will display the selected account.

First we will initialize a few accounts in the account-list component `account-list.component.ts` 
```typescript
  accounts: Account[];

  ngOnInit() {
    this.accounts = [
      new Account('11111', 'First Account'),
      new Account('22222', 'Second Account'),
      new Account('33333', 'Third Account')
    ]
  }

```

Now we can show the accounts in the account-list template `account-list.component.html`. For that we need the structural directive `*ngFor` to iterate over the accounts array.

The HTML snippet below will iterate over the accounts and show some data of the account.
```html
<ul>
  <li *ngFor="let account of accounts">
    {{ account.accountNumber }} - {{ account.registrationName }}
  </li>
</ul>
``` 

Now add some functionality to `account-list.component.ts` to track the account that is clicked. 
```typescript
  selectedAccount: Account;
  
  onSelectAccount(account: Account) {
    this.selectedAccount = account;
  }
```

Use event binding to select the account in template `account-list.component.html`.
```html
<ul>
  <li *ngFor="let account of accounts" (click)="onSelectAccount(account)">
    {{ account.accountNumber }} - {{ account.registrationName }}
  </li>
</ul>
``` 

#### @Input() decorator - communicate from parent to child component
Now we will use the account component to display the selected account. For that purpose we need to change `account.component.ts` a bit.
The existing property `account` will be decorated with `@Input()` and the current (dummy) initialization of the account needs to be removed.   
`account.component.ts` will look like

```typescript
  @Input() account: Account;

  ngOnInit() {
  }
```

Change `account-list.component.html` to something like 
```html
<ul>
  <li *ngFor="let account of accounts" (click)="onSelectAccount(account)">
    {{ account.accountNumber }} - {{ account.registrationName }}
  </li>
</ul>

<app-account [account]="selectedAccount"></app-account>
```

Note: `<app-account>` now has a property `[account]` that is bound to the selected account. This is the work of the `@Input()` decorator.

Now the input field and button are always visible even when no account is selected.  
To fix this we can make use of a structural directive `*ngIf` to check if an account is selected.

Change the `app-account` tag in `account-list.component.html` to:
```html
<app-account *ngIf="selectedAccount" [account]="selectedAccount"></app-account>
```

#### @Output() decorator - communicate from child to parent component
To comunicate from a child to a parent component an event needs to be emitted.
The child component exposes an EventEmitter property with which it emits events when something happens. 
The parent binds to that event property and reacts to those events.

Add an `@Output()` decorator to the account component that emits an event when the registration name of the account is changed.
   
```typescript
  @Output() nameChanged = new EventEmitter<boolean>();

  onNameChange() {
    this.account.registrationName = 'New Name';
    this.nameChangeAllowed = false;

    this.nameChanged.emit(true);
  }
```  

In the `onNameChange()` function the event is emitted and that allows the parent to respond on that event.
To do so we use event binding to count the number of name changes.

Add some logic to `account-list.component.ts` to track the number of name changes. Note the input parameter of the function needs to natch the type of the event that will be emitted. 
In this case a boolean.
 
```typescript
  nameChangeCount = 0;

  onNameChange(nameChanged: boolean) {
    if (nameChanged) {
      this.nameChangeCount++;
    }
  }
```

Change the account-list template to use event binding to respond on the `nameChanged` event that is emitted by the account component.
(`(nameChanged)="onNameChange($event)"`). 

Note: `nameChanged` is the property name of the EventEmitter that fires the event.

The complete template could look like:  
```html
<p>Names have been changed {{ nameChangeCount }} times.</p>

<ul>
  <li *ngFor="let account of accounts" (click)="onSelectAccount(account)">
    {{ account.accountNumber }} - {{ account.registrationName }}
  </li>
</ul>

<app-account *ngIf="selectedAccount" [account]="selectedAccount" (nameChanged)="onNameChange($event)"></app-account>
```


## Create an injectable service

To create an account service run `ng generate service account/account`.
Copy the array of accounts from `account-list.component.ts` to `account.service.ts` and create a function that returs the array of accounts.
The service looks like:
```typescript
   import { Injectable } from '@angular/core';
   import { Account } from './account';
   
   @Injectable({
     providedIn: 'root'
   })
   export class AccountService {
   
     accounts = [
       new Account('11111', 'First Account'),
       new Account('22222', 'Second Account'),
       new Account('33333', 'Third Account')
     ];
   
     constructor() { }
   
     getAccounts() {
       return this.accounts;
     }
   }

```

To make use of this service we now can inject the service in the account-list component.
In `account-list.component.ts` inject the service via the constructor and initialize the array of accounts in `ngOnInit`. 

```typescript
  accounts: Account[];

  constructor(private service: AccountService) { }

  ngOnInit() {
    this.accounts = this.service.getAccounts();
  }

```

## Use the HttpClient in the service
To access a REST api or JSON file we can use the HttpClient that ships with Angular.
Before we can use the HttpClient we need to add `HttpClientodule` to the `imports` section in `app.module.ts`.

We want to return a type `Observable<Account[]>` when calling `this.http.get`. As a response cannot always be automatically converted to an instance of a class, it is better to use an interface that contains the required properties.  
So lets change file `account.ts` in the `src/account` folder and transform the class to an interface.

The file could contain something like: 
```typescript
 export interface Account {
   accountNumber: string;
   registrationName: string;
   balance: number;
 }
``` 

Now we change the `AccountService` to read the accounts.
First inject the `HttpClient` in the constructor.
Function `getAccounts()` will get data from, in this case, a JSON file. Of course getting a response from an API works exactly the same.

The service should look like: 

 ```typescript
import { Injectable } from '@angular/core';
import { Account } from './account';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private readonly accountsUrl = './assets/accounts.json';

  constructor(private http: HttpClient) { }

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountsUrl);
  }
}
```

When the function `getAccounts()` is called the service returns an Observable so the account-list component needs to subscribe to the Observable.
So we need to fix the initialization of the accounts in `account-list.component.ts` and change `noOnInit()`.

```typescript
  ngOnInit() {
    this.service.getAccounts().subscribe(
      (data) => this.accounts = data
    );
  }
``` 


## Routing
Before we can navigate to different views we do need some extra components.

Run `ng generate component Home` and `ng generate component Client`to generate a new account component.


#### Routes
The AppRoutingModule (`app-routing.module.ts`) that is generated by the CLI contains the routes that can be used to navigate between views.
You can add routes to the empty routes array like:

```typescript
const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'client', component: ClientComponent},
  {path: 'account', component: AccountListComponent},
];
```

The routes can be activated by the `routerLink` directive.

Once a path is accessed the defined component needs to show up somewere. 
The `<router-outlet>` will take care of showing the right component for a path. 

In `app.component.html` we can add some navigation links and the `<router-outlet>`.

```html
<nav class="navbar navbar-expand navbar-dark bg-primary">
  <a class="navbar-brand" routerLink="/">Angular Demo</a>

  <div class="collapse navbar-collapse">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" routerLink="/">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/client">Client</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" routerLink="/account">Account</a>
      </li>
    </ul>
  </div>
</nav>

<div class="container">
  <router-outlet></router-outlet>
</div>

```
Note: the navigation bar is styled with Bootstrap. To add Bootstrap to your application see [Implement Twitter Bootstrap](#implement-twitter-bootstrap)

#### Style navigation links
When a link is clicked the right component is shown but there is no visual indicator that the link is activated.

The `routerLinkActive` directive attaches a style class to an element when the route is activated. 
In the example below the class `active` is set when the route is activated.

```html
<nav class="navbar navbar-expand navbar-dark bg-primary">
  <a class="navbar-brand" routerLink="/">Angular Demo</a>

  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item" [routerLinkActive]="'active'">
        <a class="nav-link" routerLink="/">Home</a>
      </li>
      <li class="nav-item" [routerLinkActive]="'active'">
        <a class="nav-link" routerLink="/client">Client</a>
      </li>
      <li class="nav-item" [routerLinkActive]="'active'">
        <a class="nav-link" routerLink="/account">Account</a>
      </li>
    </ul>
  </div>
</nav>
```

There is one caviat ... the Home link stays active for every route.
By adding `[routerLinkActiveOptions]="{exact: true}"` for the Home path this can be solved.

```html
      <li class="nav-item" [routerLinkActive]="'active'" [routerLinkActiveOptions]="{exact: true}">
        <a class="nav-link" routerLink="/">Home</a>
      </li>

```

Try to implement a route with parameters yourself.
Hint: have a look at the `ActivatedRoute` interface, see [Routing & Navigation (angular.io)](https://angular.io/guide/router).



## Style your application
This workshop is about Angular, not about styling ;-). However your app should look nice anyway.
You can use [Twitter Bootstrap](https://getbootstrap.com/) and/or [Angular Material](https://material.angular.io/) to polish your app.

#### Implement Twitter Bootstrap
Run `npm install bootstrap` to install the Bootstrap npm package.

Add the css to `styles` section in `angular.json`. The `styles` section should look like:
```json
            "styles": [
              "node_modules/bootstrap/dist/css/bootstrap.css",
              "src/styles.css"
            ],
``` 

This makes the Bootstrap styling available to your app. 


#### Implement Angular Material
Run `npm install @angular/material @angular/cdk` to install Angular Material.
For documentation about all available components please visit the [Angular Material website](https://material.angular.io/).

Note: some components depend on `@angular/animations`. This npm package is already installed when the project is created with the Angular CLI.
Otherwise you should install it by running `npm install @angular/animations`.

##
Have fun with your own project!

