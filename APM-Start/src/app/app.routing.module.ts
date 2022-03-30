import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
//import { Router } from '@angular/router';

@NgModule({
    imports:[
        RouterModule.forRoot([
            {path: 'welcome', component: WelcomeComponent},
            {path: '', pathMatch : 'full', redirectTo: 'welcome'},
            {path:'**',component:PageNotFoundComponent}
          ])
    ],
    exports:[RouterModule]
})
export class AppRoutingModule {}