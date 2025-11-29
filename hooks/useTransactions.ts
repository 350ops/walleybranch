import { useMemo } from 'react';
import { useSupabaseData, type Transaction } from '@/contexts/DataContext';

type MonthlyTotal = {
  month: string;
  total: number;
};

type UseTransactionsResult = {
  transactions: Transaction[];
  isLoading: boolean;
  refresh: () => Promise<void>;
  monthlyTotals: MonthlyTotal[];
  recentTransactions: Transaction[];
  spentThisMonth: number;
};

const monthFormatter = new Intl.DateTimeFormat('en', { month: 'short' });

export const useTransactions = (): UseTransactionsResult => {
  const { transactions, loading, refreshTransactions } = useSupabaseData();

  const monthlyTotals = useMemo<MonthlyTotal[]>(() => {
    const totals = new Map<string, number>();
    transactions.forEach((transaction) => {
      const created = new Date(transaction.created_at);
      const key = `${created.getFullYear()}-${created.getMonth()}`;
      const prev = totals.get(key) ?? 0;
      totals.set(key, prev + Number(transaction.amount || 0));
    });

    const sortedKeys = Array.from(totals.keys()).sort();
    return sortedKeys.map((key) => {
      const [year, month] = key.split('-').map(Number);
      const labelDate = new Date(year, month, 1);
      return {
        month: monthFormatter.format(labelDate),
        total: Number(totals.get(key)?.toFixed(2) ?? 0),
      };
    });
  }, [transactions]);

  const spentThisMonth = useMemo(() => {
    const now = new Date();
    return transactions
      .filter((transaction) => {
        const created = new Date(transaction.created_at);
        return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear();
      })
      .reduce((sum, tx) => sum + Number(tx.amount || 0), 0);
  }, [transactions]);

  const recentTransactions = useMemo(() => transactions.slice(0, 5), [transactions]);

  return {
    transactions,
    isLoading: loading.transactions,
    refresh: refreshTransactions,
    monthlyTotals,
    recentTransactions,
    spentThisMonth,
  };
};

export default useTransactions;
