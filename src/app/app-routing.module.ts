import { EtaCollectionModule } from './collection/collection.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), EtaCollectionModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
