import { auth } from "@/auth";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  return (auth as unknown as (req: NextRequest) => unknown)(request);
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
