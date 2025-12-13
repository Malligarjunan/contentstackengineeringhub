import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

/**
 * On-Demand Revalidation API for Product Pages
 * 
 * This API endpoint triggers on-demand revalidation for product detail pages.
 * Based on Next.js ISR documentation: https://nextjs.org/docs/pages/guides/incremental-static-regeneration
 * 
 * Usage:
 * - Revalidate specific product: GET /api/revalidate?slug=product-slug
 * - Revalidate all products: GET /api/revalidate?path=/products
 * - Revalidate homepage: GET /api/revalidate?path=/
 * 
 * Examples:
 * - /api/revalidate?slug=cda
 * - /api/revalidate?slug=automation
 * - /api/revalidate?path=/products
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');
    const path = searchParams.get('path');

    // If slug is provided, revalidate specific product page
    if (slug) {
      const productPath = `/products/${slug}`;
      
      console.log(`🔄 Revalidating product page: ${productPath}`);
      revalidatePath(productPath);
      
      return NextResponse.json({
        revalidated: true,
        path: productPath,
        message: `Successfully revalidated ${productPath}`,
        timestamp: new Date().toISOString(),
      });
    }

    // If path is provided, revalidate that path
    if (path) {
      console.log(`🔄 Revalidating path: ${path}`);
      revalidatePath(path);
      
      return NextResponse.json({
        revalidated: true,
        path: path,
        message: `Successfully revalidated ${path}`,
        timestamp: new Date().toISOString(),
      });
    }

    // If neither slug nor path is provided, return error
    return NextResponse.json(
      {
        revalidated: false,
        error: 'Missing required parameter',
        message: 'Please provide either "slug" or "path" query parameter',
        examples: [
          '/api/revalidate?slug=cda',
          '/api/revalidate?path=/products',
        ],
      },
      { status: 400 }
    );

  } catch (error) {
    console.error('❌ Error revalidating:', error);
    
    return NextResponse.json(
      {
        revalidated: false,
        error: 'Error revalidating',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * POST method for revalidation (optional)
 * Allows revalidation via POST requests with JSON body
 * 
 * Body format:
 * {
 *   "slug": "product-slug"
 * }
 * or
 * {
 *   "path": "/products"
 * }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug, path } = body;

    // If slug is provided, revalidate specific product page
    if (slug) {
      const productPath = `/products/${slug}`;
      
      console.log(`🔄 Revalidating product page: ${productPath}`);
      revalidatePath(productPath);
      
      return NextResponse.json({
        revalidated: true,
        path: productPath,
        message: `Successfully revalidated ${productPath}`,
        timestamp: new Date().toISOString(),
      });
    }

    // If path is provided, revalidate that path
    if (path) {
      console.log(`🔄 Revalidating path: ${path}`);
      revalidatePath(path);
      
      return NextResponse.json({
        revalidated: true,
        path: path,
        message: `Successfully revalidated ${path}`,
        timestamp: new Date().toISOString(),
      });
    }

    // If neither slug nor path is provided, return error
    return NextResponse.json(
      {
        revalidated: false,
        error: 'Missing required parameter',
        message: 'Please provide either "slug" or "path" in request body',
      },
      { status: 400 }
    );

  } catch (error) {
    console.error('❌ Error revalidating:', error);
    
    return NextResponse.json(
      {
        revalidated: false,
        error: 'Error revalidating',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

