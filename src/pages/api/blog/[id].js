import React from 'react';
import { useRouter } from 'next/router';
import Header from '../../components/header';

export default function BlogPage() {
  const router = useRouter();
  const { id } = router.query;

  // Fetch blog data based on the id parameter

  return (
    <div>
      <Header />
      {/* Display individual blog */}
    </div>
  );
}
