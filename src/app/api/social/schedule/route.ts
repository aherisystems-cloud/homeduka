import { NextRequest, NextResponse } from 'next/server';
import { dispatchToZohoSocial, FormattedSocialPost } from '../../../../utils/social_scheduler';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { post, businessId, scheduledTime } = body;

    if (!post || !businessId) {
      return NextResponse.json(
        { error: 'Missing post payload or businessId' },
        { status: 400 }
      );
    }

    const result = await dispatchToZohoSocial({
      post: post as FormattedSocialPost,
      businessId,
      scheduledTime
    });

    return NextResponse.json({
      success: result.success,
      scheduleId: result.scheduleId,
      message: 'Post queued for automatic social media publication via Zoho Social'
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Internal server error scheduling post' },
      { status: 500 }
    );
  }
}
