import {RouterModule, Routes} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

const appRouting: Routes = [
  {
    path: 'student',
    loadChildren: './student/student.module#StudentModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'student'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRouting);
