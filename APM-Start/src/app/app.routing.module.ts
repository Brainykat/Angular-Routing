import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
//import { Router } from '@angular/router';

//Best Alternative
export const Routes : Route[]= [
        {path: 'welcome', component: WelcomeComponent},
        {path: '', pathMatch : 'full', redirectTo: 'welcome'},
        {path:'**',component:PageNotFoundComponent}
      ]

@NgModule({
    imports:[
        RouterModule.forRoot([
            {path: 'welcome', component: WelcomeComponent},
            {path: '', pathMatch : 'full', redirectTo: 'welcome'},
            {path:'**',component:PageNotFoundComponent}
          ]) //, {enableTracing:true}
    ],
    exports:[RouterModule]
})
export class AppRoutingModule {}