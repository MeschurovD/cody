import { createSelector } from 'reselect';
import { RootState } from '../../../../reducer/store';
import { CodePanelType } from '../../../../reducer/types/codeTypes';
import { getCumulativeCode } from './cumulativeCode';

const getItem = (_: any, item: CodePanelType) => item

export const selector = createSelector(
  (state: RootState) => state.code.workSpace,
  getItem,
  (workSpace, item) => {
   return getCumulativeCode(workSpace, item)
  }
)