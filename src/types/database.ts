export type SubscriptionStatus = 'free' | 'active' | 'past_due' | 'canceled';

export interface User {
  id: string;
  email: string;
  stripe_customer_id?: string;
  subscription_status: SubscriptionStatus;
  created_at: string;
}

export interface SavedCalculator {
  id: string;
  user_id: string;
  calculator_slug: string;
  category: string;
  saved_name: string;
  input_state: Record<string, any>;
  core_metric?: number;
  is_public: boolean; // For embed/share logic
  created_at: string;
  last_updated: string;
}
