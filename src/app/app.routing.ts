import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";
import {FacultyPortfolioComponent} from "./faculty-portfolio/faculty-portfolio.component";
import {StudentPortfolioComponent} from "./student-portfolio/student-portfolio.component";
import {StudentComponent} from "./student/component/student.component";

const appRouting: Routes = [
  {
    path: 'faculties',
    component: FacultyPortfolioComponent,
    pathMatch: 'full'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'faculties'
  },
  {
    path: 'faculty/:id',
    component: StudentPortfolioComponent,
    pathMatch: 'full'
  },
  {
    path: 'student/:id',
    component: StudentComponent,
    pathMatch: 'full'
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRouting);
