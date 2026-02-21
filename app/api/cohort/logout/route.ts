import { NextResponse } from "next/server";
import { COOKIE_NAMES } from "@/lib/cohort/constants";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete(COOKIE_NAMES.session);
  return response;
}
