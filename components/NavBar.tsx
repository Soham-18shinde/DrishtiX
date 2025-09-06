"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);

  // Fetch session on mount
  useEffect(() => {
    auth().then((s) => setSession(s));
  }, []);

  const boxClasses =
    "text-2xl font-medium px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition shadow-md hover:shadow-blue-400/50 text-center";

  const handleLogin = async () => {
    await signIn("github");
    const s = await auth();
    setSession(s);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await signOut({ redirectTo: "/" });
    setSession(null);
    setMenuOpen(false);
  };

  return (
    <header className="border-b border-gray-200 bg-white fixed w-full z-50">
      <nav className="flex justify-between items-center px-4 sm:px-6 py-3">
        {/* Brand */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-gray-800 hover:text-blue-600 transition"
        >
          DrishtiX
        </Link>

        {/* Hamburger (mobile) */}
        <button
          className="sm:hidden p-2 rounded-md hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
          <span className="block w-6 h-0.5 bg-gray-800"></span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex sm:items-center gap-4">
          {session?.user ? (
            <>
              <Link href="/project/create" className={boxClasses}>
                Create
              </Link>

              <button onClick={handleLogout} className={boxClasses}>
                Logout
              </button>

              <Link href={`/user/${session?.id}`} className={boxClasses}>
                {session.user?.name}
              </Link>
            </>
          ) : (
            <button onClick={handleLogin} className={boxClasses}>
              Login
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Sliding Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-40
          ${menuOpen ? "translate-x-0" : "translate-x-full"} sm:hidden flex flex-col p-6 gap-4`}
      >
        <button
          className="self-end text-gray-800 text-2xl"
          onClick={() => setMenuOpen(false)}
        >
          &times;
        </button>

        {session?.user ? (
          <>
            <Link
              href="/project/create"
              className={boxClasses}
              onClick={() => setMenuOpen(false)}
            >
              Create
            </Link>

            <button onClick={handleLogout} className={boxClasses}>
              Logout
            </button>

            <Link
              href={`/user/${session?.id}`}
              className={boxClasses}
              onClick={() => setMenuOpen(false)}
            >
              {session.user?.name}
            </Link>
          </>
        ) : (
          <button onClick={handleLogin} className={boxClasses}>
            Login
          </button>
        )}
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default NavBar;
