import ProfilePage from "@/pages/profile";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header({firstName}) {
  const { data: session } = useSession(); // Retrieve the session using useSession
  const router = useRouter(); // Initialize the router using the useRouter hook

  const handleLogout = async () => {
    await signOut(); // Call the signOut function from next-auth
    router.push("/auth/login"); // Redirect after logout
  };

  return (
    <header>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <div className="flex items-center lg:order-2">
            <Link
              href="/"
              className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
            >
              Personal Blogging App
            </Link>
            {session ? ( // Display user-related links if session exists
              <>
                <button
                  onClick={handleLogout}
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log out
                </button>
                <Link href="/profile">
              <p className="text-gray-800 dark:text-white font-medium text-sm mr-2">
                Welcome, {firstName}
              </p>
              </Link>
              </>
            ) : ( // Display login link if session doesn't exist
              <Link
                href="/auth/login"
                className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
