"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function DeleteButton({ endpoint }: { endpoint: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    setLoading(true);
    const res = await fetch(endpoint, { method: "DELETE" });
    setLoading(false);
    if (res.ok) router.refresh();
    else alert("Failed to delete.");
  }

  return (
    <Button variant="danger" onClick={handleDelete} disabled={loading} type="button">
      {loading ? "Deleting…" : "Delete"}
    </Button>
  );
}
