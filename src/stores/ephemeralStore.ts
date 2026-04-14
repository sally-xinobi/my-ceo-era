import { create } from "zustand";

type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
};

interface EphemeralState {
  notifications: Notification[];
  isLoading: boolean;
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setLoading: (loading: boolean) => void;
}

export const useEphemeralStore = create<EphemeralState>((set) => ({
  notifications: [],
  isLoading: false,

  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        { ...notification, id: Date.now().toString() },
      ],
    })),

  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  clearNotifications: () => set({ notifications: [] }),

  setLoading: (isLoading) => set({ isLoading }),
}));
