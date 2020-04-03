# Components and Databinding

## Binding to Custom Properties

In Angular we can make custom property and bind it.For learning this concept we will take a example.
In our Example we have two components:

1. AppComponent
2. ServerelementComponent

Now we have an array of server in the app.component.ts

```typescript
serverElements = [
  {
    type: "Server",
    name: "This is test server",
    content: "This is test server content"
  }
];
```

We want pass this array to its child component which is ServerelementComponent.But directly we can not pass this array to child component becouse in angular every component have its own scope.

So the Question is how can we achive our goal?
the answer is custom property with Input decorator.let's see how can we create custom property and bind it.

First we will create a custom propery :

```typescript
```

#### serverelement.component.ts

```typescript
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-serverelement",
  templateUrl: "./serverelement.component.html",
  styleUrls: ["./serverelement.component.css"]
})
export class ServerelementComponent implements OnInit {
  @Input() element: { type: string; name: string; content: string };
  constructor() {}

  ngOnInit() {}
}
```

Now we can bind our element property to serverelement and we can get serverElements array.

#### app.component.html

```html
<app-serverelement
  *ngFor="let serverElement of serverElements"
  [element]="serverElement"
></app-serverelement>
```

In this example app-serverelement will replicate based on array elements and we will bind the serverElement value to element.

We use Input decorator for pass the value from parent component to child component.
Finaly let's see how we will get the key value pair of serverElement in our template file:

```html
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <p>
      <strong style="color: red;" *ngIf="element.type === 'Server'"
        >{{ element.content }}</strong
      >
      <em *ngIf="element.type === 'Blueprint'">{{ element.content }}</em>
    </p>
  </div>
</div>
```

## Assigning an Alias to Custom Properties

Angular provide us the power of seting alias to our custom propery.

#### serverelement.component.ts

```typescript
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-serverelement",
  templateUrl: "./serverelement.component.html",
  styleUrls: ["./serverelement.component.css"]
})
export class ServerelementComponent implements OnInit {
  @Input("svrElement") element: { type: string; name: string; content: string };
  constructor() {}

  ngOnInit() {}
}
```

#### app.component.html

```html
<app-serverelement
  *ngFor="let serverElement of serverElements"
  [svrElement]="serverElement"
></app-serverelement>
```

## Binding to Custom Events

We need custom Event binding when we need to pass data from child component to parent component.

For building custom events we need Output decorator and EventEmitter.

In this example we are sending the data from AddserverComponent to AppComponent and store the data in serverElements array.

So lets see how can we achieve our goal.

In this example we are creating two custom events first serverCreated is and second is blueprintCreated.

For making these custom event we will import EventEmitter from angular core and add EventEmitter to our custom event and pass the object type:

```typescript
serverCreated = new EventEmitter();
blueprintCreated = new EventEmitter();
```

but there is one more step to complate custom event creation and this step is add output decorator to these two custom events so that we can send data to parent or other component.

```typescript
@Output() serverCreated = new EventEmitter();
@Output() blueprintCreated = new EventEmitter()
```

In next step we need to emit these custom events in a function.

```typescript
@Output() serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output() blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>()
  newServerName = '';
  newServerContent = '';
  constructor() { }

  ngOnInit() {
  }
  onServerAdd() {
    this.serverCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    })
  }
  onBlueprintAdd() {
    this.blueprintCreated.emit({
      serverName: this.newServerName,
      serverContent: this.newServerContent
    })
  }
```

Now we have complated the creation of our custom event.Next step we will attach our functions to buttons in which we emited the custom events.

## addserver.component.html

```html
<button class="btn btn-primary" (click)="onServerAdd()">
  Add Server</button
>&nbsp;
<button class="btn btn-primary" (click)="onBlueprintAdd()">
  Add Blueprint
</button>
```

In the next step we will attach these custom events to desired component and assign function to these custom events and we will pass <b>\$event</b> object as argument.

#### app.component.html

```html
<app-addserver
  (serverCreated)="onServerCreated($event)"
  (blueprintCreated)="onblueprintAdded($event)"
></app-addserver>
```

At this state we can log our data in the functions:

#### app.component.ts

```typescript
  onServerCreated(serverData: { serverName: string, serverContent: string }) {
    console.log(serverData)
  }
  onblueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
    console.log(blueprintData)
  }

```

Now we will follow final step pushing the value to serverElements array.
Here is the code for pushing the form value to erverElements array

#### app.component.ts

```
onServerCreated(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'Server',
      name: serverData.serverName,
      content: serverData.serverContent
    })

  }
  onblueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
       type: 'Blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    })

  }
```

## Assigning an Alias to Custom Events

We can assign the alias tocustom event same as we assigned the alias to custom property.

## addserver.component.ts

```typescript
@Output("ServerC") serverCreated = new EventEmitter<{ serverName: string, serverContent: string }>();
  @Output("BlueprintC") blueprintCreated = new EventEmitter<{ serverName: string, serverContent: string }>()
```

#### app.component.html

```html
<app-addserver
  (ServerC)="onServerCreated($event)"
  (BlueprintC)="onblueprintAdded($event)"
></app-addserver>
```

## Understanding View Encapsulation

To understand ViewEncapsulation in Angular, first we should understand about Shadow DOM. You can learn in detail about Shadow DOM here. Putting it in simple words, Shadow DOM brings Encapsulation in HTML Elements. Using the Shadow DOM , markup, styles, and behaviors are scoped to the element and do not clash with other nodes of the DOM. Shadow DOM is part of Web Components, which encapsulates styles and login of element.

Angular Components are made up of three things:

1. Component class
2. Template
3. Style

Combination of these three makes an Angular component reusable across application. Theoretically, when you create a component, in some way you create a web component (Theoretically, Angular Components are not web components) to take advantage of Shadow DOM. You can also use Angular with browsers, which does not support Shadow DOM because Angular has its own emulation and it can emulate Shadow DOM.

To emulate Shadow DOM and encapsulate styles, Angular provides there types of ViewEncapsulation. They are as follows:

Emulated : No Shadow DOM, Style encapsulation,value:0
Native: Shadow DOM, Style encapsulation,value:1
None : No Shadow DOM, No Style encapsulation,value:2

#### serverelement.component.ts

```typescript
import { Component, OnInit, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: "app-serverelement",
  templateUrl: "./serverelement.component.html",
  styleUrls: ["./serverelement.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class ServerelementComponent implements OnInit {
  @Input("svrElement") element: { type: string; name: string; content: string };
  constructor() {}

  ngOnInit() {}
}
```

#### serverelement.component.css

```css
p {
  color: blue;
}
label {
  color: red;
}
```

In this code we are using ViewEncapsulation.None so when we will run this code then all label will be red.

If we will to change ViewEncapsulation.None to ViewEncapsulation.Emulated so all label will not be red.

## Using Local References in Templates

In the current examples we are using two way databinding but we have other way also for getting the value of our HTML input.

We can get value by using local reference in template and @ViewChild in this section we will see how to usen local reference in template.

Let's see how we can set local reference to our HTML input By using # we can set :

```html
<div class="form-group">
  <label for="serverName">Server Name</label>
  <input id="serverName" type="text" class="form-control" #serverNameInput />
</div>
<div class="form-group">
  <label for="serverContent">Server Content</label>
  <input
    id="serverContent"
    type="text"
    class="form-control"
    #serverContentInput
  />
</div>
```

In this code we removed the twoway databinding([(ngModel)]="newServerContent");

Now we will see how to get value of input:

#### addserver.component.html

```html
<div class="form-group">
  <label for="serverName">Server Name</label>
  <input id="serverName" type="text" class="form-control" #serverNameInput />
</div>
<div class="form-group">
  <label for="serverContent">Server Content</label>
  <input
    id="serverContent"
    type="text"
    class="form-control"
    #serverContentInput
  />
</div>
<button
  class="btn btn-primary"
  (click)="onServerAdd(serverNameInput, serverContentInput)"
>
  Add Server</button
>&nbsp;
<button
  class="btn btn-primary"
  (click)="onBlueprintAdd(serverNameInput, serverContentInput)"
>
  Add Blueprint
</button>
```

In abow code we are setting the local refrence and passing them to onServerAdd and on onBlueprintAdd as argument/parameter.

Now in typescript file we will use these parameter for accessing the input value.

```typescript
  onServerAdd(serverNameInput: HTMLInputElement, serverContentInput: HTMLInputElement) {

    this.serverCreated.emit({
      serverName: serverNameInput.value,
      serverContent: serverContentInput.value
    })
  }
  onBlueprintAdd(serverNameInput: HTMLInputElement, serverContentInput: HTMLInputElement) {
    this.blueprintCreated.emit({
      serverName: serverNameInput.value,
      serverContent: serverContentInput.value
    })

  }
```

So in typescript we can access the value of inputs by value method like abow code.

## @ViewChild() in Angular 8+

We can access value of input by @Viewchild also.

For useing @Viewchild we need to import it first from @angular/core.In this metod we will need local refrence in template file.

```typescript
@ViewChild('serverNameInput', { static: true }) serverNameInput;
@ViewChild('serverContentInput', { static: true }) serverContentInput;
```

If we will console our serverNameInput so we will find a ElementRef Object.

Now we have ElementRef but we are not able to access ElementRef so for access the ElementRef we need to import ElementRef from @angular/core and assign serverNameInput and serverContentInput to ElementRef type.

```typescript
  @ViewChild('serverNameInput', { static: true }) serverNameInput: ElementRef;
  @ViewChild('serverContentInput', { static: true }) serverContentInput: ElementRef;
```

This ElementRef have nativeElement property and this nativElement have value property so by accessing nativeElement and it's value we can access Input value.
let's see the how we are getting the value of InputElement.

#### addserver.component.html

```html
<div class="form-group">
  <label for="serverName">Server Name</label>
  <input id="serverName" type="text" class="form-control" #serverNameInput />
</div>
<div class="form-group">
  <label for="serverContent">Server Content</label>
  <input
    id="serverContent"
    type="text"
    class="form-control"
    #serverContentInput
  />
</div>
<button class="btn btn-primary" (click)="onServerAdd()">
  Add Server</button
>&nbsp;
<button class="btn btn-primary" (click)="onBlueprintAdd()">
  Add Blueprint
</button>
```

#### addserver.component.ts

```typescript
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewChild,
  ElementRef
} from "@angular/core";

@Component({
  selector: "app-addserver",
  templateUrl: "./addserver.component.html",
  styleUrls: ["./addserver.component.css"]
})
export class AddserverComponent implements OnInit {
  @Output("ServerC") serverCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  @Output("BlueprintC") blueprintCreated = new EventEmitter<{
    serverName: string;
    serverContent: string;
  }>();
  // newServerName = '';
  // newServerContent = '';
  @ViewChild("serverNameInput", { static: true }) serverNameInput: ElementRef;
  @ViewChild("serverContentInput", { static: true })
  serverContentInput: ElementRef;
  constructor() {}

  ngOnInit() {}
  onServerAdd() {
    this.serverCreated.emit({
      serverName: this.serverNameInput.nativeElement.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
  onBlueprintAdd() {
    this.blueprintCreated.emit({
      serverName: this.serverNameInput.nativeElement.value,
      serverContent: this.serverContentInput.nativeElement.value
    });
  }
}
```

## Projecting Content into Components with ng-content

Currently we have our serverElement component template like this :

#### serverelement.component.html

```html
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <p>
      <strong style="color: red;" *ngIf="element.type === 'Server'"
        >{{ element.content }}</strong
      >
      <em *ngIf="element.type === 'Blueprint'">{{ element.content }}</em>
    </p>
  </div>
</div>
```

But we need our html content in component like below:

#### app.component.html

```html
<div class="container">
  <p>Add server</p>
  <div class="row">
    <div class="col-lg-12">
      <app-addserver
        (ServerC)="onServerCreated($event)"
        (BlueprintC)="onblueprintAdded($event)"
      ></app-addserver>
      <hr />
      <app-serverelement
        *ngFor="let serverElement of serverElements"
        [svrElement]="serverElement"
      >
        <p>
          <strong style="color: red;" *ngIf="serverElement.type === 'Server'"
            >{{ serverElement.content }}</strong
          >
          <em *ngIf="serverElement.type === 'Blueprint'"
            >{{ serverElement.content }}</em
          >
        </p>
      </app-serverelement>
    </div>
  </div>
</div>
```

In this case we have removed some html content from our serverelement.component.html

#### serverelement.component.html

```html
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body"></div>
</div>
```

In this case the panel will append but we will not get data from our form becouse angular always ignore html content beetween opening and closing component tag.But we can change this behaveour with help of <ng-content> tag.

after adding <ng-content> </ng-content> we will get data like before so our updated code is here:

#### serverelement.component.html

```html
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body">
    <ng-content> </ng-content>
  </div>
</div>
```

#### app.component.html

```html
<div class="container">
  <p>Add server</p>
  <div class="row">
    <div class="col-lg-12">
      <app-addserver
        (ServerC)="onServerCreated($event)"
        (BlueprintC)="onblueprintAdded($event)"
      ></app-addserver>
      <hr />
      <app-serverelement
        *ngFor="let serverElement of serverElements"
        [svrElement]="serverElement"
      >
        <p>
          <strong style="color: red;" *ngIf="serverElement.type === 'Server'"
            >{{ serverElement.content }}</strong
          >
          <em *ngIf="serverElement.type === 'Blueprint'"
            >{{ serverElement.content }}</em
          >
        </p>
      </app-serverelement>
    </div>
  </div>
</div>
```

In this case we have removed some html content from our serverelement.component.html

#### serverelement.component.html

```html
<div class="panel panel-default">
  <div class="panel-heading">{{ element.name }}</div>
  <div class="panel-body"></div>
</div>
```

#### app.component.html

```html
<div class="container">
  <p>Add server</p>
  <div class="row">
    <div class="col-lg-12">
      <app-addserver
        (ServerC)="onServerCreated($event)"
        (BlueprintC)="onblueprintAdded($event)"
      ></app-addserver>
      <hr />
      <app-serverelement
        *ngFor="let serverElement of serverElements"
        [svrElement]="serverElement"
      >
        <p>
          <strong style="color: red;" *ngIf="serverElement.type === 'Server'"
            >{{ serverElement.content }}</strong
          >
          <em *ngIf="serverElement.type === 'Blueprint'"
            >{{ serverElement.content }}</em
          >
        </p>
      </app-serverelement>
    </div>
  </div>
</div>
```

## Understanding the Component Lifecycle

Angular have 8 Lifecyle hooks:

##### ngOnChanges()

1. Used in pretty much any component that has an input.
2. Called whenever an input value changes
3. Is called the first time before ngOnInit

##### ngOnInit()

1. Used to initialize data in a component.
2. Called after input values are set when a component is initialized.
3. Added to every component by default by the Angular CLI.
4. Called only once

##### ngDoCheck()

1. Called during all change detection runs
2. A run through the view by Angular to update/detect changes

##### ngAfterContentInit()

1. Called only once after first ngDoCheck()
2. Called after the first run through of initializing content

##### ngAfterContentChecked()

1. Called after every ngDoCheck()
2. Waits till after ngAfterContentInit() on first run through

##### ngAfterViewInit()

3. Called after Angular initializes component and child component content.
4. Called only once after view is initialized

##### ngAfterViewChecked()

1. Called after all the content is initialized and checked. (Component and child components).
2. First call is after ngAfterViewInit()
3. Called after every ngAfterContentChecked() call is completed

##### ngOnDestroy()

1. Used to clean up any necessary code when a component is removed from the DOM.
2. Fairly often used to unsubscribe from things like services.
3. Called only once just before component is removed from the DOM.

## Lifecycle Hooks and Template Access

## @ContentChild() in Angular 8+

## Getting Access to ng-content with @ContentChild
