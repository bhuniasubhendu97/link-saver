"use client";

import { useState, useMemo } from "react";
import { LinkCard } from "./link-card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Inbox } from "lucide-react";
import type { SavedLink } from "@/lib/types";

const CATEGORIES = ["All", "Music", "Sports", "Education", "Movies", "News", "Gaming", "Entertainment", "Other"];

type LinkLibraryProps = {
  links: SavedLink[];
  onDelete: (id: string) => void;
};

export function LinkLibrary({ links, onDelete }: LinkLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredLinks = useMemo(() => {
    return links
      .filter((link) => {
        if (filterCategory === "All") return true;
        return link.category === filterCategory;
      })
      .filter((link) => {
        const search = searchTerm.toLowerCase();
        return (
          link.title.toLowerCase().includes(search) ||
          link.description.toLowerCase().includes(search) ||
          link.url.toLowerCase().includes(search)
        );
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [links, searchTerm, filterCategory]);

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input 
            placeholder="Search titles, descriptions, or URLs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-11"
            aria-label="Search links"
          />
        </div>
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-full md:w-[220px] h-11" aria-label="Filter by category">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            {CATEGORIES.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filteredLinks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in-50 duration-500">
          {filteredLinks.map((link) => (
            <LinkCard key={link.id} link={link} onDelete={onDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-4 border-2 border-dashed rounded-lg animate-in fade-in-0 duration-500">
          <Inbox className="mx-auto h-12 w-12 text-muted-foreground"/>
          <h3 className="mt-4 text-xl font-semibold text-foreground font-headline">No Links Found</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            {links.length > 0 ? "Try adjusting your search or filter." : "Get started by adding a new link above!"}
          </p>
        </div>
      )}
    </div>
  );
}
