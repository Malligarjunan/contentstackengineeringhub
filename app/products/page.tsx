import { getAllProducts } from "@/lib/contentstack";
import ProductsClient from "./ProductsClient";

// Enable ISR - revalidate every hour
export const revalidate = 3600;

export default async function ProductsPage() {
  // Fetch products from Contentstack
  let products;
  try {
    products = await getAllProducts();
  } catch (error) {
    console.error('Error fetching products:', error);
    products = [];
  }

  return <ProductsClient products={products} />;
}
