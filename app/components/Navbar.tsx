"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function Navbar() {
  const { isSignedIn } = useUser();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Navigation Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              Expense Splitter
            </Link>
            
            {/* Navigation Links */}
            <div className="flex items-center gap-6">
              <Link 
                href="/" 
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Home
              </Link>
              <Link 
                href="/explore" 
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                Explore
              </Link>
              {isSignedIn && (
                <>
                  <Link 
                    href="/groups" 
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Create Group
                  </Link>
                  <Link 
                    href="/expense" 
                    className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    Add Expense
                  </Link>
                </>
              )}
            </div>
          </div>
          
          {/* Right side - User Button */}
          <div className="flex items-center">
            {isSignedIn && <UserButton afterSignOutUrl="/" />}
          </div>
        </div>
      </div>
    </nav>
  );
} 