import { CollectionFilter } from './collection-filter.model';

/**
 * interface for action configuration of eta table
 */
export interface CollectionSettings {
  groupByAttributes?: string[]; // if defined the groups will be auto set by available values in the columns
  groups?: CollectionGroup[];
  filters?: CollectionFilter[];
  filtersActive?: boolean;
  batchMode?: boolean;
  attributesToDisplay?: string[];
  pageSize?: number;
  pageIndex?: number;
  height?: string;
  title?: string;
  attributesOrderChangeable?: boolean;
}

/**
 * option for a data group in a table
 */
export interface CollectionGroup {
  label: string;
  filter?: CollectionFilter;
  residual?: boolean; // if set the group will contain the residual rows (which are not part of custom groups)
}

/**
 * default table user settings
 */
export const COLLECTION_SETTINGS_DEFAULT: CollectionSettings = {
  groupByAttributes: [],
  batchMode: false,
  pageSize: 25,
  pageIndex: 0,
  attributesOrderChangeable: true,
  height: 'unset', // 'auto'
};
