import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TabsPage } from './pages/tabs/tabs.page';
import { FindPage } from './pages/find/find.page';
import { findRoutes } from './routers/find.router';
import { TravelsPage } from './pages/travels/travels.page';
import { travelsRoutes } from './routers/travels.router';
import { MinePage } from './pages/mine/mine.page';
import { mineRoutes } from './routers/mine.router';
import { TripPage } from './pages/trip/trip.page';
import { tripRoutes } from './routers/trip.router';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      { path: 'find', component: FindPage },
      ...findRoutes,
      { path: 'travels', component: TravelsPage },
      ...travelsRoutes,
      { path: 'trip', component: TripPage },
      ...tripRoutes,
      { path: 'mine', component: MinePage },
      ...mineRoutes
    ]
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './pages/login/register/register.module#RegisterPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
