import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'angular-app';
  serverElements = [{ type: 'Server', name: 'This is test server', content: 'This is test server content' }];

  onServerCreated(serverData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'Server',
      name: serverData.serverName,
      content: serverData.serverContent
    })
    console.log(serverData)
  }
  onblueprintAdded(blueprintData: { serverName: string, serverContent: string }) {
    this.serverElements.push({
      type: 'Blueprint',
      name: blueprintData.serverName,
      content: blueprintData.serverContent
    })
    console.log(blueprintData)
  }
}
