import React from "react";
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

  // Glow links/buttons
  const linkClasses =
    "text-gray-700 dark:text-white px-2 py-1 rounded transition duration-300 hover:text-blue-500 hover:shadow-[0_0_10px_rgba(59,130,246,0.7)] text-lg sm:text-xl";

  return (
    <header className="border-b border-gray-200 bg-white">
      <nav className="flex justify-between items-center px-4 sm:px-6 py-3">
        {/* Brand */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-gray-800 hover:text-blue-600 transition"
        >
          DrishtiX
        </Link>

        {/* Nav actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {session?.user ? (
            <>
              <Link href="/project/create" className={linkClasses}>
                Create
              </Link>

              <form action={handleLogout}>
                <button type="submit" className={linkClasses}>
                  Logout
                </button>
              </form>

              <Link href={`/user/${session?.id}`} className={linkClasses}>
                {session.user?.name}
              </Link>
            </>
          ) : (
            <form action={handleLogin}>
              <button type="submit" className={linkClasses}>
                Login
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
