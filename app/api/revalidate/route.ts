import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { getAllProductSlugs } from '@/lib/contentstack';

/**
 * On-Demand Revalidation API for Product Pages
 * 
 * This API endpoint triggers on-demand revalidation for product detail pages.
 * Based on Next.js ISR documentation: https://nextjs.org/docs/pages/guides/incremental-static-regeneration
 * 
 * Usage:
 * - Revalidate ALL products: GET /api/revalidate (no parameters)
 * 
 * Example:
 * - /api/revalidate
 * 
 * This will revalidate all product pages by fetching all slugs from Contentstack
 * and triggering revalidation for each product page.
 */
export async function GET(request: NextRequest) {
  try {
    console.log('🔄 Starting revalidation for all product pages...');
    
    // Extract search params from the request URL for Live Preview support
    const { searchParams } = new URL(request.url);
    const searchParamsObj: { [key: string]: string | string[] | undefined } = {};
    searchParams.forEach((value, key) => {
      searchParamsObj[key] = value;
    });
    
    // Fetch all product slugs from Contentstack (with Live Preview support)
    const slugs = await getAllProductSlugs(searchParamsObj);
    
    console.log(`📋 Found ${slugs.length} product slugs`);
    
    // Revalidate each product page
    const revalidatedPaths: string[] = [];
    for (const slug of slugs) {
      const productPath = `/products/${slug}`;
      console.log(`  ✓ Revalidating: ${productPath}`);
      revalidatePath(productPath);
      revalidatedPaths.push(productPath);
    }
    
    // Also revalidate the products listing page
    console.log(`  ✓ Revalidating: /products`);
    revalidatePath('/products');
    revalidatedPaths.push('/products');
    
    console.log(`✅ Successfully revalidated ${revalidatedPaths.length} pages`);
    
    return NextResponse.json({
      revalidated: true,
      count: revalidatedPaths.length,
      productCount: slugs.length,
      paths: revalidatedPaths,
      message: `Successfully revalidated ${slugs.length} product pages and the products listing page`,
      timestamp: new Date().toISOString(),
    });

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


