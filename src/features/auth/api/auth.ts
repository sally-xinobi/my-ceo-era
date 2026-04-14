import type {
  AuthResponse,
  LoginCredentials,
  SignupCredentials,
  User,
} from "../types";

const MOCK_TOKEN_KEY = "mock-auth-token";
const SIMULATED_DELAY = 500;

const DEMO_USER: User = {
  id: "user-1",
  email: "demo@example.com",
  name: "Demo User",
  createdAt: new Date().toISOString(),
};

const DEMO_PASSWORD = "password123";

const registeredUsers = new Map<string, { user: User; password: string }>();
registeredUsers.set(DEMO_USER.email, {
  user: DEMO_USER,
  password: DEMO_PASSWORD,
});

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(MOCK_TOKEN_KEY);
}

function setToken(token: string): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(MOCK_TOKEN_KEY, token);
}

function removeToken(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(MOCK_TOKEN_KEY);
}

export async function login(
  credentials: LoginCredentials,
): Promise<AuthResponse> {
  await delay(SIMULATED_DELAY);

  const entry = registeredUsers.get(credentials.email);
  if (!entry || entry.password !== credentials.password) {
    throw new Error("Invalid email or password");
  }

  const token = `mock-token-${Date.now()}`;
  setToken(token);

  return { user: entry.user, token };
}

export async function signup(
  credentials: SignupCredentials,
): Promise<AuthResponse> {
  await delay(SIMULATED_DELAY);

  if (registeredUsers.has(credentials.email)) {
    throw new Error("Email already registered");
  }

  const user: User = {
    id: `user-${Date.now()}`,
    email: credentials.email,
    name: credentials.name,
    createdAt: new Date().toISOString(),
  };

  const token = `mock-token-${Date.now()}`;
  registeredUsers.set(credentials.email, {
    user,
    password: credentials.password,
  });
  setToken(token);

  return { user, token };
}

export async function logout(): Promise<void> {
  await delay(200);
  removeToken();
}

export async function getCurrentUser(): Promise<User | null> {
  await delay(200);

  const token = getToken();
  if (!token) return null;

  // In a real app, this would validate the token with the server.
  // For mock purposes, return the demo user if a token exists.
  return DEMO_USER;
}
