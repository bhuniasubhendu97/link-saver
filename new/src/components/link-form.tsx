"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Loader, AlertTriangle, Wand2, CheckCircle, Link2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { categorizeLinkAction } from "@/app/actions";
import type { CategorizationResult, SavedLink } from "@/lib/types";

const formSchema = z.object({
  url: z.string().trim().url({ message: "Please enter a valid URL." }),
});

type LinkFormProps = {
  onLinkAdded: (newLink: SavedLink) => void;
};

const CATEGORIES = ["Music", "Sports", "Education", "Movies", "News", "Gaming", "Entertainment", "Other"];

export function LinkForm({ onLinkAdded }: LinkFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categorizationResult, setCategorizationResult] = useState<CategorizationResult | null>(null);
  const [url, setUrl] = useState('');
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { url: "" },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    setCategorizationResult(null);
    setUrl(values.url);

    try {
      const result = await categorizeLinkAction(values.url);
      if (result.confidence >= 0.8) {
        const newLink: SavedLink = {
          id: crypto.randomUUID(),
          url: values.url,
          title: result.title,
          description: result.description,
          category: result.category,
          thumbnailUrl: result.thumbnailUrl,
          createdAt: new Date().toISOString(),
        };
        onLinkAdded(newLink);
        toast({
          description: (
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              <span>Link saved and categorized as {result.category}.</span>
            </div>
          ),
        });
        form.reset();
      } else {
        setCategorizationResult(result);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: error instanceof Error ? error.message : "There was a problem categorizing your link.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleManualCategorySelection = (category: string) => {
    if (!categorizationResult || !url) return;
    const newLink: SavedLink = {
        id: crypto.randomUUID(),
        url: url,
        title: categorizationResult.title,
        description: categorizationResult.description,
        category: category,
        thumbnailUrl: categorizationResult.thumbnailUrl,
        createdAt: new Date().toISOString(),
    };
    onLinkAdded(newLink);
    toast({
      description: (
        <div className="flex items-center gap-2">
          <CheckCircle className="text-green-500" />
          <span>Link saved and categorized as {category}.</span>
        </div>
      ),
    });
    setCategorizationResult(null);
    setUrl('');
    form.reset();
  };

  return (
    <>
      <Card className="w-full max-w-2xl mx-auto shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-heading">
            <Plus className="h-5 w-5" />
            Add New Link
          </CardTitle>
          <CardDescription>
            Paste a video link and we'll categorize it for you using AI.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-start flex-col sm:flex-row gap-4">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <div className="relative">
                        <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="https://www.youtube.com/watch?v=..." {...field} className="pl-10 h-11" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto h-11 shrink-0 bg-primary hover:bg-primary/90">
                {isSubmitting ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Add Link
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <Dialog open={!!categorizationResult} onOpenChange={() => setCategorizationResult(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="text-amber-500" />
              Confirm Category
            </DialogTitle>
            <DialogDescription>
              We're not quite sure about this one. Our AI suggested <span className="font-bold">{categorizationResult?.category}</span>, but please select the correct category to improve accuracy.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select onValueChange={handleManualCategorySelection} defaultValue={categorizationResult?.category}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
             <Button variant="outline" onClick={() => setCategorizationResult(null)}>Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
