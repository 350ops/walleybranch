import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

type Profile = {
  id: string;
  phone: string | null;
  full_name: string | null;
  avatar_url: string | null;
  username: string | null;
  created_at: string;
  updated_at: string;
};

type Card = {
  id: string;
  user_id: string;
  card_number_last4: string;
  expiry_month: number;
  expiry_year: number;
  color_scheme: string | null;
  card_brand: string | null;
  nickname: string | null;
  is_default: boolean;
  created_at: string;
};

type Recipient = {
  id: string;
  user_id: string;
  name: string;
  email: string | null;
  phone: string | null;
  avatar_url: string | null;
  account_last4: string | null;
  created_at: string;
};

type Transaction = {
  id: string;
  user_id: string;
  card_id: string | null;
  recipient_id: string | null;
  merchant_name: string;
  category: string | null;
  amount: number;
  payment_method: string | null;
  icon_url: string | null;
  status: string | null;
  created_at: string;
};

type UserSettings = {
  user_id: string;
  notifications_enabled: boolean;
  push_tokens: string[];
  language: string;
  theme: string;
  spending_limit: number | null;
  biometric_enabled: boolean;
  weekly_digest: boolean;
  updated_at: string;
};

type Notification = {
  id: string;
  user_id: string;
  title: string;
  body: string | null;
  type: string | null;
  read: boolean;
  created_at: string;
};

type Account = {
  id: string;
  user_id: string;
  balance: number;
  available_balance: number;
  currency: string;
  updated_at: string;
};

type LoadingState = {
  profile: boolean;
  cards: boolean;
  recipients: boolean;
  transactions: boolean;
  settings: boolean;
  notifications: boolean;
  accounts: boolean;
};

const initialLoadingState: LoadingState = {
  profile: false,
  cards: false,
  recipients: false,
  transactions: false,
  settings: false,
  notifications: false,
  accounts: false,
};

export type NewCardInput = {
  card_number_last4: string;
  expiry_month: number;
  expiry_year: number;
  color_scheme?: string;
  card_brand?: string;
  nickname?: string;
  is_default?: boolean;
};

export type NewRecipientInput = {
  name: string;
  email?: string;
  phone?: string;
  avatar_url?: string;
  account_last4?: string;
};

export type ProfileUpdateInput = {
  full_name?: string;
  username?: string;
  avatar_url?: string | null;
  phone?: string | null;
};

export type UserSettingsUpdateInput = Partial<
  Pick<
    UserSettings,
    | 'notifications_enabled'
    | 'push_tokens'
    | 'language'
    | 'theme'
    | 'spending_limit'
    | 'biometric_enabled'
    | 'weekly_digest'
  >
>;

type SupabaseDataContextValue = {
  isHydrated: boolean;
  loading: LoadingState;
  profile: Profile | null;
  cards: Card[];
  recipients: Recipient[];
  transactions: Transaction[];
  userSettings: UserSettings | null;
  notifications: Notification[];
  account: Account | null;
  refreshAll: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  refreshCards: () => Promise<void>;
  refreshRecipients: () => Promise<void>;
  refreshTransactions: () => Promise<void>;
  refreshUserSettings: () => Promise<void>;
  refreshNotifications: () => Promise<void>;
  refreshAccount: () => Promise<void>;
  createCard: (input: NewCardInput) => Promise<Card>;
  createRecipient: (input: NewRecipientInput) => Promise<Recipient>;
  updateProfile: (input: ProfileUpdateInput) => Promise<Profile>;
  updateUserSettings: (input: UserSettingsUpdateInput) => Promise<UserSettings>;
  markNotificationAsRead: (id: string) => Promise<void>;
  setBalance: (amount: number) => Promise<void>;
};

const SupabaseDataContext = createContext<SupabaseDataContextValue | undefined>(undefined);

export const SupabaseDataProvider = ({ children }: { children: ReactNode }) => {
  const { session, isLoading: isAuthLoading } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [cards, setCards] = useState<Card[]>([]);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [userSettings, setUserSettings] = useState<UserSettings | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState<LoadingState>(initialLoadingState);
  const [isHydrated, setIsHydrated] = useState(false);

  const setLoadingFlag = useCallback((key: keyof LoadingState, value: boolean) => {
    setLoading((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetData = useCallback(() => {
    setProfile(null);
    setCards([]);
    setRecipients([]);
    setTransactions([]);
    setUserSettings(null);
    setNotifications([]);
    setAccount(null);
    setIsHydrated(false);
  }, []);

  const ensureSession = useCallback(() => {
    if (!session?.user) {
      throw new Error('No authenticated user');
    }
    return session.user;
  }, [session?.user]);

  const fetchProfile = useCallback(async () => {
    if (!session?.user) {
      setProfile(null);
      return;
    }
    setLoadingFlag('profile', true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (error) {
        if ((error as any).code === 'PGRST116') {
          setProfile(null);
          return;
        }
        throw error;
      }
      setProfile(data as Profile);
    } catch (error) {
      console.error('Error fetching profile', error);
    } finally {
      setLoadingFlag('profile', false);
    }
  }, [session?.user, setLoadingFlag]);

  const fetchCards = useCallback(async () => {
    if (!session?.user) {
      setCards([]);
      return;
    }
    setLoadingFlag('cards', true);
    try {
      const { data, error } = await supabase
        .from('cards')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCards((data || []) as Card[]);
    } catch (error) {
      console.error('Error fetching cards', error);
    } finally {
      setLoadingFlag('cards', false);
    }
  }, [session?.user, setLoadingFlag]);

  const fetchRecipients = useCallback(async () => {
    if (!session?.user) {
      setRecipients([]);
      return;
    }
    setLoadingFlag('recipients', true);
    try {
      const { data, error } = await supabase
        .from('recipients')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setRecipients((data || []) as Recipient[]);
    } catch (error) {
      console.error('Error fetching recipients', error);
    } finally {
      setLoadingFlag('recipients', false);
    }
  }, [session?.user, setLoadingFlag]);

  const fetchTransactions = useCallback(async () => {
    if (!session?.user) {
      setTransactions([]);
      return;
    }
    setLoadingFlag('transactions', true);
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setTransactions((data || []) as Transaction[]);
    } catch (error) {
      console.error('Error fetching transactions', error);
    } finally {
      setLoadingFlag('transactions', false);
    }
  }, [session?.user, setLoadingFlag]);

  const fetchUserSettings = useCallback(async () => {
    if (!session?.user) {
      setUserSettings(null);
      return;
    }
    setLoadingFlag('settings', true);
    try {
      const { data, error } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', session.user.id)
        .single();
      if (error) {
        if ((error as any).code === 'PGRST116') {
          setUserSettings(null);
          return;
        }
        throw error;
      }
      setUserSettings(data as UserSettings);
    } catch (error) {
      console.error('Error fetching user settings', error);
    } finally {
      setLoadingFlag('settings', false);
    }
  }, [session?.user, setLoadingFlag]);

  const fetchNotifications = useCallback(async () => {
    if (!session?.user) {
      setNotifications([]);
      return;
    }
    setLoadingFlag('notifications', true);
    try {
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setNotifications((data || []) as Notification[]);
    } catch (error) {
      console.error('Error fetching notifications', error);
    } finally {
      setLoadingFlag('notifications', false);
    }
  }, [session?.user, setLoadingFlag]);

  const fetchAccount = useCallback(async () => {
    if (!session?.user) {
      setAccount(null);
      return;
    }
    setLoadingFlag('accounts', true);
    try {
      const { data, error } = await supabase
        .from('accounts')
        .select('*')
        .eq('user_id', session.user.id)
        .single();
      if (error) {
        if ((error as any).code === 'PGRST116') {
          setAccount(null);
          return;
        }
        throw error;
      }
      setAccount(data as Account);
    } catch (error) {
      console.error('Error fetching account', error);
    } finally {
      setLoadingFlag('accounts', false);
    }
  }, [session?.user, setLoadingFlag]);

  const refreshAll = useCallback(async () => {
    if (!session?.user) {
      resetData();
      setIsHydrated(true);
      return;
    }
    await Promise.all([
      fetchProfile(),
      fetchCards(),
      fetchRecipients(),
      fetchTransactions(),
      fetchUserSettings(),
      fetchNotifications(),
      fetchAccount(),
    ]);
    setIsHydrated(true);
  }, [
    session?.user,
    resetData,
    fetchProfile,
    fetchCards,
    fetchRecipients,
    fetchTransactions,
    fetchUserSettings,
    fetchNotifications,
    fetchAccount,
  ]);

  useEffect(() => {
    if (isAuthLoading) return;
    refreshAll();
  }, [isAuthLoading, refreshAll]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextState: AppStateStatus) => {
      if (nextState === 'active') {
        refreshAll();
      }
    });
    return () => {
      subscription.remove();
    };
  }, [refreshAll]);

  const createCard = useCallback(
    async (input: NewCardInput) => {
      const user = ensureSession();

      if (input.is_default) {
        await supabase.from('cards').update({ is_default: false }).eq('user_id', user.id);
      }

      const { data, error } = await supabase
        .from('cards')
        .insert({
          ...input,
          user_id: user.id,
        })
        .select('*')
        .single();

      if (error) throw error;

      setCards((prev) => {
        const filtered = input.is_default
          ? prev.map((card) => ({ ...card, is_default: false }))
          : prev;
        return [data as Card, ...filtered];
      });

      return data as Card;
    },
    [ensureSession]
  );

  const createRecipient = useCallback(
    async (input: NewRecipientInput) => {
      const user = ensureSession();
      const { data, error } = await supabase
        .from('recipients')
        .insert({
          ...input,
          user_id: user.id,
        })
        .select('*')
        .single();
      if (error) throw error;
      setRecipients((prev) => [data as Recipient, ...prev]);
      return data as Recipient;
    },
    [ensureSession]
  );

  const updateProfile = useCallback(
    async (input: ProfileUpdateInput) => {
      const user = ensureSession();
      const { data, error } = await supabase
        .from('profiles')
        .upsert(
          {
            id: user.id,
            ...input,
          },
          { onConflict: 'id' }
        )
        .select('*')
        .single();
      if (error) throw error;
      setProfile(data as Profile);
      return data as Profile;
    },
    [ensureSession]
  );

  const updateUserSettings = useCallback(
    async (input: UserSettingsUpdateInput) => {
      const user = ensureSession();
      const { data, error } = await supabase
        .from('user_settings')
        .upsert({
          user_id: user.id,
          ...input,
        })
        .select('*')
        .single();
      if (error) throw error;
      setUserSettings(data as UserSettings);
      return data as UserSettings;
    },
    [ensureSession]
  );

  const markNotificationAsRead = useCallback(
    async (id: string) => {
      const user = ensureSession();
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('user_id', user.id)
        .eq('id', id);
      if (error) throw error;
      setNotifications((prev) =>
        prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
      );
    },
    [ensureSession]
  );

  const setBalance = useCallback(
    async (amount: number) => {
      const user = ensureSession();

      const { data, error } = await supabase
        .from('accounts')
        .upsert(
          {
            user_id: user.id,
            balance: amount,
            available_balance: amount,
            currency: 'USD',
          },
          { onConflict: 'user_id' }
        )
        .select('*')
        .single();

      if (error) throw error;

      setAccount(data as Account);
    },
    [ensureSession]
  );

  const value = useMemo<SupabaseDataContextValue>(
    () => ({
      isHydrated,
      loading,
      profile,
      cards,
      recipients,
      transactions,
      userSettings,
      notifications,
      account,
      refreshAll,
      refreshProfile: fetchProfile,
      refreshCards: fetchCards,
      refreshRecipients: fetchRecipients,
      refreshTransactions: fetchTransactions,
      refreshUserSettings: fetchUserSettings,
      refreshNotifications: fetchNotifications,
      refreshAccount: fetchAccount,
      createCard,
      createRecipient,
      updateProfile,
      updateUserSettings,
      markNotificationAsRead,
      setBalance,
    }),
    [
      isHydrated,
      loading,
      profile,
      cards,
      recipients,
      transactions,
      userSettings,
      notifications,
      account,
      refreshAll,
      fetchProfile,
      fetchCards,
      fetchRecipients,
      fetchTransactions,
      fetchUserSettings,
      fetchNotifications,
      fetchAccount,
      createCard,
      createRecipient,
      updateProfile,
      updateUserSettings,
      markNotificationAsRead,
      setBalance,
    ]
  );

  return <SupabaseDataContext.Provider value={value}>{children}</SupabaseDataContext.Provider>;
};

export const useSupabaseData = () => {
  const context = useContext(SupabaseDataContext);
  if (!context) {
    throw new Error('useSupabaseData must be used within a SupabaseDataProvider');
  }
  return context;
};

export type { Profile, Card, Recipient, Transaction, UserSettings, Notification, Account };
