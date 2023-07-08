import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface VideoShareInterface {
  id?: string;
  video_url: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface VideoShareGetQueryInterface extends GetQueryInterface {
  id?: string;
  video_url?: string;
  user_id?: string;
}
