import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FileMetadata } from '../../types/File';
import { manageFileApi } from '../rtk-query/file-manager';

interface FileManagerState {
  files: FileMetadata[];
}

const initialState: FileManagerState = {
  files: [],
};

const fileManagerSlice = createSlice({
  name: 'fileManager',
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<FileMetadata[]>) => {
      state.files = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(manageFileApi.endpoints.getFiles.matchFulfilled, (state, action) => {
      state.files = action.payload;
    });
  },
});

export const { setFiles } = fileManagerSlice.actions;
export default fileManagerSlice;