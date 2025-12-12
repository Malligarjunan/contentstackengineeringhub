import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

/**
 * On-Demand Revalidation API Route
 * This endpoint is called by Contentstack webhooks to revalidate pages when content is published
 */
export async function POST(request: NextRequest) {
  try {
    // Verify the secret token to prevent unauthorized revalidation
    const authHeader = request.headers.get('authorization');
    const secret = process.env.REVALIDATION_SECRET;

    if (!secret) {
      console.error('❌ REVALIDATION_SECRET not configured');
      return NextResponse.json(
        { message: 'Revalidation secret not configured' },
        { status: 500 }
      );
    }

    // Check if the authorization header matches the secret
    if (authHeader !== `Bearer ${secret}`) {
      console.error('❌ Unauthorized revalidation attempt');
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse the webhook payload
    const body = await request.json();
    
    console.log('📬 Received revalidation request:', {
      contentType: body.content_type_uid,
      event: body.event,
      entry: body.data?.uid
    });

    // Determine which paths to revalidate based on content type
    const pathsToRevalidate: string[] = [];

    if (body.content_type_uid === 'homepage') {
      // Revalidate homepage
      pathsToRevalidate.push('/');
      console.log('🏠 Revalidating homepage');
    } else if (body.content_type_uid === 'product') {
      // Revalidate products listing page
      pathsToRevalidate.push('/products');
      
      // If we have the entry slug, also revalidate the specific product page
      if (body.data?.slug) {
        pathsToRevalidate.push(`/products/${body.data.slug}`);
        console.log(`📦 Revalidating product: ${body.data.slug}`);
      }
      
      // Also revalidate homepage since it shows product stats
      pathsToRevalidate.push('/');
    }

    // Revalidate all determined paths
    for (const path of pathsToRevalidate) {
      await revalidatePath(path);
      console.log(`✅ Revalidated: ${path}`);
    }

    return NextResponse.json({
      revalidated: true,
      paths: pathsToRevalidate,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error during revalidation:', error);
    return NextResponse.json(
      {
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * GET endpoint for testing the revalidation API
 */
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  const secret = process.env.REVALIDATION_SECRET;

  if (!secret) {
    return NextResponse.json(
      { message: 'Revalidation secret not configured' },
      { status: 500 }
    );
  }

  if (authHeader !== `Bearer ${secret}`) {
    return NextResponse.json(
      { message: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    message: 'Revalidation API is working',
    timestamp: new Date().toISOString()
  });
}

