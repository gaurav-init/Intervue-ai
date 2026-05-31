'use client';
import React from 'react';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Features', href: '/dashboard/features' },
  { label: 'Pricing', href: '/dashboard/upgrade' },
  { label: 'About', href: '/dashboard/about' },
  { label: 'Contact', href: '/dashboard/contacts' },
];

const Header = () => {
  const path = usePathname();

  const NavLink = ({ href, label, onClick }) => {
    const active = path === href;
    return (
      <Link
        href={href}
        onClick={onClick}
        className="group relative py-1 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
      >
        <span className={active ? 'text-foreground' : ''}>{label}</span>
        <span
          className={`absolute -bottom-0.5 left-0 h-px bg-primary transition-all duration-300 ${
            active ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 md:px-10">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-2xl leading-none tracking-tight text-foreground">
            Intervue
          </span>
          <span className="text-sm font-bold uppercase tracking-[0.2em] text-primary">
            AI
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <SignedOut>
            <Link href="/sign-in" className="hidden sm:block">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link href="/sign-up" className="hidden sm:block">
              <Button size="sm">Start practicing</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>

          <Sheet>
            <SheetTrigger className="lg:hidden" aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <SheetContent className="bg-background">
              <SheetHeader>
                <SheetTitle className="font-display text-2xl">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-10 flex flex-col gap-5">
                {navItems.map((item) => (
                  <NavLink key={item.href} {...item} />
                ))}
                <div className="rule my-2" />
                <SignedOut>
                  <Link href="/sign-in">
                    <Button variant="outline" className="w-full">
                      Sign in
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="w-full">Start practicing</Button>
                  </Link>
                </SignedOut>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
