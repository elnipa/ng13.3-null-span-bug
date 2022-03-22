import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * Define custom cell for a column of eta-table.
 * A element with the directive 'etaTableColumnDef' has to be defined inside 'eta-table'.
 * This will overwrite the default cell rendering for the specified column.
 * Usage:
 * ```html
 * <ng-container *etaTableColumnDef="let rowData; forColumnName: 'NAME-OF-THE-COLUMN'">
 *   Cell value: {{rowData['NAME-OF-THE-COLUMN']}}
 * </ng-container>
 * ```
 */
@Directive({
  selector: '[etaTableColumnDef]',
})
export class EtaTableColumnDefDirective {
  /**
   * Specify the column via `forColumnName 'NAME-OF-THE-COLUMN'`.
   */
  @Input('etaTableColumnDefForColumnName')
  columnName?: string;

  context?: EtaTableColumnContext;

  constructor(public templateRef: TemplateRef<EtaTableColumnContext>) {}
}

/**
 * Context for the EtaTableColumnDefDirective
 */
export interface EtaTableColumnContext {
  $implicit: any;
}
