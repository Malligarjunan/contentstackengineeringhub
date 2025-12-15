import Personalize from '@contentstack/personalize-edge-sdk';

export default async function handler(request, context) {
  const parsedUrl = new URL(request.url);

  // Set a custom edge API URL if configured
  if (context.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL) {
    Personalize.setEdgeApiUrl(context.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_EDGE_API_URL);
  }

  // Initialize the SDK and pass the request
  const personalizeSdk = await Personalize.init(
    context.env.NEXT_PUBLIC_CONTENTSTACK_PERSONALIZE_PROJECT_UID,
    {
      request,
    }
  );

  // Get the variant parameter from the SDK
  const variantParam = personalizeSdk.getVariantParam();
  
  // Set the variant parameter as a query param in the URL
  parsedUrl.searchParams.set(Personalize.VARIANT_QUERY_PARAM, variantParam);

  // Rewrite the request with the modified URL
  const modifiedRequest = new Request(parsedUrl.toString(), request);
  const response = await fetch(modifiedRequest);

  // Create a new response with the original response body
  const modifiedResponse = new Response(response.body, response);
  
  // Add cookies to the response for visitor identification
  await personalizeSdk.addStateToResponse(modifiedResponse);
  
  // Ensure that the response is not cached on the browser
  modifiedResponse.headers.set('cache-control', 'no-store');

  return modifiedResponse;
}

