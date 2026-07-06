"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface ProjectFormValues {
  id?: number;
  title: string;
  slug: string;
  description: string;
  image: string | null;
  url: string | null;
  repoUrl: string | null;
  tags: string | null;
  featured: boolean;
  sortOrder: number;
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProjectForm({ initial }: { initial?: ProjectFormValues }) {
  const router = useRouter();
  const [values, setValues] = useState<ProjectFormValues>(
    initial ?? {
      title: "",
      slug: "",
      description: "",
      image: "",
      url: "",
      repoUrl: "",
      tags: "",
      featured: false,
      sortOrder: 0,
    }
  );
  const [saving, setSaving] = useState(false);
  const [slugTouched, setSlugTouched] = useState(!!initial);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const endpoint = initial ? `/api/projects/${initial.id}` : "/api/projects";
    const method = initial ? "PUT" : "POST";

    const res = await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    setSaving(false);

    if (res.ok) {
      router.push("/dashboard/projects");
      router.refresh();
    } else {
      alert("Failed to save project.");
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
        <label className="mb-1 block text-sm text-neutral-400">Description</label>
        <Textarea
          required
          rows={4}
          value={values.description}
          onChange={(e) => setValues((v) => ({ ...v, description: e.target.value }))}
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-neutral-400">Image URL</label>
        <Input
          value={values.image ?? ""}
          onChange={(e) => setValues((v) => ({ ...v, image: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm text-neutral-400">Live URL</label>
          <Input
            value={values.url ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, url: e.target.value }))}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm text-neutral-400">Repo URL</label>
          <Input
            value={values.repoUrl ?? ""}
            onChange={(e) => setValues((v) => ({ ...v, repoUrl: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm text-neutral-400">Tags (comma separated)</label>
        <Input
          value={values.tags ?? ""}
          onChange={(e) => setValues((v) => ({ ...v, tags: e.target.value }))}
        />
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-neutral-300">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={(e) => setValues((v) => ({ ...v, featured: e.target.checked }))}
          />
          Featured
        </label>
        <div className="flex items-center gap-2">
          <label className="text-sm text-neutral-400">Sort order</label>
          <Input
            type="number"
            className="w-20"
            value={values.sortOrder}
            onChange={(e) => setValues((v) => ({ ...v, sortOrder: Number(e.target.value) }))}
          />
        </div>
      </div>

      <Button type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save project"}
      </Button>
    </form>
  );
}
