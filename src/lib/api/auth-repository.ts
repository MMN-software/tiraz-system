// src/lib/api/auth-repository.ts
// لایه دسترسی به Auth — از API Routes + Neon DB استفاده می‌کند
// توکن سشن در localStorage ذخیره می‌شود، ولی داده‌ها در دیتابیس واقعی هستند.

import type {
  User,
  LoginInput,
  RegisterInput,
  CustomerType,
  UserStatus,
} from "@/lib/types/auth";

const TOKEN_KEY = "tiraz_auth_token";

// ===== توابع کمکی =====

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function getToken(): string | null {
  if (!isBrowser()) return null;
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function setToken(token: string): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // ignore
  }
}

function clearToken(): void {
  if (!isBrowser()) return;
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // ignore
  }
}

interface ApiError {
  ok: false;
  error: string;
}

interface ApiUserResponse {
  ok: true;
  user: User;
}

interface ApiLoginResponse {
  ok: true;
  token: string;
  user: User;
  expiresAt: string;
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(path, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
    },
  });
  const data = (await res.json()) as T;
  return data;
}

// ===== API عمومی =====

/**
 * ثبت‌نام کاربر جدید
 */
export async function register(
  input: RegisterInput
): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    const data = await apiFetch<
      ApiLoginResponse | ApiError
    >("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        name: input.name,
        email: input.email,
        phone: input.phone,
        password: input.password,
        customerType: input.customerType,
        organizationName: input.organizationName,
        nationalId: input.nationalId,
        companyRegNumber: input.companyRegNumber,
      }),
    });

    if (!data.ok) {
      return { ok: false, error: data.error };
    }

    // اگه توکن برگشت، ذخیره کن (اختیاری — بستگی به API داره)
    if ("token" in data && data.token) {
      setToken(data.token);
    }

    return { ok: true, user: data.user };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "خطا در ارتباط با سرور",
    };
  }
}

/**
 * ورود کاربر
 */
export async function login(
  input: LoginInput
): Promise<
  | { ok: true; user: User }
  | { ok: false; error: string }
> {
  try {
    const data = await apiFetch<
      ApiLoginResponse | ApiError
    >("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({
        identifier: input.identifier,
        password: input.password,
      }),
    });

    if (!data.ok) {
      return { ok: false, error: data.error };
    }

    setToken(data.token);
    return { ok: true, user: data.user };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "خطا در ارتباط با سرور",
    };
  }
}

/**
 * دریافت کاربر فعلی از توکن
 */
export async function getCurrentUser(): Promise<User | null> {
  const token = getToken();
  if (!token) return null;

  try {
    const data = await apiFetch<ApiUserResponse | ApiError>(
      "/api/auth/me",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (!data.ok) {
      // اگه سشن منقضی یا نامعتبر بود، توکن رو پاک کن
      clearToken();
      return null;
    }

    return data.user;
  } catch {
    return null;
  }
}

/**
 * خروج
 */
export async function logout(): Promise<void> {
  clearToken();
}

// ===== توابع سازگاری (برای کدهای قدیمی) =====

/**
 * @deprecated از getCurrentUser استفاده کن
 */
export async function getUserById(id: string): Promise<User | null> {
  const user = await getCurrentUser();
  return user && user.id === id ? user : null;
}

/**
 * @deprecated از getAllUsersAPI استفاده کن
 */
export async function getAllUsers(): Promise<User[]> {
  const res = await fetch("/api/admin/users");
  const data = await res.json();
  if (!data.ok) return [];
  return data.users as User[];
}

/**
 * @deprecated
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await getAllUsers();
  return users.find((u) => u.email === email) ?? null;
}

/**
 * @deprecated
 */
export async function getUserByIdentifier(
  identifier: string
): Promise<User | null> {
  const users = await getAllUsers();
  const norm = identifier.trim().toLowerCase();
  return (
    users.find(
      (u) =>
        u.email.toLowerCase() === norm ||
        u.phone.replace(/\s/g, "") === norm.replace(/\s/g, "")
    ) ?? null
  );
}

/**
 * @deprecated از register استفاده کن
 */
export async function createUser(input: RegisterInput): Promise<User> {
  const res = await register(input);
  if (!res.ok) throw new Error(res.error);
  return res.user;
}

/**
 * @deprecated از login استفاده کن
 */
export async function verifyCredentials(
  identifier: string,
  password: string
): Promise<User | null> {
  const res = await login({ identifier, password });
  return res.ok ? res.user : null;
}

/**
 * @deprecated
 */
export async function getSession(): Promise<{ userId: string } | null> {
  const user = await getCurrentUser();
  return user ? { userId: user.id } : null;
}

/**
 * @deprecated
 */
export async function setSession(_userId: string): Promise<void> {
  // no-op — توکن از قبل ذخیره شده
}

/**
 * @deprecated از logout استفاده کن
 */
export async function clearSession(): Promise<void> {
  await logout();
}

/**
 * @deprecated
 */
export function ensureDemoAdmin(): void {
  // no-op — ادمین از DB میاد
}

/**
 * @deprecated
 */
export interface UserStats {
  total: number;
  customers: number;
  admins: number;
  pending: number;
  byType: Record<CustomerType, number>;
}

/**
 * @deprecated
 */
export async function getUserStats(): Promise<UserStats> {
  const users = await getAllUsers();
  const byType: Record<CustomerType, number> = {
    individual: 0,
    company: 0,
    hospital: 0,
    clinic: 0,
    lab: 0,
  };
  users.forEach((u) => {
    if (u.role === "customer" && u.customerType) {
      byType[u.customerType] = (byType[u.customerType] || 0) + 1;
    }
  });
  return {
    total: users.length,
    customers: users.filter((u) => u.role === "customer").length,
    admins: users.filter((u) => u.role === "admin").length,
    pending: users.filter((u) => u.status === "pending").length,
    byType,
  };
}

/**
 * @deprecated از API admin استفاده کن
 */
export async function updateUserStatus(
  id: string,
  status: UserStatus
): Promise<User | null> {
  const res = await fetch(`/api/admin/users/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  const data = await res.json();
  return data.ok ? (data.user as User) : null;
}

/**
 * @deprecated
 */
export async function deleteUser(id: string): Promise<boolean> {
  const res = await fetch(`/api/admin/users/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data.ok === true;
}

// ===== نسخه‌های جدید با ارسال توکن =====

export async function fetchAllUsers(): Promise<User[]> {
  const token = getToken();
  if (!token) return [];

  try {
    const res = await fetch("/api/admin/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (!data.ok) return [];
    return data.users as User[];
  } catch {
    return [];
  }
}

export async function fetchUpdateUserStatus(
  id: string,
  status: UserStatus
): Promise<{ ok: boolean; user?: User; error?: string }> {
  const token = getToken();
  if (!token) return { ok: false, error: "نیاز به ورود" };

  try {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    });
    return await res.json();
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطا" };
  }
}

export async function fetchDeleteUser(
  id: string
): Promise<{ ok: boolean; error?: string }> {
  const token = getToken();
  if (!token) return { ok: false, error: "نیاز به ورود" };

  try {
    const res = await fetch(`/api/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "خطا" };
  }
}

export async function fetchUserStats() {
  const users = await fetchAllUsers();
  const byType = {
    individual: 0,
    company: 0,
    hospital: 0,
    clinic: 0,
    lab: 0,
  };
  users.forEach((u) => {
    if (u.role === "customer" && u.customerType) {
      byType[u.customerType] = (byType[u.customerType] || 0) + 1;
    }
  });
  return {
    total: users.length,
    customers: users.filter((u) => u.role === "customer").length,
    admins: users.filter((u) => u.role === "admin").length,
    pending: users.filter((u) => u.status === "pending").length,
    byType,
  };
}
