import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { HalResource } from '@core/hal/models/hal-resource.model';
import {
  AttributeAlignment,
  CollectionAttribute,
} from '@shared/collection/models/collection-attribute.model';
import {
  CollectionSettings,
  COLLECTION_SETTINGS_DEFAULT,
} from '@shared/collection/models/collection-settings.model';
import { EtaColumnHeaderDefDirective } from '@shared/table/directives/eta-column-header-def.directive';
import { EtaTableDataSource } from '@shared/table/eta-table-data-source';

@Component({
  selector: 'eta-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeaderComponent<
  T extends Record<string, unknown>,
  R extends HalResource = any,
> {
  @Input()
  tableSettings: CollectionSettings = COLLECTION_SETTINGS_DEFAULT;
  @Output()
  tableSettingsChange: EventEmitter<CollectionSettings> = new EventEmitter<CollectionSettings>();

  @Input() column?: CollectionAttribute;
  @Input() customColumnHeaderDefs: EtaColumnHeaderDefDirective[] = [];

  @Input()
  dataSource?: EtaTableDataSource<T, R>;

  /**
   * GETTERS
   */
  columnAlignment: typeof AttributeAlignment = AttributeAlignment;

  constructor() {}

  /**
   * Get CustomColumnHeaderDef by name.
   * If CustomColumnHeaderDef with given name does not exists, undefined is returned
   */
  getCustomColumnHeaderDefByName(
    columnHeaderId: string,
  ): EtaColumnHeaderDefDirective | undefined {
    const column = this.customColumnHeaderDefs.find(
      (col) => col.columnHeaderName === columnHeaderId,
    );
    return column;
  }
}
