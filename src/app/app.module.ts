import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material';
import { MatListModule} from '@angular/material/list';
import { MatGridListModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
// import { MatDialogRef } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'
import { MatCheckboxModule } from '@angular/material';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatSliderModule} from '@angular/material/slider';
import { HttpClientModule } from '@angular/common/http';


import 'hammerjs';


import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { DishdetailComponent } from './dishdetail/dishdetail.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


import { DishService } from './services/dish.service';
import { PromotionService } from './services/Promotion.service';
import { LeaderService } from './services/leader.service';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { baseURL } from './shared/baseURL';
import { RestangularModule, Restangular } from 'ngx-restangular';
import { RestangularConfigFactory } from './shared/restConfig';
import { HighlightDirective } from './directives/highlight.directive';





@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    DishdetailComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective
  ],
  imports: [
    BrowserModule,

    FormsModule,

    

    MatToolbarModule,

    FlexLayoutModule,

    MatListModule,

    MatGridListModule,

    MatCardModule,

    MatButtonModule,

    AppRoutingModule,

    MatDialogModule,

    BrowserAnimationsModule,

    MatFormFieldModule,

    MatCheckboxModule,

    MatInputModule,

    MatSelectModule,

    MatSlideToggleModule,

    ReactiveFormsModule,

    MatProgressSpinnerModule,

    MatSliderModule,

    HttpClientModule,

    RestangularModule.forRoot(RestangularConfigFactory)

    // MatDialogRef
    
  ],
  providers: [ DishService ,
  PromotionService,
LeaderService,
{provide: 'baseURL', useValue: baseURL}],
entryComponents: [
  LoginComponent
],
  bootstrap: [AppComponent]
})
export class AppModule { }
