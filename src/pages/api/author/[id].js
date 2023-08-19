import React from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/header';

export default function AuthorPage() {
  const router = useRouter();
  const { id } = router.query;

  // Fetch author's profile and blogs based on the id parameter

  return (
    <div>
      <Header />
      {/* Display author's profile and blogs */}
    </div>
  );
}
