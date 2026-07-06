"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface AboutValues {
  headline: string;
  bio: string;
  avatarUrl: string | null;
  skills: string | null;
}

export function AboutForm({ initial }: { initial: AboutValues }) {
  const router = useRouter();
  const [values, setValues] = useState<AboutValues>(initial);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/about", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    setSaving(false);
    if (res.ok) router.refresh();
    else alert("Failed to save.");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl">
      <div>
        <label className="mb-1 block text-sm text-neutral-400">Headline</label>
        <Input
          required
          value={values.headline}
          onChange={(e) => setValues((v) => ({ ...v, headline: e.target.value }))}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-neutral-400">Bio</label>
        <Textarea
          required
          rows={6}
          value={values.bio}
          onChange={(e) => setValues((v) => ({ ...v, bio: e.target.value }))}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-neutral-400">Avatar URL</label>
        <Input
          value={values.avatarUrl ?? ""}
          onChange={(e) => setValues((v) => ({ ...v, avatarUrl: e.target.value }))}
        />
      </div>
      <div>
        <label className="mb-1 block text-sm text-neutral-400">Skills (comma separated)</label>
        <Input
          value={values.skills ?? ""}
          onChange={(e) => setValues((v) => ({ ...v, skills: e.target.value }))}
        />
      </div>
      <Button type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save about"}
      </Button>
    </form>
  );
}
