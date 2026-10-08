import { ProfileInterface } from './profile.interface';

export interface ArticleInterface {
  id: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  slug: string;
  author: ProfileInterface;
  createdAt: string;
  updatedAt: string;
}
