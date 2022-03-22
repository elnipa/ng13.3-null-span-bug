import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import {
  CollectionAttribute,
  CollectionAttributeType,
  isCollectionAttributeTypeBoolean,
  isCollectionAttributeTypeDatetime,
  isCollectionAttributeTypeGroup,
  isCollectionAttributeTypeIcon,
  isCollectionAttributeTypeImage,
  isCollectionAttributeTypeSelect,
} from '../../../models/collection-attribute.model';
import { EtaTableColumnDefDirective } from '../../../directives/eta-table-column-def.directive';
import { get, isFunction } from 'lodash-es';

interface HalResource {}
interface Color {}

@Component({
  selector: 'eta-table-cell',
  templateUrl: './table-cell.component.html',
  styleUrls: ['./table-cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableCellComponent<
  T extends Record<string, unknown>,
  R extends HalResource = any
> {
  private _column?: CollectionAttribute;
  @Input()
  set column(value: CollectionAttribute | undefined) {
    this._column = value;
    this.updateValue();
  }
  get column(): CollectionAttribute | undefined {
    return this._column;
  }

  private _row?: T;
  @Input()
  set row(value: T | undefined) {
    this._row = value;
    this.updateValue();
  }
  get row(): T | undefined {
    return this._row;
  }

  @Input() customColumnDefs: EtaTableColumnDefDirective[] = [];

  /**
   * GETTERS
   */
  columnType: typeof CollectionAttributeType = CollectionAttributeType;
  tagFormat: any = {};

  /** public variables */
  value: any;
  tooltip: string | undefined;
  color: Color | undefined;

  /** public type guards */
  isTableColumnTypeIcon = isCollectionAttributeTypeIcon;
  isTableColumnTypeGroup = isCollectionAttributeTypeGroup;
  isTableColumnTypeBoolean = isCollectionAttributeTypeBoolean;
  isTableColumnTypeSelect = isCollectionAttributeTypeSelect;
  isTableColumnTypeImage = isCollectionAttributeTypeImage;
  isTableColumnTypeDatetime = isCollectionAttributeTypeDatetime;

  constructor() {}

  /**
   * calculates the cell value
   * - if `data` attribute is defined in column definition, the data callback will be used
   * - default: the column `name` will be lookup in the row object and used for value
   *
   * @param row data
   * @param column definition
   */
  updateValue(
    row: T | undefined = this.row,
    column: CollectionAttribute | undefined = this.column
  ): void {
    if (row && column) {
      this.value =
        (column.data ? column.data(row) : get(row, column.name)) ??
        column.fallback;
      this.tooltip = this.getCallbackDefault(column.tooltip, row, undefined);
      this.color = this.getCallbackDefault(column.color, row, undefined);
    }
  }

  /**
   * gets the value from callback or default value
   *
   * @param cb callback
   * @param row row
   * @param defaultValue default value
   */
  getCallbackDefault(
    cb: boolean | ((row: T) => boolean | undefined) | undefined,
    row: T,
    defaultValue: boolean | undefined
  ): boolean | undefined;
  getCallbackDefault(
    cb: string | ((row: T) => string | undefined) | undefined,
    row: T,
    defaultValue: string | undefined
  ): string | undefined;
  getCallbackDefault(
    cb:
      | string
      | boolean
      | ((row: T) => string | boolean | undefined)
      | undefined,
    row: T,
    defaultValue: string | boolean | undefined
  ): string | boolean | undefined {
    if (cb === undefined) {
      return defaultValue;
    }
    // if (typeof cb === 'function') {
    if (isFunction(cb)) {
      return (cb as (row: T) => string | boolean)(row);
    } else {
      return cb as string | boolean;
    }
  }

  /**
   * Get CustomColumnDef by name.
   * If CustomColumnDef with given name does not exists, undefined is returned
   */
  getCustomColumnDef(columnId: string): EtaTableColumnDefDirective | undefined {
    // find in own ContentChildren
    let column = this.customColumnDefs.find(
      (col) => col.columnName === columnId
    );

    return column;
  }
}
