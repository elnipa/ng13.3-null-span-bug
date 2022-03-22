import { SelectionModel } from '@angular/cdk/collections';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectorRef,
  Component,
  ContentChildren,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
// import { HalResource } from '@core/hal/models/hal-resource.model';
import {
  AttributeAlignment,
  CollectionAttribute,
  CollectionGroupRow,
  TableLayout,
} from '../../models/collection-attribute.model';
import {
  CollectionSettings,
  COLLECTION_SETTINGS_DEFAULT,
} from '../../models/collection-settings.model';
// import { MenuItem } from '@shared/menu/models/menu-item.model';
import { EtaColumnHeaderDefDirective } from '../../directives/eta-column-header-def.directive';
import { EtaTableColumnDefDirective } from '../../directives/eta-table-column-def.directive';
import { Observable, Subject } from 'rxjs';
import { CollectionAttributeType } from '../../models/collection-attribute.model';
import { CollectionContextMenuComponent } from '../collection-context-menu/collection-context-menu.component';

interface HalResource {}
interface MenuItem {}

// TODO: rename the selector
@Component({
  selector: 'eta-table2',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<
  T extends Record<string, any>,
  R extends HalResource = any
> implements OnInit, OnDestroy
{
  /** context menu */
  @ViewChild('collectionContextMenu')
  collectionContextMenu!: CollectionContextMenuComponent<T>;

  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  /**
   * define the columns to show.
   * The order is respected.
   *
   * @see TableColumn
   */
  @Input()
  set columns(columns: CollectionAttribute[]) {
    this._columns = columns;

    if (this.init) {
      this.deployTableSettings();
    }
  }
  get columns(): CollectionAttribute[] {
    return this._columns;
  }

  /**
   * The table data to show.
   */
  @Input() data: T[] = [];

  @Input()
  get menuItems(): MenuItem[] | Record<string, MenuItem> | undefined {
    return this._menuItems;
  }
  set menuItems(menuItems: MenuItem[] | Record<string, MenuItem> | undefined) {
    this._menuItems = menuItems;

    if (this.init) {
      this.deployTableSettings();
    }
  }

  @Input() contextMenuItems?: MenuItem[] | Record<string, MenuItem>;

  /** user settings */
  // make sure to get a copy, otherwise userSettings will be shared among tables
  @Input()
  set tableSettings(tableSettings: CollectionSettings) {
    this._tableSettings = { ...COLLECTION_SETTINGS_DEFAULT, ...tableSettings };

    if (this.init) {
      this.deployTableSettings();
    }
  }
  get tableSettings(): CollectionSettings {
    return this._tableSettings;
  }

  /** custom column definitions via `etaTableColumnDef` directive or via Input */
  get customColumnDefs(): EtaTableColumnDefDirective[] {
    return this._customColumnDefs;
  }
  private _customColumnDefs: EtaTableColumnDefDirective[] = [];
  @Input()
  set customColumnDefs(value: EtaTableColumnDefDirective[]) {
    this._customColumnDefs = value;
  }
  @ContentChildren(EtaTableColumnDefDirective)
  set viewCustomColumnDefs(value: EtaTableColumnDefDirective[]) {
    if (!this._customColumnDefs && value) {
      this._customColumnDefs = value;
    }
  }

  /** custom column header definitions via `etaColumnHeaderDef` directive or via Input */
  get customColumnHeaderDefs(): EtaColumnHeaderDefDirective[] {
    return this._customColumnHeaderDefs;
  }
  private _customColumnHeaderDefs: EtaColumnHeaderDefDirective[] = [];
  @Input()
  set customColumnHeaderDefs(value: EtaColumnHeaderDefDirective[]) {
    this._customColumnHeaderDefs = value;
  }
  @ContentChildren(EtaColumnHeaderDefDirective)
  set viewCustomColumnHeaderDefs(value: EtaColumnHeaderDefDirective[]) {
    if (!this._customColumnHeaderDefs && value) {
      this._customColumnHeaderDefs = value;
    }
  }

  /**
   * OPTIONS INPUTS
   */

  /** layout of the eta table, default fixed to make columns align left and width/max-width attributes take effect */
  @Input() tableLayout: TableLayout = TableLayout.FIXED;

  /** is height changeable - if false no scrollbar will be available */
  @Input() heightChangeable = true;

  /** Allows column to be dragged */
  @Input() columnsDraggable = false;

  /** Whether to allow multiple rows per data object. set it to `true` - when you want the row to expand and show additional data in the expanded panel */
  @Input() expandRow = false;

  /** selection model for batch actions */
  @Input() selection: SelectionModel<T | CollectionGroupRow> =
    new SelectionModel<T | CollectionGroupRow>(true, []);

  /**
   * The row is emitted when the user clicked on it.
   */
  @Output()
  rowClick: Observable<T>;

  /**
   * GETTERS
   */
  attributeType: typeof CollectionAttributeType = CollectionAttributeType;

  attributeAlignment: typeof AttributeAlignment = AttributeAlignment;

  /**
   * rowClick
   */
  rowClick$: Subject<T> = new Subject<T>();
  rowClickCallback: undefined | ((row: T) => void);

  /**
   * INTERNAL VARS
   */
  destroy$: Subject<boolean> = new Subject<boolean>();

  private _menuItems?: MenuItem[] | Record<string, MenuItem>;
  private _tableSettings: CollectionSettings = {
    ...COLLECTION_SETTINGS_DEFAULT,
  };
  private _columns: CollectionAttribute[] = [];

  private init: boolean = false;

  // TODO
  /** _data after grouping, equals data if there is no grouping. */
  private groupedTreeData: (T | CollectionGroupRow)[] = [];

  constructor(private cdr: ChangeDetectorRef) {
    this.rowClick = this.rowClick$.asObservable();
  }

  /**
   * Init
   */
  ngOnInit(): void {
    this.deployTableSettings();
    this.init = true;
  }

  /**
   * unsubscribe observables on destroy
   */
  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  /**
   * deploys user settings
   */
  deployTableSettings(): void {
    this.updateColumnsToDisplay();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected: number = this.selection.selected.length;
    // const numRows: number = this.dataSource.renderData.length;
    // return numSelected === numRows;
    return !!numSelected; // TODO: incorrect
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      // this.dataSource.renderData.forEach((row) => this.selection.select(row)); // TODO:
    }
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: T): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row`;
  }

  /**
   * define whats happening on row click
   */
  onRowClick(row: T): void {
    if (typeof this.rowClickCallback === 'function') {
      this.rowClickCallback(row);
    }
    this.rowClick$.next(row);
  }

  /**
   * check if the row is clickable
   */
  isRowClickable(row: T): boolean {
    return this.rowClick$.observers.length > 0 || this.rowClickCallback != null;
  }

  /**
   * updates the columns to display from columns and table settings
   */
  updateColumnsToDisplay(): void {
    this.tableSettings.attributesToDisplay = this.columns
      .filter((column) => column.show !== false)
      .map((column) => column.name);

    // select column for batch actions
    if (this.tableSettings.batchMode) {
      (this.tableSettings.attributesToDisplay ?? []).unshift('select');
    }
    // action column
    if (this.menuItems) {
      (this.tableSettings.attributesToDisplay ?? []).push('actions');
    }

    // update table
    this.cdr.markForCheck();
  }

  /**
   * Handle right click of a Node and
   * open the context menu at click position.
   */
  onContextMenu(event: MouseEvent, data: T): void {
    event.preventDefault();
    event.stopPropagation();
    this.collectionContextMenu.open(data, event.clientX, event.clientY);
  }
  /**
   * Get is column sortable.
   *
   * @default false
   */
  getColumnSortable(column: CollectionAttribute): boolean {
    return column.sortable !== undefined ? column.sortable : false;
  }

  /**
   * called when table settings are changed
   */
  onTableSettingsChange(): void {}

  /** Handles dropping element after drag for data model updating */
  changeColumnOrder(event: CdkDragDrop<CollectionAttribute[]>): void {
    moveItemInArray(this.columns, event.previousIndex, event.currentIndex);
    this.columns = [...this.columns];
  }
}
