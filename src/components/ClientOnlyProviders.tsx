"use client";

import { useState, useEffect } from "react";
import type { ReactNode } from "react";

interface ClientOnlyProps {
  children: ReactNode;
}

export function ClientOnlyProviders({ children }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null; // Or a loading spinner, or whatever you want to show during SSR
  }

  return <>{children}</>;
}
