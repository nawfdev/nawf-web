"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface PostFormValues {
  id?: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  published: boolean;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function PostForm({ initial }: { initial?: PostFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<PostFormValues>(
    initial ?? {
      title: "",
      slug: "",
      excerpt: "",
      content: "",
      coverImage: "",
      published: false,
    }
  );
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!!initial);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const endpoint = initial ? `/api/posts/${initial.id}` : "/api/posts";
    const method = initial ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    setSaving(false);

    if (res.ok) {
      router.push("/dashboard/posts");
      router.refresh();
    } else {
      alert("Failed to save post.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl">
      <div>
        <label className="mb-1 block text-sm text-neutral-400">Title</label>
        <Input
          required
          value={values.title}
          onChange={(e) => {
            const title = e.target.value;
            setValues((v) => ({
              ...v,
              title,
              slug: slugTouched ? v.slug : slugify(title),
            }));
          }}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-neutral-400">Slug</label>
        <Input
          required
          value={values.slug}
          onChange={(e) => {
            setSlugTouched(true);
            setValues((v) => ({ ...v, slug: e.target.value }));
          }}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-neutral-400">Excerpt</label>
        <Textarea
          rows={2}
          value={values.excerpt ?? ""}
          onChange={(e) => setValues((v) => ({ ...v, excerpt: e.target.value }))}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-neutral-400">Cover image URL</label>
        <Input
          value={values.coverImage ?? ""}
          onChange={(e) => setValues((v) => ({ ...v, coverImage: e.target.value }))}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-neutral-400">Content (Markdown)</label>
        <Textarea
          required
          rows={16}
          className="font-mono"
          value={values.content}
          onChange={(e) => setValues((v) => ({ ...v, content: e.target.value }))}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-neutral-300">
        <input
          type="checkbox"
          checked={values.published}
          onChange={(e) => setValues((v) => ({ ...v, published: e.target.checked }))}
        />
        Published
      </label>

      <Button type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save post"}
      </Button>
    </form>
  );
}
