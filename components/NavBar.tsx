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

  const boxClasses =
    "text-2xl font-medium px-4 py-2 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition";

  return (
    <header className="border-b border-gray-200">
      <nav className="flex justify-between items-center px-6 py-4">
        {/* Brand text */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight text-gray-800 hover:text-blue-600 transition"
        >
          DrishtiX
        </Link>

        {/* Nav actions */}
        <div className="flex items-center gap-4">
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
    </header>
  );
};

export default NavBar;
