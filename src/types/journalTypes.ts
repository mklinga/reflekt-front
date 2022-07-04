import type { LoadingStatus } from './types';

export type TagType = {
  id?: string;
  name: string;
  color: string;
};

export type JournalNavigationData = {
  next: string | null;
  previous: string | null;
}

export type ImageType = {
  id: string;
  name: string;
}

export type JournalEntryType = {
  id?: string;
  mood: string;
  title: string;
  entry: string;
  entryDate: string;
  createdAt: string;
  updatedAt: string;
  tags: TagType[];
  images: ImageType[];
}

export type SearchResult = {
  id: string;
  title: string;
  entry: string;
}

export type JournalEntryHook = {
  journalEntry: JournalEntryType | null;
  navigationData: JournalNavigationData | null;
  loadingStatus: LoadingStatus;
}

export type SearchResultHook = {
  searchResults: SearchResult[];
  loadingStatus: LoadingStatus;
}

export type NavigableJournalEntry = {
  data: JournalEntryType;
  navigationData: JournalNavigationData;
}
