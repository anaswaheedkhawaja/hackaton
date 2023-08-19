import { getSession } from "next-auth/react";
import { useState } from "react";

export default function ProfilePage({ session }) {
  const [firstName, setFirstName] = useState(session.user.firstName);
  const [lastName, setLastName] = useState(session.user.lastName);
  const [profilePhoto, setProfilePhoto] = useState(session.user.profilePhoto);
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

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Update Your Profile
        </h2>
        <form className="space-y-4" onSubmit={handleFormSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label>Profile Photo:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">Update Profile</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
}
