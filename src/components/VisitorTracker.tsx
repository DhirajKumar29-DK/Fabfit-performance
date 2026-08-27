"use client";

import { useEffect } from 'react';

export function VisitorTracker() {
  useEffect(() => {
    if (!sessionStorage.getItem('hasVisited')) {
      fetch('http://localhost:5000/api/visitors/visit', { method: 'POST' })
        .then(() => sessionStorage.setItem('hasVisited', 'true'))
        .catch(err => console.error(err));
    }
  }, []);

  return null;
}
