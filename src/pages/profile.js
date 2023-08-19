import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@/components/header";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Perform form validation and API request to update profile
    try {
      const response = await fetch("/api/update-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          firstName,
          lastName,
          profilePhoto,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Profile update was successful, provide user feedback
        console.log("Profile update successful");
      } else {
        // Profile update failed, provide user feedback
        console.error("Profile update failed");
      }
    } catch (error) {
      console.error("An error occurred during profile update:", error);
    }
  };

  useEffect(() => {
    if (!session) {
      // If the user is not authenticated, redirect them to the login page
      router.push("/auth/login");
    } else {
      // Initialize profile information if session is available
      setFirstName(session?.user?.firstName || "");
      setLastName(session?.user?.lastName || "");
      setProfilePhoto(session?.user?.profilePhoto || null);
    }
  }, [session, router]);

  if (!session) {
    return null; // Return null while redirecting
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* Display the user's profile picture */}
        <div className="text-center">
          <img
            src={profilePhoto || "/img/default-pic.png"}
            alt="Profile"
            className="mx-auto w-20 h-20 rounded-full mb-4"
          />
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Your Profile
        </h2>
        
        <form className="space-y-4" onSubmit={handleFormSubmit}>
                <>
                <div>
                <label>First Name:</label>
                  <div className="mt-2">
                    <input
                      id="first-name"
                      name="first-name"
                      value={firstName}
                      type="text"
                      onChange={(e) => setFirstName(e.target.value)}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      minLength="3"
                      maxLength="20"
                      pattern="[A-Za-z]+"
                      title="First name must contain only letters and be between 3 and 20 characters"
                    />
                  </div>
                </div>

                <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Last Name:</label>
                  <div className="mt-2">
                    <input
                      id="last-name"
                      name="last-name"
                      value={lastName}
                      type="text"
                      onChange={(e) => setLastName(e.target.value)}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      minLength="3"
                      maxLength="20"
                      pattern="[A-Za-z]+"
                      title="First name must contain only letters and be between 3 and 20 characters"
                    />
                  </div>
                </div>

                <div>
                <label>Profile Photo:</label>
                  <div className="mt-2">
                    <input
                      id="profilePhoto"
                      name="profilePhoto"
                      value={profilePhoto}
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfilePhoto(e.target.files[0])}
                    />
                  </div>
                </div>

                <div>
                <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  pattern="^(?=.*[a-z])(?=.*[A-Z]).{8,}$"
                  title="Password must be at least 8 characters long and include both uppercase and lowercase letters"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              </div>
          </>
          <div>
            <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >Update Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}
