import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    ok: true,
    gmailUser: Boolean(process.env.GMAIL_USER),
    gmailAppPassword: Boolean(process.env.GMAIL_APP_PASSWORD),
  });
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    if (body.company) return NextResponse.json({ ok: true });

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();
    const subject = String(body.subject ?? "").trim() || "Portfolio enquiry";

    if (!name || name.length > 100) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 });
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json({ error: "Invalid message" }, { status: 400 });
    }

    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    if (!user || !pass) {
      return NextResponse.json(
        { error: "Mail not configured - check .env.local" },
        { status: 500 },
      );
    }

    const nodemailer = (await import("nodemailer")).default;
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

    await transporter.sendMail({
      from: '"Portfolio" <' + user + '>',
      to: process.env.CONTACT_TO || user,
      replyTo: '"' + name + '" <' + email + '>',
      subject: subject + " - " + name,
      text: "From: " + name + " <" + email + ">\n\n" + message,
      html: "<p><strong>" + escapeHtml(name) + "</strong> &lt;" + escapeHtml(email) + "&gt;</p><p style=\"white-space:pre-wrap\">" + escapeHtml(message) + "</p>",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    console.error("[contact] failed:", error);
    return NextResponse.json({ error: detail }, { status: 500 });
  }
}
