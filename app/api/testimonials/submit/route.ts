import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, title, company, email, testimonial, projectType, rating, results } = body;

    // Validate required fields
    if (!name || !title || !company || !testimonial || !rating) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate rating is between 1-5
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Format star rating
    const starRating = '⭐'.repeat(rating);

    // Format the email content
    const emailContent = `
New Testimonial Submission

${starRating} ${rating}/5 Stars

Client Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${name}
Title: ${title}
Company: ${company}
Email: ${email || 'Not provided'}

Project Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Project Type: ${projectType || 'Not specified'}
Results: ${results || 'Not specified'}

Testimonial:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${testimonial}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Submitted: ${new Date().toLocaleString('en-GB', {
  dateStyle: 'full',
  timeStyle: 'short',
  timeZone: 'Europe/London'
})}
    `.trim();

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: 'Studio MVP <noreply@studiomvp.co.uk>',
      to: ['support@studiomvp.co.uk', 'officialstudiomvp@gmail.com'],
      subject: `New Testimonial from ${name} (${company}) - ${starRating}`,
      text: emailContent,
      replyTo: email || undefined,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send notification' },
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
