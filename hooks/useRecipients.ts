import { useMemo } from 'react';
import { useSupabaseData, type Recipient, type NewRecipientInput } from '@/contexts/DataContext';

type UseRecipientsResult = {
  recipients: Recipient[];
  recentRecipients: Recipient[];
  isLoading: boolean;
  refresh: () => Promise<void>;
  addRecipient: (input: NewRecipientInput) => Promise<Recipient>;
};

export const useRecipients = (): UseRecipientsResult => {
  const { recipients, loading, refreshRecipients, createRecipient } = useSupabaseData();

  const recentRecipients = useMemo(() => recipients.slice(0, 5), [recipients]);

  return {
    recipients,
    recentRecipients,
    isLoading: loading.recipients,
    refresh: refreshRecipients,
    addRecipient: createRecipient,
  };
};

export default useRecipients;
