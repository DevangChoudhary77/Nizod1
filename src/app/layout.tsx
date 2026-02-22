import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nizod.com"),
  title: {
    default: "Nizod | Premium IT Solutions & Software Development Agency",
    template: "%s | Nizod",
  },
  description:
    "Nizod is a premium IT Solutions Agency providing expert Website Development, App Development, UI/UX Design, Project Management, HR Management, and SEO services.",
  keywords: [
    "IT Solutions Agency",
    "Software Development",
    "Web Development",
    "App Development",
    "UI UX Design",
    "Project Management",
    "Nizod",
  ],
  authors: [{ name: "Nizod", url: "https://nizod.com" }],
  creator: "Nizod",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nizod.com",
    siteName: "Nizod",
    title: "Nizod | Premium IT Solutions & Software Development Agency",
    description:
      "We architect performant software solutions that empower forward-thinking brands to achieve measurable, scalable growth.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nizod — Premium IT Solutions Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nizod | Premium IT Solutions Agency",
    description:
      "Cutting-edge software solutions for forward-thinking businesses.",
    images: ["/og-image.png"],
    creator: "@nizod",
  },
  alternates: {
    canonical: "https://nizod.com",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Nizod",
  url: "https://nizod.com",
  logo: "https://nizod.com/favicon.ico",
  description:
    "Premium IT Solutions Agency providing Website Development, App Development, UI/UX Design, Project Management, and HR Management.",
  sameAs: [],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: "English",
  },
  areaServed: "Worldwide",
  serviceType: [
    "Website Development",
    "App Development",
    "UI/UX Design",
    "Project Management",
    "HR Management",
    "SEO & Marketing",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-slate-900 bg-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
