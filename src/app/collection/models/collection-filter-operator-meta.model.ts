import { CollectionAttributeType } from './collection-attribute.model';
import { CollectionFilterOperator } from './collection-filter.model';

/**
 * table filter operator
 */
export interface CollectionFilterOperatorMeta {
  label: string;
  value: CollectionFilterOperator;
  attributeTypes?: CollectionAttributeType[];
}
