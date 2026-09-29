"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { User, LoginInput, RegisterInput } from "@/lib/types/auth";
import * as authRepo from "@/lib/api/auth-repository";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isCustomer: boolean;

  login: (input: LoginInput) => Promise<{ ok: true } | { ok: false; error: string }>;
  register: (input: RegisterInput) => Promise<{ ok: true; user: User } | { ok: false; error: string }>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // خواندن session در اولین بارگذاری
  useEffect(() => {
    async function restore() {
      try {
        authRepo.ensureDemoAdmin();
        const session = await authRepo.getSession();
        if (session) {
          const u = await authRepo.getUserById(session.userId);
          if (u && u.status !== "blocked") {
            setUser(u);
          } else {
            await authRepo.clearSession();
          }
        }
      } finally {
        setIsLoading(false);
      }
    }
    restore();
  }, []);

  const login = useCallback(
    async (input: LoginInput) => {
      const u = await authRepo.verifyCredentials(
        input.identifier,
        input.password
      );
      if (!u) {
        return {
          ok: false as const,
          error: "ایمیل/موبایل یا رمز عبور اشتباه است.",
        };
      }
      if (u.status === "blocked") {
        return {
          ok: false as const,
          error: "حساب کاربری شما مسدود شده است. با پشتیبانی تماس بگیرید.",
        };
      }
      if (u.status === "pending") {
        return {
          ok: false as const,
          error: "حساب کاربری شما در انتظار تأیید است.",
        };
      }
      await authRepo.setSession(u.id);
      setUser(u);
      return { ok: true as const };
    },
    []
  );

  const register = useCallback(async (input: RegisterInput) => {
    try {
      const newUser = await authRepo.createUser(input);
      await authRepo.setSession(newUser.id);
      setUser(newUser);
      return { ok: true as const, user: newUser };
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "خطا در ایجاد حساب کاربری.";
      return { ok: false as const, error: message };
    }
  }, []);

  const logout = useCallback(async () => {
    await authRepo.clearSession();
    setUser(null);
  }, []);

  const refresh = useCallback(async () => {
    if (!user) return;
    const u = await authRepo.getUserById(user.id);
    if (u) setUser(u);
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        isCustomer: user?.role === "customer",
        login,
        register,
        logout,
        refresh,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
