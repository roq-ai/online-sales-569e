import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface CustomerReplyInterface {
  id?: string;
  response: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface CustomerReplyGetQueryInterface extends GetQueryInterface {
  id?: string;
  response?: string;
  user_id?: string;
}
