export type TagModuleDto = {
  id?: string;
  name: string;
  color: string;
}

export type JournalListItemType = {
  id: string;
  mood: string;
  title: string;
  entryDate: Date;
  hasImages: boolean;
  tags: TagModuleDto[];
}

export type JournalListItemDto = JournalListItemType & {
  entryDate: string;
}

export type JournalNavigationData = {
  next: string | null;
  previous: string | null;
}

export type JournalEntryType = {
  id?: string;
  mood: string;
  title: string;
  entry: string;
  entryDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type JournalEntryDto = {
  id?: string;
  mood: string;
  title: string;
  entry: string;
  entryDate: string;
  createdAt: string;
  updatedAt: string;
}

export type Modules = 'images' | 'tags';

export type ImageModuleDto = {
  id: string;
  name: string;
}

export type JournalModuleDataType = {
  images?: ImageModuleDto[];
  tags?: TagModuleDto[];
}

export type SearchResult = {
  id: string;
  title: string;
  entry: string;
}

export type FetchStatus = 'NODATA' | 'ERROR' | 'SUCCESS';

export type LoadingStatus = 'loading' | 'resolved';

export type JournalEntryHook = {
  journalEntry: JournalEntryType | null;
  navigationData: JournalNavigationData | null;
  loadingStatus: LoadingStatus;
}

export type JournalModulesHook = {
  moduleData: JournalModuleDataType | null;
  loadingStatus: LoadingStatus;
}

export type SearchResultHook = {
  searchResults: SearchResult[];
  loadingStatus: LoadingStatus;
}

export type NavigableJournalEntry = {
  data: JournalEntryDto;
  navigationData: JournalNavigationData;
}
