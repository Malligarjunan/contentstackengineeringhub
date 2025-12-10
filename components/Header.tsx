"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="text-2xl font-bold">
              <span className="text-[#6C5CE7]">Contentstack</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-gray-700 hover:text-[#6C5CE7] font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-[#6C5CE7] font-medium transition-colors"
            >
              Products
            </Link>
            <a 
              href="https://www.contentstack.com/docs" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-[#6C5CE7] font-medium transition-colors"
            >
              Documentation
            </a>
            <a 
              href="https://www.contentstack.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#6C5CE7] text-white px-4 py-2 rounded-lg hover:bg-[#5849d4] transition-colors"
            >
              Visit Contentstack
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#6C5CE7] focus:outline-none"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 hover:text-[#6C5CE7] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className="text-gray-700 hover:text-[#6C5CE7] font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <a 
                href="https://www.contentstack.com/docs" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-[#6C5CE7] font-medium"
              >
                Documentation
              </a>
              <a 
                href="https://www.contentstack.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#6C5CE7] text-white px-4 py-2 rounded-lg hover:bg-[#5849d4] transition-colors text-center"
              >
                Visit Contentstack
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

