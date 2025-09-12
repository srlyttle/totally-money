"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {isDesktop && (
        <header className="border-b border-gray-200 mt-4 p-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-start  gap-4">
              <div className="flex-shrink-0">
                <Link
                  href="/credit-cards"
                  className="text-2xl font-bold text-indigo-900"
                >
                  TotallyMoney
                </Link>
              </div>

              <nav className="flex items-center space-x-8 pt-2 pl-2">
                <Link
                  href="/credit-cards"
                  className="text-indigo-900 hover:text-indigo-700 font-medium"
                >
                  Credit cards
                </Link>
              </nav>
            </div>
          </div>
        </header>
      )}

      {!isDesktop && (
        <header className="bg-white border-b border-indigo-900">
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              <button
                onClick={toggleMobileMenu}
                className="text-indigo-900 hover:text-indigo-700 p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              <Link
                href="/credit-cards"
                className="text-xl font-bold text-indigo-900"
              >
                TotallyMoney
              </Link>

              <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="bg-white border-t border-gray-200">
              <div className="px-4 py-2 space-y-1">
                <Link
                  href="/credit-cards"
                  className="block px-3 py-2 text-indigo-900 hover:bg-gray-50 rounded-md font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Credit Cards
                </Link>
              </div>
            </div>
          )}
        </header>
      )}
    </>
  );
};
