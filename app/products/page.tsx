import { getAllProductsDetailed } from "@/lib/contentstack";
import ProductsClient from "./ProductsClient";
import { Product } from "@/types/product";

// Force dynamic rendering - always fetch fresh content
export const dynamic = 'force-dynamic';

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams;
  
  // Fetch products with full details from Contentstack with Live Preview support
  // Using separate function from homepage to avoid cache conflicts
  let products: Product[];
  try {
    products = await getAllProductsDetailed(resolvedSearchParams);
    console.log(`📋 Products page: Loaded ${products.length} products with full details`);
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  return <ProductsClient products={products} />;
}
