import { connectDB } from "@/lib/db";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      id,
      name,
      email,
      password,
      theme,
      email_alerts,
      task_updates,
      weekly_summary
    } = body;

    const db = await connectDB();

    let query = "";
    let values = [];

    if (password && password.trim() !== "") {
      query = `
        UPDATE users SET 
        name=?, email=?, password=?, theme=?, 
        email_alerts=?, task_updates=?, weekly_summary=? 
        WHERE id=?`;

      values = [
        name,
        email,
        password,
        theme,
        email_alerts,
        task_updates,
        weekly_summary,
        id,
      ];
    } else {
      query = `
        UPDATE users SET 
        name=?, email=?, theme=?,
        email_alerts=?, task_updates=?, weekly_summary=? 
        WHERE id=?`;

      values = [
        name,
        email,
        theme,
        email_alerts,
        task_updates,
        weekly_summary,
        id,
      ];
    }

    await db.execute(query, values);

    return new Response(
      JSON.stringify({ status: "success", message: "Settings Updated" }),
      { status: 200 }
    );

  } catch (error) {
    return new Response(
      JSON.stringify({ status: "error", message: error.message }),
      { status: 500 }
    );
  }
}
