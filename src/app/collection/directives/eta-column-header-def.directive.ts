import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
  selector: '[etaColumnHeaderDef]',
})
export class EtaColumnHeaderDefDirective {
  /**
   * Specify the column via `forColumnHeaderName 'NAME-OF-THE-COLUMN'`.
   */
  @Input('etaColumnHeaderDefForColumnHeaderName')
  columnHeaderName?: string;

  context?: EtaColumnHeaderContext;

  constructor(public templateRef: TemplateRef<EtaColumnHeaderContext>) {}
}

/**
 * Context for the EtaColumnHeaderDefDirective
 */
export interface EtaColumnHeaderContext {
  $implicit: any;
}
