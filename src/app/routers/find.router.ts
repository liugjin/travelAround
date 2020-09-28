import { Routes } from '@angular/router';

export const findRoutes: Routes = [
    {path: 'find/test', loadChildren: './pages/find/test/test.module#TestPageModule'},
    {path: 'find/test2/:id', loadChildren: './pages/find/test2/test2.module#Test2PageModule'}
];

