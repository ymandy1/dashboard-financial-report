import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { PartnersComponent } from './features/partners/partners.component';
import { ReportGenerateComponent } from './features/report-generate/report-generate.component';
import { TeamComponent } from './features/team/team.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';
import { GeradorRelatorioComponent } from './gerador-relatorio/gerador-relatorio.component';
import { ConfigComponent } from './features/config/config.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: 'parceiros', component: PartnersComponent, canActivate: [AuthGuard] },
      { path: 'relatorio', component: ReportGenerateComponent, canActivate: [AuthGuard] },
      { path: 'time', component: TeamComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'gerar-relatorio', component: GeradorRelatorioComponent, canActivate: [AuthGuard] },
      { path: 'configuracoes', component: ConfigComponent, canActivate: [AuthGuard] },
      { path: 'sair', redirectTo: '', pathMatch: 'full', canActivate: [AuthGuard] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];