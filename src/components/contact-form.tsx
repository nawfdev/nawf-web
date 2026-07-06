"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SocialLink {
  label: string;
  url: string;
}

export function ContactForm({
  initial,
}: {
  initial: { email: string | null; socialLinks: SocialLink[] };
}) {
  const router = useRouter();
  const [email, setEmail] = useState(initial.email ?? "");
  const [links, setLinks] = useState<SocialLink[]>(initial.socialLinks);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, socialLinks: JSON.stringify(links) }),
    });
    setSaving(false);
    if (res.ok) router.refresh();
    else alert("Failed to save.");
  }

  function updateLink(index: number, field: keyof SocialLink, value: string) {
    setLinks((prev) => prev.map((l, i) => (i === index ? { ...l, [field]: value } : l)));
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-2xl">
      <div>
        <label className="mb-1 block text-sm text-neutral-400">Contact email</label>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm text-neutral-400">Social links</label>
        {links.map((link, i) => (
          <div key={i} className="flex gap-2">
            <Input
              placeholder="Label"
              value={link.label}
              onChange={(e) => updateLink(i, "label", e.target.value)}
            />
            <Input
              placeholder="URL"
              value={link.url}
              onChange={(e) => updateLink(i, "url", e.target.value)}
            />
            <Button
              type="button"
              variant="ghost"
              onClick={() => setLinks((prev) => prev.filter((_, idx) => idx !== i))}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="secondary"
          onClick={() => setLinks((prev) => [...prev, { label: "", url: "" }])}
        >
          Add link
        </Button>
      </div>

      <Button type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save contact info"}
      </Button>
    </form>
  );
}
