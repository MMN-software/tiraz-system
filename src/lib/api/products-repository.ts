// src/lib/api/products-repository.ts

import { products as staticProducts } from "@/lib/data/products";
import type {
  Product,
  CategorySlug,
  ProductBadge,
  ProductSpec,
} from "@/lib/types";

const CUSTOM_KEY = "tiraz_custom_products";
const OVERRIDES_KEY = "tiraz_product_overrides";
const DELETED_STATIC_KEY = "tiraz_deleted_products";
const TRASHED_CUSTOM_KEY = "tiraz_trashed_custom_products";
const PERMANENTLY_DELETED_KEY = "tiraz_permanently_deleted_static";

export interface ProductInput {
  name: string;
  slug: string;
  category: CategorySlug;
  code: string;
  brand: string;
  shortDesc: string;
  description: string;
  features: string[];
  specs: ProductSpec[];
  applications: string[];
  image?: string;
  badge: ProductBadge;
  featured: boolean;
}

export interface ProductWithSource extends Product {
  isCustom: boolean;
  isOverridden: boolean;
}

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!isBrowser()) return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore
  }
}

const readCustom = (): Product[] =>
  readJson<Product[]>(CUSTOM_KEY, []).filter(
    (p) => p && typeof p === "object"
  );

const writeCustom = (v: Product[]): void => writeJson(CUSTOM_KEY, v);

const readTrashedCustom = (): Product[] =>
  readJson<Product[]>(TRASHED_CUSTOM_KEY, []).filter(
    (p) => p && typeof p === "object"
  );

const writeTrashedCustom = (v: Product[]): void =>
  writeJson(TRASHED_CUSTOM_KEY, v);

const readOverrides = (): Record<number, Partial<Product>> =>
  readJson<Record<number, Partial<Product>>>(OVERRIDES_KEY, {});

const writeOverrides = (v: Record<number, Partial<Product>>): void =>
  writeJson(OVERRIDES_KEY, v);

const readDeletedStatic = (): number[] =>
  readJson<number[]>(DELETED_STATIC_KEY, []);

const writeDeletedStatic = (v: number[]): void =>
  writeJson(DELETED_STATIC_KEY, v);

const readPermanentlyDeleted = (): number[] =>
  readJson<number[]>(PERMANENTLY_DELETED_KEY, []);

const writePermanentlyDeleted = (v: number[]): void =>
  writeJson(PERMANENTLY_DELETED_KEY, v);

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-+/g, "-");
}

function generateId(custom: Product[], trashed: Product[]): number {
  const all = [...custom, ...trashed];
  if (all.length === 0) return 10000;
  const max = Math.max(...all.map((p) => p.id));
  return Math.max(10000, max + 1);
}

// ===== اصلی =====

export async function getAllProducts(): Promise<ProductWithSource[]> {
  const custom = readCustom();
  const overrides = readOverrides();
  const deletedStatic = readDeletedStatic();
  const permanentlyDeleted = readPermanentlyDeleted();

  const staticWithMeta: ProductWithSource[] = staticProducts
    .filter(
      (p) =>
        !deletedStatic.includes(p.id) &&
        !permanentlyDeleted.includes(p.id)
    )
    .map((p) => {
      const override = overrides[p.id];
      const merged: Product = override ? { ...p, ...override } : p;
      return {
        ...merged,
        isCustom: false,
        isOverridden: !!override,
      };
    });

  const customWithMeta: ProductWithSource[] = custom.map((p) => ({
    ...p,
    isCustom: true,
    isOverridden: false,
  }));

  return [...customWithMeta, ...staticWithMeta];
}

export async function getProductBySlug(
  slug: string
): Promise<ProductWithSource | null> {
  const all = await getAllProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getProductById(
  id: number
): Promise<ProductWithSource | null> {
  const all = await getAllProducts();
  return all.find((p) => p.id === id) ?? null;
}

export async function createProduct(
  input: ProductInput
): Promise<ProductWithSource> {
  const custom = readCustom();
  const trashed = readTrashedCustom();

  const allSlugs = [
    ...staticProducts.map((p) => p.slug),
    ...custom.map((p) => p.slug),
  ];
  let slug = slugify(input.slug || input.name);
  if (!slug) slug = `product-${Date.now()}`;
  if (allSlugs.includes(slug)) {
    slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
  }

  const newProduct: Product = {
    id: generateId(custom, trashed),
    slug,
    name: input.name.trim(),
    category: input.category,
    code: input.code.trim(),
    brand: input.brand.trim(),
    shortDesc: input.shortDesc.trim(),
    description: input.description.trim(),
    features: input.features.filter((f) => f.trim()),
    specs: input.specs.filter((s) => s.label.trim() && s.value.trim()),
    applications: input.applications.filter((a) => a.trim()),
    image: input.image?.trim() || undefined,
    badge: input.badge,
    featured: input.featured,
  };

  custom.push(newProduct);
  writeCustom(custom);
  return { ...newProduct, isCustom: true, isOverridden: false };
}

export async function updateProduct(
  id: number,
  input: ProductInput
): Promise<ProductWithSource | null> {
  const custom = readCustom();
  const customIndex = custom.findIndex((p) => p.id === id);

  if (customIndex !== -1) {
    const updated: Product = {
      ...custom[customIndex],
      name: input.name.trim(),
      slug: slugify(input.slug || input.name),
      category: input.category,
      code: input.code.trim(),
      brand: input.brand.trim(),
      shortDesc: input.shortDesc.trim(),
      description: input.description.trim(),
      features: input.features.filter((f) => f.trim()),
      specs: input.specs.filter((s) => s.label.trim() && s.value.trim()),
      applications: input.applications.filter((a) => a.trim()),
      image: input.image?.trim() || undefined,
      badge: input.badge,
      featured: input.featured,
    };
    custom[customIndex] = updated;
    writeCustom(custom);
    return { ...updated, isCustom: true, isOverridden: false };
  }

  const original = staticProducts.find((p) => p.id === id);
  if (!original) return null;

  const overrides = readOverrides();
  overrides[id] = {
    name: input.name.trim(),
    category: input.category,
    code: input.code.trim(),
    brand: input.brand.trim(),
    shortDesc: input.shortDesc.trim(),
    description: input.description.trim(),
    features: input.features.filter((f) => f.trim()),
    specs: input.specs.filter((s) => s.label.trim() && s.value.trim()),
    applications: input.applications.filter((a) => a.trim()),
    image: input.image?.trim() || undefined,
    badge: input.badge,
    featured: input.featured,
  };
  writeOverrides(overrides);

  return {
    ...original,
    ...overrides[id],
    isCustom: false,
    isOverridden: true,
  } as ProductWithSource;
}

/**
 * انتقال به سطل زباله (قابل بازگردانی)
 */
export async function deleteProduct(id: number): Promise<boolean> {
  const custom = readCustom();
  const customIndex = custom.findIndex((p) => p.id === id);

  if (customIndex !== -1) {
    const [removed] = custom.splice(customIndex, 1);
    writeCustom(custom);
    const trashed = readTrashedCustom();
    trashed.push(removed);
    writeTrashedCustom(trashed);
    return true;
  }

  const original = staticProducts.find((p) => p.id === id);
  if (!original) return false;

  const deleted = readDeletedStatic();
  if (!deleted.includes(id)) deleted.push(id);
  writeDeletedStatic(deleted);

  const overrides = readOverrides();
  if (overrides[id]) {
    delete overrides[id];
    writeOverrides(overrides);
  }
  return true;
}

/**
 * بازگردانی از سطل زباله
 */
export async function restoreProduct(id: number): Promise<boolean> {
  // چک سطل custom
  const trashed = readTrashedCustom();
  const tIdx = trashed.findIndex((p) => p.id === id);
  if (tIdx !== -1) {
    const [restored] = trashed.splice(tIdx, 1);
    writeTrashedCustom(trashed);
    const custom = readCustom();
    custom.push(restored);
    writeCustom(custom);
    return true;
  }

  // چک deleted static
  const deletedStatic = readDeletedStatic();
  const dIdx = deletedStatic.indexOf(id);
  if (dIdx !== -1) {
    deletedStatic.splice(dIdx, 1);
    writeDeletedStatic(deletedStatic);
    return true;
  }

  return false;
}

/**
 * حذف کامل و دائمی
 * - محصولات سفارشی: از سطل زباله کاملاً پاک می‌شن
 * - محصولات اصلی: از deleted_static برداشته و به permanently_deleted منتقل می‌شن
 */
export async function purgeProduct(id: number): Promise<boolean> {
  // چک سطل custom
  const trashed = readTrashedCustom();
  const tIdx = trashed.findIndex((p) => p.id === id);
  if (tIdx !== -1) {
    trashed.splice(tIdx, 1);
    writeTrashedCustom(trashed);
    return true;
  }

  // چک deleted static → منتقل به permanently deleted
  const deletedStatic = readDeletedStatic();
  const dIdx = deletedStatic.indexOf(id);
  if (dIdx !== -1) {
    deletedStatic.splice(dIdx, 1);
    writeDeletedStatic(deletedStatic);

    const permanentlyDeleted = readPermanentlyDeleted();
    if (!permanentlyDeleted.includes(id)) {
      permanentlyDeleted.push(id);
      writePermanentlyDeleted(permanentlyDeleted);
    }
    return true;
  }

  return false;
}

/**
 * بازگردانی محصول اصلی که کاملاً حذف شده (permanently deleted)
 */
export async function restorePermanentlyDeleted(
  id: number
): Promise<boolean> {
  const permanentlyDeleted = readPermanentlyDeleted();
  const idx = permanentlyDeleted.indexOf(id);
  if (idx === -1) return false;
  permanentlyDeleted.splice(idx, 1);
  writePermanentlyDeleted(permanentlyDeleted);
  return true;
}

/**
 * خالی کردن کل سطل زباله
 * - محصولات سفارشی به permanently_deleted نمی‌رن (چون دیگه نیستن)
 * - محصولات static به permanently_deleted منتقل می‌شن
 */
export async function emptyTrash(): Promise<void> {
  writeTrashedCustom([]);

  const deletedStatic = readDeletedStatic();
  const permanentlyDeleted = readPermanentlyDeleted();
  const merged = Array.from(
    new Set([...permanentlyDeleted, ...deletedStatic])
  );
  writePermanentlyDeleted(merged);
  writeDeletedStatic([]);
}

export interface TrashItem {
  id: number;
  name: string;
  code: string;
  brand: string;
  isCustom: boolean;
}

export async function getTrashItems(): Promise<TrashItem[]> {
  const deletedStatic = readDeletedStatic();
  const trashedCustom = readTrashedCustom();

  const staticItems: TrashItem[] = staticProducts
    .filter((p) => deletedStatic.includes(p.id))
    .map((p) => ({
      id: p.id,
      name: p.name,
      code: p.code,
      brand: p.brand,
      isCustom: false,
    }));

  const customItems: TrashItem[] = trashedCustom.map((p) => ({
    id: p.id,
    name: p.name,
    code: p.code,
    brand: p.brand,
    isCustom: true,
  }));

  return [...customItems, ...staticItems];
}

/**
 * لیست محصولات اصلی که کاملاً حذف شده‌اند (برای بازگردانی)
 */
export async function getPermanentlyDeletedItems(): Promise<TrashItem[]> {
  const permanentlyDeleted = readPermanentlyDeleted();
  return staticProducts
    .filter((p) => permanentlyDeleted.includes(p.id))
    .map((p) => ({
      id: p.id,
      name: p.name,
      code: p.code,
      brand: p.brand,
      isCustom: false,
    }));
}

export interface ProductStats {
  total: number;
  custom: number;
  overridden: number;
  featured: number;
  deleted: number;
  byCategory: Record<CategorySlug, number>;
}

export async function getProductStats(): Promise<ProductStats> {
  const all = await getAllProducts();
  const byCategory: Record<CategorySlug, number> = {
    medical: 0,
    lab: 0,
    industrial: 0,
    parts: 0,
    imported: 0,
    consumables: 0,
  };
  all.forEach((p) => {
    byCategory[p.category] = (byCategory[p.category] || 0) + 1;
  });

  const deletedStatic = readDeletedStatic();
  const trashedCustom = readTrashedCustom();

  return {
    total: all.length,
    custom: all.filter((p) => p.isCustom).length,
    overridden: all.filter((p) => p.isOverridden).length,
    featured: all.filter((p) => p.featured).length,
    deleted: deletedStatic.length + trashedCustom.length,
    byCategory,
  };
}

export async function resetCustomizations(): Promise<void> {
  if (!isBrowser()) return;
  localStorage.removeItem(CUSTOM_KEY);
  localStorage.removeItem(OVERRIDES_KEY);
  localStorage.removeItem(DELETED_STATIC_KEY);
  localStorage.removeItem(TRASHED_CUSTOM_KEY);
  localStorage.removeItem(PERMANENTLY_DELETED_KEY);
}
