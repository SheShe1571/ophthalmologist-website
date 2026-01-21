import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for demo (replace with database in production)
const submissions: Array<{
  id: string;
  name: string;
  phone: string;
  service: string;
  message: string;
  createdAt: string;
  ip: string;
}> = [];

// Rate limiting map
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// reCAPTCHA verification
async function verifyRecaptcha(token: string): Promise<boolean> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  
  if (!secretKey) {
    console.warn('reCAPTCHA secret key not configured');
    return true; // Skip verification if not configured
  }

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${secretKey}&response=${token}`,
    });

    const data = await response.json();
    return data.success && data.score >= 0.5;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

// Rate limiting check
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 3600000 }); // 1 hour window
    return true;
  }

  if (limit.count >= 5) { // Max 5 submissions per hour
    return false;
  }

  limit.count++;
  return true;
}

// Validate phone number
function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/[^0-9+]/g, '');
  return /^(\+?966|0)?5\d{8}$/.test(cleaned);
}

// Sanitize input
function sanitize(input: string): string {
  return input
    .trim()
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .slice(0, 1000); // Limit length
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || 
               request.headers.get('x-real-ip') || 
               'unknown';

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'تم تجاوز الحد المسموح من الطلبات. يرجى المحاولة لاحقاً.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { name, phone, service, message, recaptchaToken } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'الاسم ورقم الجوال مطلوبان' },
        { status: 400 }
      );
    }

    // Validate phone
    if (!isValidPhone(phone)) {
      return NextResponse.json(
        { error: 'رقم الجوال غير صحيح' },
        { status: 400 }
      );
    }

    // Verify reCAPTCHA if token provided
    if (recaptchaToken) {
      const isValidCaptcha = await verifyRecaptcha(recaptchaToken);
      if (!isValidCaptcha) {
        return NextResponse.json(
          { error: 'فشل التحقق من reCAPTCHA' },
          { status: 400 }
        );
      }
    }

    // Create submission
    const submission = {
      id: `sub_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: sanitize(name),
      phone: sanitize(phone),
      service: sanitize(service || ''),
      message: sanitize(message || ''),
      createdAt: new Date().toISOString(),
      ip,
    };

    // Store submission (replace with database in production)
    submissions.push(submission);

    // Here you would typically:
    // 1. Save to database (Sanity, MongoDB, etc.)
    // 2. Send notification email
    // 3. Send SMS/WhatsApp notification
    
    console.log('New submission:', submission);

    return NextResponse.json({
      success: true,
      message: 'تم استلام طلبك بنجاح. سنتواصل معك قريباً.',
      id: submission.id,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'حدث خطأ. يرجى المحاولة مرة أخرى.' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve submissions (protected - for admin use)
export async function GET(request: NextRequest) {
  // Check for admin authorization
  const authHeader = request.headers.get('authorization');
  const adminToken = process.env.ADMIN_API_TOKEN;

  if (!adminToken || authHeader !== `Bearer ${adminToken}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  // Get query parameters
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');

  if (format === 'csv') {
    // Generate CSV
    const headers = ['ID', 'Name', 'Phone', 'Service', 'Message', 'Created At'];
    const csvRows = [
      headers.join(','),
      ...submissions.map(s => [
        s.id,
        `"${s.name}"`,
        s.phone,
        `"${s.service}"`,
        `"${s.message.replace(/"/g, '""')}"`,
        s.createdAt,
      ].join(',')),
    ];

    return new NextResponse(csvRows.join('\n'), {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="submissions_${new Date().toISOString().split('T')[0]}.csv"`,
      },
    });
  }

  return NextResponse.json({
    submissions,
    total: submissions.length,
  });
}
