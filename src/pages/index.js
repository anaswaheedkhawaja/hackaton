import Image from 'next/image'
import { Inter } from 'next/font/google'
import React from 'react';
import Header from '../components/header';
import Greeting from '../components/greeting';
import mockBlogs from '../data/mockBlogs';
import Link from 'next/link';


export default function HomePage() {
  return (
    <div>
      <Greeting /> {/* Display the greeting component */}

      {/* Container for the blogs */}
      <div className="container mx-auto mt-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {mockBlogs.map((blog) => (
          <div key={blog.id} className="bg-white p-4 rounded-lg shadow-md">
            {/* Blog title */}
            <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
            {/* Author and date */}
            <p className="text-gray-600 mb-2">
              By {blog.author}, Published on {blog.date}
            </p>
            {/* Blog content */}
            <p className="mb-2">{blog.content}</p>
            {/* Link to read more */}
            <Link href={`/blog/${blog.id}`}>
              <p className="text-blue-500">Read More</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
