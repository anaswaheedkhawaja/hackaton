import React from 'react';

export default function Greeting() {
  const currentTime = new Date();
  const hours = currentTime.getHours();

  let greeting;

  if (hours < 12) {
    greeting = 'Good morning';
  } else if (hours < 18) {
    greeting = 'Good afternoon';
  } else {
    greeting = 'Good evening';
  }

  return <p>{greeting}, User!</p>;
}
