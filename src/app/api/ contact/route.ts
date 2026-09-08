import { NextResponse } from "next/server";

type Payload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  // Validate again here — client-side checks can be bypassed
  if (!name || !email || !message || message.length < 10) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // TODO: send the email. Nothing is delivered until you add a provider.
  //
  // With Resend (npm i resend, RESEND_API_KEY in .env.local):
  //
  //   const resend = new Resend(process.env.RESEND_API_KEY);
  //   await resend.emails.send({
  //     from: "Portfolio <noreply@yourdomain.com>",
  //     to: "hello@abdulnawfal.com",
  //     replyTo: email,
  //     subject: `${body.subject ?? "Enquiry"} — ${name}`,
  //     text: message,
  //   });
  console.log("Contact form submission:", { name, email, subject: body.subject });

  return NextResponse.json({ ok: true });
}