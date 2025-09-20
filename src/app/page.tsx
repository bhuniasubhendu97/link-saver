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
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-12">
        <LinkForm onLinkAdded={handleLinkAdded} />
        <Separator className="my-12" />
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-center font-heading tracking-tight">Your Link Library</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Browse, search, and manage your saved links. Your collection is stored locally in your browser.
          </p>
        </div>
        {isClient ? <LinkLibrary links={links} onDelete={handleDelete} /> : <LibrarySkeleton />}
      </main>
      <footer className="text-center py-6 text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} LinkWise - Your smart video companion.</p>
      </footer>
    </div>
  );
}
