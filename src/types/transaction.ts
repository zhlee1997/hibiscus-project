export interface Transaction {
  id: string;
  user_id: string;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  stripe_invoice_id: string;
  stripe_payment_intent_id: string | null;
  amount: string;
  currency: string;
  status: string;
  payment_method: string | null;
  receipt_url: string | null;
  invoice_pdf_url: string | null;
  created_at: string;
  stripe_created_at: string;
}

export interface TransactionResponse {
  msg: string;
  success: boolean;
  transactions: Transaction[];
}
