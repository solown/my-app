import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'
import { NpnSliderModule } from "npn-slider";
import { appRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HelpComponent } from './help/help.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    ContactComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    appRoutingModule,
    FormsModule,
    NpnSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
