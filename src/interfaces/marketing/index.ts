import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MarketingInterface {
  id?: string;
  campaign_name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface MarketingGetQueryInterface extends GetQueryInterface {
  id?: string;
  campaign_name?: string;
  user_id?: string;
}
