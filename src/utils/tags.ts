import { TagModuleDto } from '../types/types';

export function sortByColorAndName(tags: TagModuleDto[]): TagModuleDto[] {
  return [].concat(tags).sort((a, b) => {
    if (a.color.toLowerCase() === b.color.toLowerCase()) {
      return a.name.localeCompare(b.name);
    }
    return a.color.toLowerCase().localeCompare(b.color.toLowerCase());
  });
}
