import { getAllProducts } from "@/lib/contentstack";
import ProductsClient from "./ProductsClient";
import { Product } from "@/types/product";

// Enable ISR - revalidate every 5 seconds
export const revalidate = 5;

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
