import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { FilterPipe } from './filter.pipe';
import { AppComponent } from './app.component';
import { ClassifyComponent } from './classify/classify.component';
import { Home_DirectoryComponent } from './home_directory/home_directory.component';



@NgModule({
  declarations: [
    AppComponent,
    ClassifyComponent,
    FilterPipe,
    Home_DirectoryComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      {path: 'home', component: Home_DirectoryComponent},
      { path: 'classify', component: ClassifyComponent},
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
