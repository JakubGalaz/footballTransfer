import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TransferServiceService } from './transfer-service.service';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [TransferServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
