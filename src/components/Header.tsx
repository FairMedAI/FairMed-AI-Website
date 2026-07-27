"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { NAV, SITE } from "@/lib/data";
import { Sun, Moon, Menu, X } from "lucide-react";

export function Header() {
  const { theme, toggle } = useTheme();
  const pathname = usePathname();
  const isDark = theme === "dark";
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-50 border-b transition-colors duration-200"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="mx-auto max-w-[960px] px-5 md:px-8 h-[56px] flex items-center justify-between">
        <Link href="/" onClick={closeMobile} className="flex items-center gap-2">
          <img src="/images/fairmed_FM_clean_white.png" alt="" className="logo-light h-[24px] w-auto" />
          <img src="/images/fairmed_FM_clean.png" alt="" className="logo-dark h-[24px] w-auto" />
          <span className="text-[14px] font-semibold tracking-tight">{SITE.title}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-5">
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`text-[13px] transition-colors ${isActive(item.href) ? "font-medium" : "opacity-50 hover:opacity-100"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="w-[28px] h-[28px] flex items-center justify-center rounded-md transition-colors"
            style={{ color: "var(--muted)" }}
            aria-label="Toggle theme"
          >
            {isDark ? <Moon size={15} /> : <Sun size={15} />}
          </button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-[28px] h-[28px] flex items-center justify-center"
            style={{ color: "var(--muted)" }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t px-5 py-4" style={{ borderColor: "var(--border)" }}>
          {NAV.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={closeMobile}
              className={`block py-2 text-[14px] ${isActive(item.href) ? "font-medium" : "opacity-50"}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
