"use client";

import { useState, useEffect } from 'react';
import type { SavedLink } from "@/lib/types";

import { Header } from "@/components/header";
import { LinkForm } from "@/components/link-form";
import { LinkLibrary } from "@/components/link-library";
import { LibrarySkeleton } from "@/components/library-skeleton";
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const [links, setLinks] = useState<SavedLink[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const savedLinks = localStorage.getItem("saved-links");
      if (savedLinks) {
        setLinks(JSON.parse(savedLinks));
      }
    } catch (error) {
      console.error("Failed to parse links from localStorage", error);
      setLinks([]);
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem("saved-links", JSON.stringify(links));
    }
  }, [links, isClient]);

  const handleLinkAdded = (newLink: SavedLink) => {
    setLinks(prevLinks => [newLink, ...prevLinks]);
  };

  const handleDelete = (id: string) => {
    setLinks(prevLinks => prevLinks.filter(link => link.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      <main className="flex-grow py-8 px-4 sm:px-6 lg:px-8 space-y-12">
        <LinkForm onLinkAdded={handleLinkAdded} />
        <Separator />
        <h2 className="text-3xl font-bold text-center font-headline tracking-tight">Your Link Library</h2>
        {isClient ? <LinkLibrary links={links} onDelete={handleDelete} /> : <LibrarySkeleton />}
      </main>
      <footer className="text-center py-4 text-sm text-muted-foreground border-t">
        <p>LinkWise - Your smart video companion.</p>
      </footer>
    </div>
  );
}
