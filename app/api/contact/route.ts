import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, projectType, budget, timeline, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the email content
    const emailContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Company: ${company || 'Not provided'}
Project Type: ${projectType || 'Not specified'}
Budget: ${budget || 'Not specified'}
Timeline: ${timeline || 'Not specified'}

Message:
${message}
    `.trim();

    // Send email to both addresses
    const { data, error } = await resend.emails.send({
      from: 'Studio MVP <noreply@studiomvp.co.uk>',
      to: ['support@studiomvp.co.uk', 'officialstudiomvp@gmail.com'],
      subject: `New Contact Form Submission from ${name}`,
      text: emailContent,
      reply_to: email,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, data },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
