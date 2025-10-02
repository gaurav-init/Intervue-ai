import type { Metadata } from "next";
import { Hanken_Grotesk, Hedvig_Letters_Serif } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

const hanken = Hanken_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const hedvig = Hedvig_Letters_Serif({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Intervue AI — Practice that feels like the real room",
  description:
    "An AI mock-interview coach for job seekers. Build a role-specific interview, answer on camera, and get exacting feedback. Walk in ready.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorPrimary: "#c0601a",
          colorText: "#26211c",
          colorBackground: "#fbf8f3",
          fontFamily: "var(--font-sans)",
          borderRadius: "0.4rem",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${hanken.variable} ${hedvig.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            forcedTheme="light"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: "#26211c",
                  color: "#f6f1e9",
                  borderRadius: "0.4rem",
                  fontSize: "0.875rem",
                },
              }}
            />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
