import {Component} from "@angular/core";

@Component({
    selector: "my-app",
    template: `
    <GridLayout rows="auto *" columns="* * *">
        <Button text="scan" [nsRouterLink]="['/']"></Button>
        <Button text="arrows" col="1" [nsRouterLink]="['/arrows']" ></Button>
        <Button text="accel" col="2"></Button>
        
        <GridLayout row="1" colSpan="3">        
          <router-outlet></router-outlet>
        </GridLayout>
    </GridLayout>`,
})
export class AppComponent {
    public counter: number = 16;

    public get message(): string {
        if (this.counter > 0) {
            return this.counter + " taps left";
        } else {
            return "Hoorraaay! \nYou are ready to start building!";
        }
    }
    
    public onTap() {
        this.counter--;
    }
}
