/* eslint-disable import/prefer-default-export */

import { TagModuleDto } from '../types/types';
import { postJsonData } from '../utils/fetch';

export async function saveNewTag(name: string, color: string) {
  const postUrl = '/api/tags/';
  return postJsonData<TagModuleDto>(postUrl, { name, color });
}
