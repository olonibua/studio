import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, projectType, projectDescription, estimatedBudget } = body;

    if (!name || !email || !phone || !projectType || !projectDescription) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const emailContent = `
New Pay Small Small Inquiry

Name: ${name}
Email: ${email}
Phone/WhatsApp: ${phone}
Project Type: ${projectType}
Estimated Budget: ${estimatedBudget || 'Not specified'}

Project Description:
${projectDescription}
    `.trim();

    const { data, error } = await resend.emails.send({
      from: 'Studio MVP <noreply@studiomvp.co.uk>',
      to: ['officialstudiomvp@gmail.com'],
      subject: `New Pay Small Small Inquiry from ${name}`,
      text: emailContent,
      replyTo: email,
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
