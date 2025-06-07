export interface SubscriptionResponse {
  success: boolean;
  subscription: {
    id: string;
    customer: string;
    status: "active" | "incomplete" | "past_due" | "canceled" | "unpaid";
    currency: string;
    items: {
      data: Array<{
        current_period_start: number;
        current_period_end: number;
        price: {
          unit_amount: number;
          recurring: {
            interval: "month" | "year";
          };
        };
      }>;
    };
  };
}
