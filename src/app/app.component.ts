import { Component, ViewEncapsulation, ViewContainerRef } from "@angular/core";
@Component({
  selector: "app",
  encapsulation: ViewEncapsulation.None,
  template: `
    <main>
      <div class="additional-bg"></div>
      <router-outlet></router-outlet>
    </main>
    `
})
export class AppComponent { }
