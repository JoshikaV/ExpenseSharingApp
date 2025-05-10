'use client';

// Import necessary hooks and components
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SignInButton, SignUpButton, useUser } from "@clerk/nextjs";

export default function ExpenseSplitterLanding() {
  // Initialize router for navigation
  const router = useRouter();
  // State to handle loading animation during navigation
  const [isLoading, setIsLoading] = useState(false);
  // Get authentication state from Clerk
  const { isSignedIn } = useUser();
  
  // Handler for the "Get Started" button when user is authenticated
  const handleGetStarted = () => {
    if (!isSignedIn) {
      return;
    }
    
    // Show loading animation and navigate to group creation page
    setIsLoading(true);
    setTimeout(() => {
      router.push('/groups');
    }, 300);
  };

  return (
    // Main container with gradient background
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Main content wrapper with max width and padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* Hero section with main heading and description */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Split Expenses with Friends, <br />
            <span className="text-blue-600">Without the Hassle</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tired of keeping track of who paid for what? Our app makes splitting expenses with friends and groups effortless.
          </p>
        </div>

        {/* Main content grid - 4 columns on medium screens and up */}
        <div className="grid md:grid-cols-4 gap-6">
          {/* Feature cards section - spans 3 columns */}
          <div className="md:col-span-3 grid md:grid-cols-3 gap-4">
            {/* Feature Card 1: Save Time & Energy */}
            <div className="bg-white p-4 rounded-xl shadow-md text-center">
              <div className="text-blue-500 mb-3 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Save Time & Energy</h3>
              <p className="text-sm text-gray-600">No more manual calculations or spreadsheets. Let our app handle the math.</p>
            </div>

            {/* Feature Card 2: Perfect for Groups */}
            <div className="bg-white p-4 rounded-xl shadow-md text-center">
              <div className="text-blue-500 mb-3 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Perfect for Groups</h3>
              <p className="text-sm text-gray-600">Create groups for different occasions - roommates, trips, or regular hangouts.</p>
            </div>

            {/* Feature Card 3: Fair & Transparent */}
            <div className="bg-white p-4 rounded-xl shadow-md text-center">
              <div className="text-blue-500 mb-3 flex justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Fair & Transparent</h3>
              <p className="text-sm text-gray-600">Everyone can see who paid for what and who owes whom.</p>
            </div>
          </div>

          {/* Call-to-Action (CTA) Card - takes up 1 column */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* CTA Header with gradient background */}
            <div className="p-4 bg-gradient-to-r from-blue-500 to-indigo-500">
              <h1 className="text-base font-semibold text-white flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {isSignedIn ? 'Get Started' : 'Sign Up to Get Started'}
              </h1>
            </div>
            
            {/* CTA Content */}
            <div className="p-4 text-center">
              <div className="space-y-3">
                {/* CTA Description */}
                <div>
                  <h2 className="text-lg font-bold text-gray-900 mb-1">
                    Split expenses with friends
                  </h2>
                  <p className="text-sm text-gray-600">
                    {isSignedIn 
                      ? 'Create a group, add expenses, and settle up.'
                      : 'Sign up to create groups and start splitting expenses.'}
                  </p>
                </div>

                {/* Feature Highlights Grid */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex items-center justify-center gap-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs">Easy Groups</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs">Real-time</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs">Fair Split</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-xs">Track Payments</span>
                  </div>
                </div>
              </div>
              
              {/* Conditional rendering of buttons based on authentication state */}
              {isSignedIn ? (
                // Show "Get Started" button for authenticated users
                <button
                  onClick={handleGetStarted}
                  disabled={isLoading}
                  className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mt-3"
                >
                  {isLoading ? (
                    // Loading spinner animation
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    // Button content with arrow icon
                    <>
                      Get Started
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </>
                  )}
                </button>
              ) : (
                // Show Sign Up and Sign In buttons for unauthenticated users
                <div className="flex flex-col gap-2 mt-3">
                  {/* Sign Up button with Clerk modal */}
                  <SignUpButton mode="modal">
                    <button className="w-full py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-center rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
                      Sign Up Now
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </button>
                  </SignUpButton>
                  {/* Sign In button with Clerk modal */}
                  <SignInButton mode="modal">
                    <button className="w-full py-2 border border-gray-300 text-gray-700 text-center rounded-lg font-medium hover:bg-gray-50 transition duration-200">
                      Already have an account? Sign In
                    </button>
                  </SignInButton>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}