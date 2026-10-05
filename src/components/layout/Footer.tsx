import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ArrowUp } from "lucide-react";
import { Logo } from "./Logo";
import { CopyButton } from "@/components/common/CopyButton";

const quickLinks = [
  { label: "صفحه اصلی", href: "/" },
  { label: "درباره ما", href: "/about" },
  { label: "محصولات", href: "/products" },
  { label: "اخبار و مقالات", href: "/blog" },
  { label: "تماس با ما", href: "/contact" },
];

const categories = [
  { label: "تجهیزات پزشکی", href: "/products?category=medical" },
  { label: "محصولات آرایشی و بهداشتی", href: "/products?category=beauty" },
];

export function Footer() {
  return (
    <footer className="bg-brand-800 text-white mt-16">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <div>
            <Logo variant="light" size="md" />
            <p className="mt-4 text-sm text-white/70 leading-loose">
              تیرازیستر ایرانیان، تأمین‌کننده تخصصی تجهیزات پزشکی، آزمایشگاهی و
              صنعتی با کیفیت بالا، کاتالوگ کامل و خدمات پس از فروش در سراسر
              کشور.
            </p>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4 text-white">
              دسترسی سریع
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-accent-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4 text-white">
              دسته‌بندی محصولات
            </h3>
            <ul className="space-y-2.5">
              {categories.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 hover:text-accent-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-base font-bold mb-4 text-white">
              اطلاعات تماس
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2">
                <MapPin
                  className="w-4 h-4 mt-1 shrink-0 text-accent-400"
                  aria-hidden="true"
                />
                <span className="leading-relaxed">
                  تهران، خیابان نمونه، پلاک ۱۲، طبقه ۳
                </span>
              </li>
              <li className="flex items-center gap-1">
                <a
                  href="tel:+982112345678"
                  className="flex items-center gap-2 hover:text-accent-400 transition-colors flex-1 min-w-0"
                >
                  <Phone
                    className="w-4 h-4 shrink-0 text-accent-400"
                    aria-hidden="true"
                  />
                  <span className="num">۰۲۱-۱۲۳۴۵۶۷۸</span>
                </a>
                <CopyButton
                  text="02112345678"
                  label="شماره تماس"
                  toastMessage="شماره تماس کپی شد"
                  ariaLabel="کپی شماره تماس"
                />
              </li>
              <li className="flex items-center gap-1">
                <a
                  href="mailto:mohamadmehdi.neemati@gmail.com"
                  className="flex items-center gap-2 hover:text-accent-400 transition-colors flex-1 min-w-0"
                >
                  <Mail
                    className="w-4 h-4 shrink-0 text-accent-400"
                    aria-hidden="true"
                  />
                  <span className="truncate">mohamadmehdi.neemati@gmail.com</span>
                </a>
                <CopyButton
                  text="mohamadmehdi.neemati@gmail.com"
                  label="ایمیل"
                  toastMessage="ایمیل کپی شد"
                  ariaLabel="کپی ایمیل"
                />
              </li>
              <li className="flex items-start gap-2">
                <Clock
                  className="w-4 h-4 mt-1 shrink-0 text-accent-400"
                  aria-hidden="true"
                />
                <span className="leading-relaxed">
                  شنبه تا چهارشنبه، ۸:۰۰ تا ۱۷:۰۰
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/60 text-center sm:text-right num">
            © ۱۴۰۴ تیرازیستر ایرانیان — تمامی حقوق محفوظ است.
          </p>
          <a
            href="#top"
            aria-label="بازگشت به بالای صفحه"
            className="text-xs text-white/60 hover:text-accent-400 flex items-center gap-1.5 transition-colors"
          >
            <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
            بازگشت به بالا
          </a>
        </div>
      </div>
    </footer>
  );
}
