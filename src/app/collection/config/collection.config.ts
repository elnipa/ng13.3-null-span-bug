import { Tag } from '@modules/tags/models/tag.model';
import {
  AttributeAlignment,
  CollectionAttribute,
  CollectionAttributeType,
} from '../models/collection-attribute.model';

/**
 * predefined Collection column templates
 */
export enum CollectionColumnTemplate {
  NAME = 'NAME',
  IMAGE = 'IMAGE',
  ICON = 'ICON',
  TAGS = 'TAGS',
  COLOR = 'COLOR',
}

/**
 * templates for Collection columns
 */
export const COLLECTION_COLUMN_TEMPLATES: Record<
  CollectionColumnTemplate,
  CollectionAttribute
> = {
  // NAME
  [CollectionColumnTemplate.NAME]: {
    name: 'name',
    label: 'Name',
    sortable: true,
    filterable: true,
    type: CollectionAttributeType.TEXT,
    tooltip: (row) =>
      row.name + (row.description ? '\n -- ' + row.description + ' --' : ''),
    width: '200px',
  },

  // IMAGE
  [CollectionColumnTemplate.IMAGE]: {
    name: 'image',
    label: 'Image',
    sortable: false,
    filterable: false,
    type: CollectionAttributeType.IMAGE,
    width: '50px',
    alignment: AttributeAlignment.CENTER,
  },

  // ICON
  [CollectionColumnTemplate.ICON]: {
    name: 'icon',
    label: 'Icon',
    sortable: false,
    filterable: false,
    type: CollectionAttributeType.ICON,
    width: '30px',
  },

  // COLOR
  [CollectionColumnTemplate.COLOR]: {
    name: 'color',
    label: 'Color',
    sortable: false,
    filterable: true,
    type: CollectionAttributeType.COLOR,
    width: '30px',
  },

  // TAGS
  [CollectionColumnTemplate.TAGS]: {
    name: 'tags',
    label: 'Tags',
    sortable: false,
    filterable: true,
    type: CollectionAttributeType.TAGS,
    data: (row) => row.tags?.map((tag: Tag) => tag.name).join(', '),
    width: '200px',
  },
};
