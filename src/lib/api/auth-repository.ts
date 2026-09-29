/**
 * لایه دسترسی به داده برای احراز هویت
 * -------------------------------------
 * فعلاً از localStorage استفاده می‌کنه.
 * برای اتصال به دیتابیس واقعی، فقط توابع این فایل بازنویسی می‌شن.
 *
 * مثال اتصال به Prisma:
 *   export async function getUserByEmail(email: string) {
 *     return prisma.user.findUnique({ where: { email } });
 *   }
 */

import type {
  User,
  AuthSession,
  RegisterInput,
  CustomerType,
} from "@/lib/types/auth";

const USERS_KEY = "tiraz_users";
const SESSION_KEY = "tiraz_auth_session";
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 روز

// ===== توابع کمکی =====

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readUsers(): (User & { password: string })[] {
  if (!isBrowser()) return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeUsers(users: (User & { password: string })[]): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch {
    // ignore
  }
}

/**
 * هش ساده برای رمز عبور (فقط برای دمو)
 * ⚠️ در production حتماً از bcrypt یا argon2 در backend استفاده کن
 */
function hashPassword(password: string): string {
  let hash = 0;
  const salt = "tiraz_salt_v1";
  const input = salt + password;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return "h_" + Math.abs(hash).toString(36);
}

function generateId(): string {
  return "u_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function generateToken(): string {
  return "t_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ===== توابع اصلی =====

export async function getUserById(id: string): Promise<User | null> {
  const users = readUsers();
  const user = users.find((u) => u.id === id);
  if (!user) return null;
  const { password: _password, ...rest } = user;
  return rest;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = readUsers();
  const normalized = email.trim().toLowerCase();
  const user = users.find((u) => u.email.toLowerCase() === normalized);
  if (!user) return null;
  const { password: _password, ...rest } = user;
  return rest;
}

export async function getUserByIdentifier(
  identifier: string
): Promise<User | null> {
  const users = readUsers();
  const normalized = identifier.trim().toLowerCase();
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === normalized ||
      u.phone.replace(/\s/g, "") === normalized.replace(/\s/g, "")
  );
  if (!user) return null;
  const { password: _password, ...rest } = user;
  return rest;
}

export async function createUser(input: RegisterInput): Promise<User> {
  const users = readUsers();

  // بررسی تکراری بودن ایمیل یا موبایل
  const exists = users.some(
    (u) =>
      u.email.toLowerCase() === input.email.toLowerCase() ||
      u.phone.replace(/\s/g, "") === input.phone.replace(/\s/g, "")
  );
  if (exists) {
    throw new Error("کاربری با این ایمیل یا شماره موبایل قبلاً ثبت‌نام کرده است.");
  }

  const newUser: User & { password: string } = {
    id: generateId(),
    email: input.email.trim().toLowerCase(),
    phone: input.phone.trim(),
    name: input.name.trim(),
    role: "customer",
    status: "active",
    customerType: input.customerType,
    organizationName: input.organizationName?.trim(),
    nationalId: input.nationalId?.trim(),
    companyRegNumber: input.companyRegNumber?.trim(),
    createdAt: new Date().toISOString(),
    password: hashPassword(input.password),
  };

  users.push(newUser);
  writeUsers(users);

  const { password: _password, ...rest } = newUser;
  return rest;
}

export async function verifyCredentials(
  identifier: string,
  password: string
): Promise<User | null> {
  const users = readUsers();
  const normalized = identifier.trim().toLowerCase();
  const user = users.find(
    (u) =>
      u.email.toLowerCase() === normalized ||
      u.phone.replace(/\s/g, "") === normalized.replace(/\s/g, "")
  );
  if (!user) return null;

  const hashed = hashPassword(password);
  if (user.password !== hashed) return null;

  const { password: _password, ...rest } = user;
  return rest;
}

// ===== مدیریت Session =====

export async function getSession(): Promise<AuthSession | null> {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const session = JSON.parse(raw) as AuthSession;
    if (Date.now() > session.expiresAt) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return session;
  } catch {
    return null;
  }
}

export async function setSession(userId: string): Promise<AuthSession> {
  const session: AuthSession = {
    userId,
    token: generateToken(),
    loggedInAt: Date.now(),
    expiresAt: Date.now() + SESSION_DURATION_MS,
  };
  if (isBrowser()) {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    } catch {
      // ignore
    }
  }
  return session;
}

export async function clearSession(): Promise<void> {
  if (isBrowser()) {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch {
      // ignore
    }
  }
}

// ===== ایجاد ادمین پیش‌فرض (فقط برای دمو) =====

export function ensureDemoAdmin(): void {
  if (!isBrowser()) return;
  const users = readUsers();
  const adminExists = users.some((u) => u.role === "admin");
  if (adminExists) return;

  const admin: User & { password: string } = {
    id: "admin_demo",
    email: "admin@tirazsystem.ir",
    phone: "09120000000",
    name: "مدیر سیستم",
    role: "admin",
    status: "active",
    createdAt: new Date().toISOString(),
    password: hashPassword("admin1234"),
  };
  users.push(admin);
  writeUsers(users);
}

// ===== آمار برای پنل ادمین =====

export interface UserStats {
  total: number;
  customers: number;
  admins: number;
  pending: number;
  byType: Record<CustomerType, number>;
}

export async function getUserStats(): Promise<UserStats> {
  const users = readUsers();
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

// ===== لیست همه کاربران (برای پنل ادمین) =====

export async function getAllUsers(): Promise<User[]> {
  const users = readUsers();
  return users.map(({ password: _password, ...rest }) => rest);
}
