import { Routes } from '@angular/router';

export const tripRoutes: Routes = [
    { path: 'trip/test', loadChildren: './pages/find/test/test.module#TestPageModule' }
];

