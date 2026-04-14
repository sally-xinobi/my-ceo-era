import { useEphemeralStore } from "./ephemeralStore";
import { usePersistedStore } from "./persistedStore";

type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
};

interface AppState {
  notifications: Notification[];
  isLoading: boolean;
  sidebarOpen: boolean;
  theme: "light" | "dark" | "system";
  addNotification: (notification: Omit<Notification, "id">) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  setLoading: (loading: boolean) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
}

export const useAppStore: () => AppState = () => {
  const ephemeral = useEphemeralStore();
  const persisted = usePersistedStore();

  return {
    notifications: ephemeral.notifications,
    isLoading: ephemeral.isLoading,
    sidebarOpen: persisted.sidebarOpen,
    theme: persisted.theme,
    addNotification: ephemeral.addNotification,
    removeNotification: ephemeral.removeNotification,
    clearNotifications: ephemeral.clearNotifications,
    setLoading: ephemeral.setLoading,
    toggleSidebar: persisted.toggleSidebar,
    setSidebarOpen: persisted.setSidebarOpen,
    setTheme: persisted.setTheme,
  };
};
