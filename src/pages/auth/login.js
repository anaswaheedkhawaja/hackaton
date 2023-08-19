import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router"; // Import the useRouter hook
import Form from "@/components/auth/form"; // Make sure to import the correct path

export default function SignIn() {
  const router = useRouter(); // Initialize the useRouter hook

  const onSubmit = async (email, password) => {
    try {
      const result = await signIn("credentials", {
        redirect: false, // Prevent automatic redirection
        email,
        password,
      });

      if (result?.error) {
        console.error("Authentication error:", result.error);
      } else {
        // Authentication succeeded
        console.log("Authentication successful!");

        // Redirect the user to the profile page
        router.push("/profile");
      }
    } catch (error) {
      console.error("An error occurred during authentication:", error);
    }
  };

  return <Form signin={true} onFormSubmit={onSubmit} />;
}
