export type JournalListItemType = {
  id: string;
  mood: string;
  title: string;
  entryDate: Date;
}

export type JournalListItemDto = JournalListItemType & {
  entryDate: string;
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

export type Modules = 'images';

export type JournalModuleDataType = {
  [M in Modules]?: string[];
}

export type FetchStatus = 'NODATA' | 'ERROR' | 'SUCCESS';

export type LoadingStatus = 'loading' | 'resolved';

export type JournalEntryHook = {
  journalEntry: JournalEntryType | null;
  loadingStatus: LoadingStatus;
}

export type JournalModulesHook = {
  moduleData: JournalModuleDataType | null;
  loadingStatus: LoadingStatus;
}
