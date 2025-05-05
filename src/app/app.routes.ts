// src/app/app.routes.ts
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { SignupComponent } from './features/auth/signup/signup.component';
import { ForgotPasswordComponent } from './features/auth/forgot-password/forgot-password.component';
import { DashboardComponent } from './features/dashboard/dashboard.component'; // ✅ Add this
import { AuthGuard } from './core/guards/auth.guard'; // ✅ Add this
import { HoldingsComponent } from './features/holdings-page/holdings/holdings.component';
import { TransactionsComponent } from './features/transactions-page/transactions/transactions.component';
import { RecenttransactionsComponent } from './features/transactions-page/recenttransactions/recenttransactions.component';
import { AddInvestmentComponent } from './features/holdings-page/add-investment/add-investment.component';
import { FooterComponent } from './shared/footer/footer.component'; // ✅ Add this
import { HeaderComponent } from './shared/header/header.component'; // ✅ Add this
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  { path: 'holdings', component: HoldingsComponent },
   {
     path: 'transactions',
     component: TransactionsComponent,
    canActivate: [AuthGuard],
   },
  {
    path: 'recenttransactions',
    component: RecenttransactionsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-investment',
    component: AddInvestmentComponent,
    canActivate: [AuthGuard],
  },
];
