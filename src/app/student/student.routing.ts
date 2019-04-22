import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {StudentComponent} from "./component/student.component";

const studentRoutes: Routes = [
  {path: '', component: StudentComponent}
];


export const routing: ModuleWithProviders = RouterModule.forChild(studentRoutes);
