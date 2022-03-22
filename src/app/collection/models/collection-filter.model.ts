/**
 * option for a filtering data in a table
 */
export interface CollectionFilter {
  attribute: string;
  operator?: CollectionFilterOperator;
  value?: string | number | boolean | Date;
}

/**
 * enum for available table filter operators
 */
export enum CollectionFilterOperator {
  EQUAL = 'EQUAL',
  NOT_EQUAL = 'NOT_EQUAL',
  LESS_EQUAL = 'LESS_EQUAL',
  LESS = 'LESS',
  GREATER_EQUAL = 'GREATER_EQUAL',
  GREATER = 'GREATER',
  CONTAIN = 'CONTAIN',
  NOT_CONTAIN = 'NOT_CONTAIN',
  START = 'START',
  NOT_START = 'NOT_START',
  END = 'END',
  NOT_END = 'NOT_END',
  IN = 'IN',
  NOT_IN = 'NOT_IN',
}
