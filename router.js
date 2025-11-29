import { connectDB } from "@/lib/db";

export async function POST(req) {
  const { id } = await req.json();

  const db = await connectDB();
  await db.execute("DELETE FROM users WHERE id=?", [id]);

  return new Response(
    JSON.stringify({ status: "success", message: "Account Deleted" }),
    { status: 200 }
  );
}
