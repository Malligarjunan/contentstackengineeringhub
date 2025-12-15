import { getAllProductsDetailed } from "@/lib/contentstack";
import ProductsClient from "./ProductsClient";
import { Product } from "@/types/product";

// Force dynamic rendering - always fetch fresh content
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  // Fetch products with full details from Contentstack
  // Using separate function from homepage to avoid cache conflicts
  let products: Product[];
  try {
    products = await getAllProductsDetailed();
    console.log(`📋 Products page: Loaded ${products.length} products with full details`);
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  return <ProductsClient products={products} />;
}
