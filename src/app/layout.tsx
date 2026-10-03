import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingCall } from "@/components/layout/FloatingCall";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { NavigationProgress } from "@/components/common/NavigationProgress";
import { ScrollProgressBar } from "@/components/common/ScrollProgressBar";
import { BackToTop } from "@/components/common/BackToTop";
import { SkipToContent } from "@/components/common/SkipToContent";
import { ToastProvider } from "@/components/common/Toast";
import { WishlistProvider } from "@/components/common/Wishlist";
import { CompareProvider } from "@/components/common/Compare";
import { CompareBar } from "@/components/common/CompareBar";
import { AuthProvider } from "@/lib/auth-context";
import MotionProvider from "@/components/motion/MotionProvider";
import "./globals.css";

const vazirmatn = localFont({
  src: [
    { path: "../../public/fonts/Vazirmatn-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Vazirmatn-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Vazirmatn-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/Vazirmatn-ExtraBold.woff2", weight: "800", style: "normal" },
  ],
  variable: "--font-vazirmatn",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const BASE_URL = "https://tiraz-system-eu.apps.frk1.abrhapaas.com";

export const metadata: Metadata = {
  title: {
    default: "تیرازیستر ایرانیان | تجهیزات پزشکی، آزمایشگاهی و صنعتی",
    template: "%s | تیرازیستر ایرانیان",
  },
  description:
    "تیرازیستر ایرانیان، تأمین‌کننده تخصصی تجهیزات پزشکی، آزمایشگاهی و صنعتی با کیفیت بالا، کاتالوگ کامل و خدمات پس از فروش در سراسر کشور.",
  authors: [{ name: "تیرازیستر ایرانیان" }],
  creator: "تیرازیستر ایرانیان",
  publisher: "تیرازیستر ایرانیان",
  applicationName: "تیرازیستر ایرانیان",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "تیرازیستر ایرانیان",
    url: BASE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
};

export const viewport: Viewport = {
  themeColor: "#0891b2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fa" dir="rtl" data-scroll-behavior="smooth" className={vazirmatn.variable}>
      <body id="top" className="min-h-screen flex flex-col antialiased bg-ink-50">
        <AuthProvider>
          <ToastProvider>
            <WishlistProvider>
              <CompareProvider>
                <MotionProvider>
                  <SkipToContent />
                  <Suspense fallback={null}>
                    <NavigationProgress />
                  </Suspense>
                  <ScrollProgressBar />
                  <ScrollToTop />
                  <Header />
                  <main id="main-content" className="flex-1 pb-16 sm:pb-0">
                    {children}
                  </main>
                  <Footer />
                  <FloatingCall />
                  <BackToTop />
                  <CompareBar />
                </MotionProvider>
              </CompareProvider>
            </WishlistProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
