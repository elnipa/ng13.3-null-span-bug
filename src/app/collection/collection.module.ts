import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TableCellComponent } from './components/table/cell/table-cell.component';
import { TableHeaderComponent } from './components/table/header/table-header.component';
import { TableComponent } from './components/table/table.component';
import { EtaColumnHeaderDefDirective } from './directives/eta-column-header-def.directive';
import { EtaTableColumnDefDirective } from './directives/eta-table-column-def.directive';

@NgModule({
  declarations: [
    TableComponent,
    TableHeaderComponent,
    TableCellComponent,

    EtaColumnHeaderDefDirective,
    EtaTableColumnDefDirective,
  ],

  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    // MATERIAL
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatBadgeModule,
    MatInputModule,
    MatButtonToggleModule,
    MatMenuModule,
    MatCheckboxModule,
    DragDropModule,
    MatRadioModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    MatListModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatIconModule,

    // import for table
    MatTableModule,
    MatSortModule,
  ],
  exports: [],
})
export class EtaCollectionModule {}
