import { getAllProducts } from "@/lib/contentstack";
import ProductsClient from "./ProductsClient";
import { Product } from "@/types/product";

// Force dynamic rendering - fetch fresh content on every request
export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  // Fetch products from Contentstack
  let products: Product[];
  try {
    products = await getAllProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  return <ProductsClient products={products} />;
}
