import { ArticleStateInterface } from '../../article/type/articleState.interface';
import { AuthStateInterface } from '../../auth/types/authState.interface';
import { FeedStateInterface } from '../modules/feed/type/feedState.interface';
import { TagsStateInterface } from '../modules/tag/type/tagsState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
  tags: TagsStateInterface;
  article: ArticleStateInterface;
}
