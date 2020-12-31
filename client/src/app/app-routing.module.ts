import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/sellers/register/register.component';
import { LoginComponent } from './components/sellers/login/login.component';
import { MyArticlesComponent } from './components/sellers/my-articles/my-articles.component';
import { AuthGuardGuard } from './guards/auth-guards.guard';
import { FormProductComponent } from './components/sellers/form-product/form-product.component';
import { AllArticlesComponent } from './components/sellers/all-articles/all-articles.component';
import { LoginUserComponent } from './components/users/login-user/login-user.component';
import { RegisterUserComponent } from './components/users/register-user/register-user.component';
import { AllArticlesUsersComponent } from './components/users/all-articles-users/all-articles-users.component';
import { CarpreviewComponent } from './components/users/carpreview/carpreview.component';
import { RecoverPassComponent } from './components/users/recover-pass/recover-pass.component';
import { RecoverSellerComponent } from './components/sellers/recover-seller/recover-seller.component';
import { ArticleComponent } from './components/sellers/article/article.component';
import { HomeComponent } from './components/home/home.component';
import { TestFormComponent } from './components/test-form/test-form.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'registerSellers', component: TestFormComponent},
  {path: "myPosts", component: MyArticlesComponent, canActivate: [AuthGuardGuard]},
  {path: 'loginSeller', component: LoginComponent},
  {path: 'saveArticle', component: FormProductComponent, canActivate: [AuthGuardGuard]},
  {path: 'allArticles', component: AllArticlesComponent, canActivate: [AuthGuardGuard]},
  {path: 'loginUser', component: LoginUserComponent},
  {path: 'registerUser', component: RegisterUserComponent},
  {path: "All", component: AllArticlesUsersComponent, canActivate: [AuthGuardGuard]},
  {path: "myCar", component: CarpreviewComponent, canActivate: [AuthGuardGuard]},
  {path: "recoverPass", component: RecoverPassComponent},
  {path: "recoverSeller", component: RecoverSellerComponent},
  {path: "article/:id", component: ArticleComponent, canActivate: [AuthGuardGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
