import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { ArrowUp, Clock, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { CopyButton } from "@/components/common/CopyButton";
import EightPointStar from "@/components/ui/EightPointStar";

type FooterLink = { readonly label: string; readonly href: string };

const QUICK_LINKS: readonly FooterLink[] = [
  { label: "صفحه اصلی", href: "/" },
  { label: "درباره ما", href: "/about" },
  { label: "محصولات", href: "/products" },
  { label: "اخبار و مقالات", href: "/blog" },
  { label: "تماس با ما", href: "/contact" },
];

const CATEGORY_LINKS: readonly FooterLink[] = [
  { label: "تجهیزات پزشکی و بیمارستانی", href: "/products?category=medical" },
  {
    label: "دارو، آرایشی، بهداشتی و مواد اولیه دارویی",
    href: "/products?category=beauty",
  },
];

const CONTACT = {
  address: "تهران، خیابان نمونه، پلاک ۱۲، طبقه ۳",
  phones: [
    { display: "۰۹۹۶۳۸۰۲۹۵۷", raw: "09963802957" },
    { display: "۰۹۹۲۴۴۱۶۳۷۸", raw: "09924416378" },
  ],
  email: "mohamadmehdi.neemati@gmail.com",
  hours: "شنبه تا چهارشنبه، ۸:۰۰ تا ۱۷:۰۰",
} as const;

const FOCUS_RING =
  "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400";

const LINK_CLASS = `inline-block text-sm text-brand-100/80 transition-colors hover:text-gold-300 motion-reduce:transition-none ${FOCUS_RING}`;

function ColumnTitle({ children }: { readonly children: string }) {
  return (
    <div className="mb-5">
      <h2 className="font-serif text-lg font-bold text-white">{children}</h2>
      <span
        aria-hidden="true"
        className="mt-2 block h-px w-10 bg-gold-400/50"
      />
    </div>
  );
}

function LinkList({
  label,
  links,
}: {
  readonly label: string;
  readonly links: readonly FooterLink[];
}) {
  return (
    <nav aria-label={label}>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={LINK_CLASS}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function ContactItem({
  icon: Icon,
  label,
  children,
}: {
  readonly icon: LucideIcon;
  readonly label: string;
  readonly children: ReactNode;
}) {
  return (
    <li className="group flex items-start gap-3">
      <span className="motion-icon-rotate mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-white/5 text-gold-400">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        <p className="text-xs text-brand-100/60">{label}</p>
        <div className="mt-0.5 text-sm leading-7 text-brand-100">
          {children}
        </div>
      </div>
    </li>
  );
}

function Footer() {
  return (
    <footer
      aria-label="پاورقی سایت"
      className="relative overflow-hidden bg-brand-950 text-brand-100"
    >
      {/* ستاره تزئینی پس‌زمینه */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -start-32 text-gold-400/5"
      >
        <EightPointStar className="size-96 motion-rotate-slow" />
      </div>

      {/* خط تزئینی بالای Footer */}
      <div className="relative mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div aria-hidden="true" className="flex items-center gap-4">
          <span className="anim-line-grow h-px flex-1 bg-gold-400/20" />
          <EightPointStar className="size-5 text-gold-400" />
          <span className="anim-line-grow h-px flex-1 bg-gold-400/20" />
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* ستون لوگو */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-8 text-brand-100/70">
              تیرازیس طب ایرانیان؛ تأمین تجهیزات پزشکی، بیمارستانی، آزمایشگاهی
              و داروها، محصولات آرایشی-بهداشتی و مواد اولیه دارویی، با تکیه بر
              کیفیت، اصالت کالا و پشتیبانی تخصصی در سراسر کشور.
            </p>
          </div>

          {/* ستون دسترسی سریع */}
          <div className="lg:col-span-2">
            <ColumnTitle>دسترسی سریع</ColumnTitle>
            <LinkList label="دسترسی سریع" links={QUICK_LINKS} />
          </div>

          {/* ستون دسته‌بندی */}
          <div className="lg:col-span-3">
            <ColumnTitle>دسته‌بندی محصولات</ColumnTitle>
            <LinkList label="دسته‌بندی محصولات" links={CATEGORY_LINKS} />
          </div>

          {/* ستون تماس */}
          <div className="lg:col-span-3">
            <ColumnTitle>اطلاعات تماس</ColumnTitle>
            <ul className="space-y-5">
              <ContactItem icon={MapPin} label="آدرس">
                {CONTACT.address}
              </ContactItem>

              <ContactItem icon={Phone} label="تلفن‌ها">
                <div className="flex flex-col gap-2">
                  {CONTACT.phones.map((p, i) => (
                    <div key={i} className="flex flex-wrap items-center gap-2">
                      <a
                        href={`tel:${p.raw}`}
                        dir="ltr"
                        className={`inline-block tabular-nums transition-colors hover:text-gold-300 motion-reduce:transition-none ${FOCUS_RING}`}
                      >
                        {p.display}
                      </a>
                      <CopyButton
                        text={p.raw}
                        label={`کپی شماره ${i + 1}`}
                        toastMessage="شماره تلفن کپی شد!"
                        ariaLabel={`کپی کردن شماره تلفن ${i + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </ContactItem>

              <ContactItem icon={Mail} label="ایمیل">
                <div className="flex flex-wrap items-center gap-2">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    dir="ltr"
                    className={`inline-block break-all transition-colors hover:text-gold-300 motion-reduce:transition-none ${FOCUS_RING}`}
                  >
                    {CONTACT.email}
                  </a>
                  <CopyButton
                    text={CONTACT.email}
                    label="کپی ایمیل"
                    toastMessage="ایمیل کپی شد!"
                    ariaLabel="کپی کردن آدرس ایمیل"
                  />
                </div>
              </ContactItem>

              <ContactItem icon={Clock} label="ساعت کاری">
                {CONTACT.hours}
              </ContactItem>
            </ul>
          </div>
        </div>
      </div>

      {/* نوار پایین */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-center text-xs leading-7 text-brand-100/60 num">
            © ۱۴۰۴ تیرازیس طب ایرانیان. تمامی حقوق محفوظ است.
          </p>

          <a
            href="#top"
            className="group inline-flex items-center gap-2 rounded-full border border-gold-400/40 px-4 py-2 text-xs text-gold-300 transition hover:border-gold-400 hover:text-gold-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-400 motion-reduce:transition-none"
          >
            <span className="relative">بازگشت به بالا</span>
            <ArrowUp
              className="relative size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
export { Footer };