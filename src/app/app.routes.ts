import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PartnersComponent } from './features/partners/partners.component';
import { ReportGenerateComponent } from './features/report-generate/report-generate.component';
import { TeamComponent } from './features/team/team.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';
import { ConfigComponent } from './features/config/config.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'parceiros', component: PartnersComponent },
      { path: 'relatorio', component: ReportGenerateComponent },
      { path: 'time', component: TeamComponent },
      { path: 'configuracoes', component: ConfigComponent },
      { path: 'sair', redirectTo: '', pathMatch: 'full' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];