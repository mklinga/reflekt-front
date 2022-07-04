import { TagType } from '../types/journalTypes';

export function sortByColorAndName(tags: TagType[]): TagType[] {
  return [].concat(tags).sort((a, b) => {
    if (a.color.toLowerCase() === b.color.toLowerCase()) {
      return a.name.localeCompare(b.name);
    }
    return a.color.toLowerCase().localeCompare(b.color.toLowerCase());
  });
}
