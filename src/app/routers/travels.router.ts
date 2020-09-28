import { Routes } from '@angular/router';

export const travelsRoutes: Routes = [
    { path: 'travels/form', loadChildren: './pages/travels/form/form.module#FormPageModule' }
];

