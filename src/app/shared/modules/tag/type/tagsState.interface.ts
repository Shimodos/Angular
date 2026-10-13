import { PopularTagType } from '../../../types/PopularTagType.type';

export interface TagsStateInterface {
  isLoading: boolean;
  error: string | null;
  data: PopularTagType[] | null;
}
