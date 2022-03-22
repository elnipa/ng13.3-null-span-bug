import { Color } from '@core/models/color/color.type';

export type CollectionAttribute<T = any> =
  | CollectionAttributeBase<T>
  | CollectionAttributeBoolean<T>
  | CollectionAttributeDatetime<T>
  | CollectionAttributeGroup<T>
  | CollectionAttributeIcon<T>
  | CollectionAttributeImage<T>
  | CollectionAttributeSelect<T>;

/**
 * Definition of a column to display.
 */
export interface CollectionAttributeBase<T = any> {
  /** unique name (id) for table column */
  name: string;

  /** the shown column label. If not set name in uppercase will be used as label */
  label?: string;

  /** show a tooltip if user hovers the colum header */
  headerTooltip?: string;

  /** can the table be sorted by this column. If not set it is sortable */
  sortable?: boolean;

  /**
   * is the node currently shown in the table,
   * the user can change this prop via the 'shown columns' menu.
   * If not set it is true.
   */
  show?: boolean;

  /**
   * define column types for automatic rendering of data depending on type
   *
   * @default: TEXT
   */
  type?: CollectionAttributeType;

  /**
   * can the user change the visibility of this column via the 'shown columns' menu.
   * If not set it is true.
   */
  visibilityChangeable?: boolean;

  /**
   * how the contend of a table cell is aligned. @default LEFT.
   */
  alignment?: AttributeAlignment;

  /**
   * Can the table be grouped by this column. @default true.
   */
  groupable?: boolean;

  /** can the column be filtered @default true */
  filterable?: boolean;

  /** data lambda function to select which data are used in column (for showing, filtering, ...)
   *
   * @default undefined (column name will be used to show data: row[name])
   */
  data?: (row: T) => any;

  /** if a fallback is provided, the fallback is used if the `data` value is null or undefined */
  fallback?: any | undefined;

  /**
   * Can show a tooltip on hover. It can parse format like {{column}} if rowData.column exists.
   */
  tooltip?: string | ((row: T) => string | undefined);

  /**
   * determines if a string is automatically truncated after xx chars
   */
  truncate?: number;

  /** the color of the column content - default `currentColor` */
  color?:
    | Color
    | 'currentColor'
    | ((row: T) => Color | 'currentColor' | undefined);

  /**
   * Width of this column, sets value of css width prop. Can be 'XX%' or 'XXpx'.
   * NOTE: Mixing absolute(px) and relative(%) width in one table can cause problems when grouping is enabled.
   *       While grouping the absolute columns could be pushed to the right due to the added indent at the left.
   */
  width?: string;

  /**
   * indicates if a column is hovered
   */
  hover?: boolean;

  //	RouterLink definition for internal navigation.
  routerLink?: (row: T) => string | any[] | null | undefined;
}

export interface CollectionAttributeIcon<T = any>
  extends CollectionAttributeBase<T> {
  type: CollectionAttributeType.ICON;

  /** whether the icon should be in circle style */
  circle?: boolean;
}

export interface CollectionAttributeImage<T = any>
  extends CollectionAttributeBase<T> {
  type: CollectionAttributeType.IMAGE;

  isImageFile: boolean; // is image uploaded as File
}

export interface CollectionAttributeBoolean<T = any>
  extends CollectionAttributeBase<T> {
  type: CollectionAttributeType.BOOLEAN;
  icon?: (row: T) => string | undefined;
}

/** special table column type for grouping multiple attributes (sub columns) in one column */
export interface CollectionAttributeGroup<T = any>
  extends CollectionAttributeBase<T> {
  type: CollectionAttributeType.GROUP;
  attributes: CollectionAttribute[];
}

/** special attribute type for datetime */
export interface CollectionAttributeDatetime<T = any>
  extends CollectionAttributeBase<T> {
  type: CollectionAttributeType.DATETIME;
  datetimeAgo?: boolean;
}

/** special table column for selection options (enums) */
export interface CollectionAttributeSelect<T = any>
  extends CollectionAttributeBase<T> {
  type: CollectionAttributeType.SELECT;
  options: Record<string, CollectionAttributeSelectOption>;
  /** @default true */
  showIcon?: boolean;
  /** @default true */
  showValue?: boolean;
}

export interface CollectionAttributeSelectOption {
  icon?: string;
  image?: string;
  color?: Color;
  label: string;
}

/**
 * How the contend of a table cell is aligned.
 */
export enum AttributeAlignment {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  CENTER = 'CENTER',
}

/**
 * column types
 *
 * @default: TEXT
 */
export enum CollectionAttributeType {
  TEXT = 'TEXT',
  BOOLEAN = 'BOOLEAN',
  COLOR = 'COLOR',
  ICON = 'ICON',
  TAGS = 'TAGS',
  IMAGE = 'IMAGE',
  DATETIME = 'DATETIME',
  NUMBER = 'NUMBER',
  RESOURCE = 'RESOURCE',
  GROUP = 'GROUP',
  SELECT = 'SELECT',

  HEADER = 'HEADER',
  SUBHEADER = 'SUBHEADER',
  DESCRIPTION = 'DESCRIPTION',
  THUMBNAIL = 'THUMBNAIL',
  AUTHOR = 'AUTHOR',
  DATE = 'DATE',
  BADGE = 'BADGE',
  ACCESS = 'ACCESS',
}

/**
 * Layout of the eta table
 */
export enum TableLayout {
  AUTO = 'auto',
  FIXED = 'fixed',
}

/**
 * Models a Group header row in the table.
 */
export interface CollectionGroupRow {
  isGroup: boolean;
  expanded: boolean;
  _parentGroup?: CollectionGroupRow;
  attributeTitle: string;
  attributeKey: string;
  groupValue: string;
  elementCount: number;
}

/**
 * TYPE GUARDS
 */
export function isCollectionAttributeTypeIcon(
  tc?: CollectionAttribute,
): tc is CollectionAttributeIcon {
  return tc?.type === CollectionAttributeType.ICON;
}

export function isCollectionAttributeTypeImage(
  tc?: CollectionAttribute,
): tc is CollectionAttributeImage {
  return tc?.type === CollectionAttributeType.IMAGE;
}

export function isCollectionAttributeTypeGroup(
  tc?: CollectionAttribute,
): tc is CollectionAttributeGroup {
  return tc?.type === CollectionAttributeType.GROUP;
}
export function isCollectionAttributeTypeBoolean(
  tc?: CollectionAttribute,
): tc is CollectionAttributeBoolean {
  return tc?.type === CollectionAttributeType.BOOLEAN;
}
export function isCollectionAttributeTypeSelect(
  tc?: CollectionAttribute,
): tc is CollectionAttributeSelect {
  return tc?.type === CollectionAttributeType.SELECT;
}
export function isCollectionAttributeTypeDatetime(
  tc?: CollectionAttribute,
): tc is CollectionAttributeDatetime {
  return tc?.type === CollectionAttributeType.DATETIME;
}
