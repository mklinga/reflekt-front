/* eslint-disable import/prefer-default-export */

import { TagType } from '../types/journalTypes';
import { postJsonData } from '../utils/fetch';

export async function saveNewTag(name: string, color: string) {
  const postUrl = '/api/tags/';
  return postJsonData<TagType>(postUrl, { name, color });
}
