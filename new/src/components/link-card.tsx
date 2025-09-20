"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink, CalendarDays } from "lucide-react";
import type { SavedLink } from "@/lib/types";
import { formatDistanceToNow } from 'date-fns';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type LinkCardProps = {
  link: SavedLink;
  onDelete: (id: string) => void;
};

const categoryVariants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
  Music: "default",
  Sports: "default",
  Education: "secondary",
  Movies: "secondary",
  News: "destructive",
  Gaming: "default",
  Entertainment: "secondary",
  Other: "outline",
};

export function LinkCard({ link, onDelete }: LinkCardProps) {
  return (
    <TooltipProvider>
      <Card className="flex flex-col h-full group overflow-hidden">
         <div className="relative w-full aspect-video overflow-hidden">
           <Image 
            src={link.thumbnailUrl || `https://picsum.photos/seed/${link.id}/600/400`}
            alt={`Thumbnail for ${link.title}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint="video thumbnail"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <CardHeader className="pt-4">
          <div className="flex justify-between items-start gap-4">
            <CardTitle className="font-heading text-lg break-words">{link.title}</CardTitle>
            <Badge variant={categoryVariants[link.category] || "outline"} className="shrink-0 capitalize text-nowrap">{link.category}</Badge>
          </div>
          <CardDescription className="break-all pt-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors truncate block">
                  {link.url}
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>{link.url}</p>
              </TooltipContent>
            </Tooltip>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground line-clamp-2">{link.description}</p>
        </CardContent>
        <CardFooter className="flex justify-between items-center text-sm text-muted-foreground bg-card/50 py-3 px-4 sm:px-6">
          <div className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            <span>{formatDistanceToNow(new Date(link.createdAt), { addSuffix: true })}</span>
          </div>
          <div className="flex gap-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label="Open link in new tab">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Open Link</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={() => onDelete(link.id)} aria-label="Delete link">
                  <Trash2 className="h-4 w-4 text-destructive/80 hover:text-destructive" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Delete Link</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </CardFooter>
      </Card>
    </TooltipProvider>
  );
}
