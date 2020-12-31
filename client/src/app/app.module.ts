import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/sellers/login/login.component';
import { RegisterComponent } from './components/sellers/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyArticlesComponent } from './components/sellers/my-articles/my-articles.component';
import { AuthGuardGuard } from './guards/auth-guards.guard';
import {UserGuard} from "./guards/user.guard"
import { TokenService } from './services/token-interceptor.service';
import { NavComponent } from './components/nav/nav.component';
import { FormProductComponent } from './components/sellers/form-product/form-product.component';
import { AllArticlesComponent } from './components/sellers/all-articles/all-articles.component';
import { LoginUserComponent } from './components/users/login-user/login-user.component';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';
import { AllArticlesUsersComponent } from './components/users/all-articles-users/all-articles-users.component';
import { tokenUserService } from './services/token-users.service';
import { CarpreviewComponent } from './components/users/carpreview/carpreview.component';
import { RecoverPassComponent } from './components/users/recover-pass/recover-pass.component';
import { RecoverSellerComponent } from './components/sellers/recover-seller/recover-seller.component';
import { ArticleComponent } from './components/sellers/article/article.component';
import {NgxPaginationModule} from "ngx-pagination";
import { HomeComponent } from './components/home/home.component';
import { TestFormComponent } from './components/test-form/test-form.component'



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MyArticlesComponent,
    NavComponent,
    FormProductComponent,
    AllArticlesComponent,
    LoginUserComponent,
    RegisterUserComponent,
    AllArticlesUsersComponent,
    CarpreviewComponent,
    RecoverPassComponent,
    RecoverSellerComponent,
    ArticleComponent,
    HomeComponent,
    TestFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [AuthGuardGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenService, 
    multi: true
  }],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
