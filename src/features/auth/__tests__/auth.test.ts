import { beforeEach, describe, expect, it } from "vitest";
import { login, logout, signup } from "../api/auth";

describe("authService", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("login", () => {
    it("succeeds with valid demo credentials", async () => {
      const result = await login({
        email: "demo@example.com",
        password: "password123",
      });
      expect(result.user.email).toBe("demo@example.com");
      expect(result.token).toBeDefined();
    });

    it("throws on invalid credentials", async () => {
      await expect(
        login({ email: "demo@example.com", password: "wrong" }),
      ).rejects.toThrow("Invalid email or password");
    });

    it("throws on non-existent user", async () => {
      await expect(
        login({ email: "nobody@example.com", password: "password123" }),
      ).rejects.toThrow("Invalid email or password");
    });
  });

  describe("signup", () => {
    it("creates a new user", async () => {
      const result = await signup({
        email: "new@example.com",
        password: "password123",
        name: "New User",
      });
      expect(result.user.email).toBe("new@example.com");
      expect(result.user.name).toBe("New User");
      expect(result.token).toBeDefined();
    });

    it("throws if email is already registered", async () => {
      await expect(
        signup({
          email: "demo@example.com",
          password: "password123",
          name: "Dup",
        }),
      ).rejects.toThrow("Email already registered");
    });
  });

  describe("logout", () => {
    it("removes token from localStorage", async () => {
      await login({ email: "demo@example.com", password: "password123" });
      expect(localStorage.getItem("mock-auth-token")).not.toBeNull();

      await logout();
      expect(localStorage.getItem("mock-auth-token")).toBeNull();
    });
  });
});
