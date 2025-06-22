import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";

import { useAuthenticatedApi } from "../hooks/useAuthenticatedApi";
import { Transaction, TransactionResponse } from "../types/transaction";

interface TransactionUI {
  id: string;
  date: string;
  amount: number;
  description: string;
  status: "success" | "pending" | "failed";
  receiptUrl?: string;
}

const TransactionCard: React.FC<{
  transaction: TransactionUI;
  getReceiptUrl: (date: Date) => Promise<string>;
}> = ({ transaction, getReceiptUrl }) => {
  const getStatusColor = (status: TransactionUI["status"]) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {transaction.description}
          </h3>
          <p className="text-sm text-gray-500">{transaction.date}</p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            transaction.status
          )}`}
        >
          {transaction.status.charAt(0).toUpperCase() +
            transaction.status.slice(1)}
        </span>
      </div>

      <div className="flex justify-between items-center">
        <div className="text-xl font-bold text-gray-900">
          RM {transaction.amount.toFixed(2)}
        </div>
        {transaction.status === "success" && transaction.receiptUrl && (
          <button
            onClick={async () => {
              console.log("Date: " + transaction.date);
              const url = await getReceiptUrl(new Date(transaction.date));
              window.open(url);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-600 rounded-lg hover:bg-pink-200 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Receipt</span>
          </button>
        )}
      </div>
    </div>
  );
};

function mapTransactionToUI(transaction: Transaction): TransactionUI {
  return {
    id: transaction.id,
    date: new Date(transaction.created_at).toLocaleString(),
    amount: parseInt(transaction.amount, 10), // if amount is in cents
    description: "Malay Course Training - Monthly Subscription",
    status: transaction.status === "succeeded" ? "success" : "failed",
    // TODO: get receipt url from transaction
    receiptUrl:
      "https://mail.google.com/mail/u/0?ui=2&ik=c8e3b9bd96&attid=0.1&permmsgid=msg-f:1832455877777701693&th=196e30e97d843b3d&view=att&zw&disp=inline",
  };
}

function History() {
  const { apiCall } = useAuthenticatedApi();

  const [transactions, setTransactions] = useState<TransactionUI[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await apiCall("/transaction/list");
        const data: TransactionResponse = await response.json();
        setTransactions(data.transactions.map(mapTransactionToUI));
      } catch (err) {
        console.error("Failed to fetch transactions", err);
      }
    };
    fetchTransactions();
  }, []);

  // Function to get the receipt url by startDate and endDate
  const getReceiptUrl = async (transactionDate: Date): Promise<string> => {
    // Get the UTC year and month
    const year = transactionDate.getUTCFullYear();
    const month = transactionDate.getUTCMonth(); // 0 = Jan, so 5 = June
    const date = transactionDate.getUTCDate();

    const startDate = new Date(Date.UTC(year, month, date)); // June 1, 00:00 UTC
    const endDate = new Date(Date.UTC(year, month, date + 1)); // July 1, 00:00 UTC

    // console.log("startDate:", startDate.toISOString()); // 2025-06-01T00:00:00.000Z
    // console.log("endDate:", endDate.toISOString()); // 2025-07-01T00:00:00.000Z

    try {
      const response = await apiCall(
        `/receipt?startDate=${startDate}&endDate=${endDate}`
      );
      const data = await response.json();
      console.log("data", data);
      return data.receipt.receipt_url;
    } catch (error) {
      console.error("Failed to get latest receipt url", error);
      throw error; // Re-throw the error since we can't return a valid URL
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Transaction History
      </h1>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            getReceiptUrl={getReceiptUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default History;
