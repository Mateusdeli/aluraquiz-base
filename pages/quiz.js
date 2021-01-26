import React from 'react';
import { useRouter } from 'next/router';

export default function Quiz() {
  const router = useRouter();
  return (
    <h1>{ router.query.name }</h1>
  );
}
