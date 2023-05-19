import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; // Routing Capabilities
import { DetailsPageComponent } from './details-page/details-page.component';
import { HomeComponent } from './home/home.component'

const routes: Routes = [  //routes here
  { path: 'home', component: HomeComponent },
  { path: 'details/:id', component: DetailsPageComponent },

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes) //This line initializes the route and start the listeneing action for browser location changes
  ],
  exports: [
    RouterModule  //Exports RouterModule to be availible throughout the whole application
    ]
})
export class AppRoutingModule { }
