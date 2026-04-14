import { act } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { useAuthStore } from "../store/authStore";

describe("authStore", () => {
  beforeEach(() => {
    localStorage.clear();
    // Reset zustand store state
    act(() => {
      useAuthStore.setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      });
    });
  });

  it("starts with unauthenticated state", () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
    expect(state.error).toBeNull();
  });

  it("sets authenticated state after login", async () => {
    const { login } = useAuthStore.getState();
    await act(async () => {
      await login({ email: "demo@example.com", password: "password123" });
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.email).toBe("demo@example.com");
  });

  it("sets error on failed login", async () => {
    const { login } = useAuthStore.getState();
    await act(async () => {
      try {
        await login({ email: "demo@example.com", password: "wrong" });
      } catch {
        // Expected
      }
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe("Invalid email or password");
  });

  it("clears state after logout", async () => {
    const store = useAuthStore.getState();
    await act(async () => {
      await store.login({ email: "demo@example.com", password: "password123" });
    });
    expect(useAuthStore.getState().isAuthenticated).toBe(true);

    await act(async () => {
      await useAuthStore.getState().logout();
    });

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });

  it("clears error with clearError", async () => {
    const { login, clearError } = useAuthStore.getState();
    await act(async () => {
      try {
        await login({ email: "demo@example.com", password: "wrong" });
      } catch {
        // Expected
      }
    });
    expect(useAuthStore.getState().error).not.toBeNull();

    act(() => {
      clearError();
    });
    expect(useAuthStore.getState().error).toBeNull();
  });
});
