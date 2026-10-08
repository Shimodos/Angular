import { AuthStateInterface } from '../../auth/types/authState.interface';
import { FeedStateInterface } from '../modules/Feed/type/feedState.interface';

export interface AppStateInterface {
  auth: AuthStateInterface;
  feed: FeedStateInterface;
}
