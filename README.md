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

So lets see how can we achive our goal.

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
