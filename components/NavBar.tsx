"use client"; // <- must be first line

import React, { useState } from "react";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";

async function handleLogin() {
  "use server";
  await signIn("github");
}

async function handleLogout() {
  "use server";
  await signOut({ redirectTo: "/" });
}

const NavBar = async () => {
  const session = await auth();
  const [menuOpen, setMenuOpen] = useState(false);

  const boxClasses =
    "text-2xl font-medium px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition shadow-md hover:shadow-blue-400/50";

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
          {session && session?.user ? (
            <>
              <Link href="/project/create" className={boxClasses}>
                Create
              </Link>

              <form action={handleLogout}>
                <button type="submit" className={boxClasses}>
                  Logout
                </button>
              </form>

              <Link href={`/user/${session?.id}`} className={boxClasses}>
                {session.user?.name}
              </Link>
            </>
          ) : (
            <form action={handleLogin}>
              <button type="submit" className={boxClasses}>
                Login
              </button>
            </form>
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

        {session && session?.user ? (
          <>
            <Link
              href="/project/create"
              className={boxClasses}
              onClick={() => setMenuOpen(false)}
            >
              Create
            </Link>

            <form action={handleLogout}>
              <button type="submit" className={boxClasses}>
                Logout
              </button>
            </form>

            <Link
              href={`/user/${session?.id}`}
              className={boxClasses}
              onClick={() => setMenuOpen(false)}
            >
              {session.user?.name}
            </Link>
          </>
        ) : (
          <form action={handleLogin}>
            <button type="submit" className={boxClasses}>
              Login
            </button>
          </form>
        )}
      </div>

      {/* Optional backdrop */}
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
