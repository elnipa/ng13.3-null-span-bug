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
    // this.updateValue();
  }
  get column(): CollectionAttribute | undefined {
    return this._column;
  }

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
}
