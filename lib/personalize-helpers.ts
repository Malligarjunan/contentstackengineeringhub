import Personalize from '@contentstack/personalize-edge-sdk';

/**
 * Extract variant parameter from URL search params
 * This is used on the server side to fetch personalized content
 */
export function getVariantParamFromSearchParams(searchParams: { [key: string]: string | string[] | undefined }): string | null {
  const variantParam = searchParams[Personalize.VARIANT_QUERY_PARAM];
  
  if (typeof variantParam === 'string') {
    return decodeURIComponent(variantParam);
  }
  
  return null;
}

/**
 * Convert variant parameter to variant aliases for Contentstack SDK
 */
export function getVariantAliases(variantParam: string | null): string | null {
  if (!variantParam) {
    return null;
  }
  
  try {
    const aliases = Personalize.variantParamToVariantAliases(variantParam);
    return aliases.join(',');
  } catch (error) {
    console.error('❌ Error converting variant param to aliases:', error);
    return null;
  }
}

/**
 * Apply variant aliases to a Contentstack entry query
 */
export function applyVariantsToQuery(entryQuery: any, variantParam: string | null) {
  if (!variantParam) {
    return entryQuery;
  }
  
  const variantAliases = getVariantAliases(variantParam);
  
  if (variantAliases) {
    console.log('✅ Applying variant aliases:', variantAliases);
    return entryQuery.variants(variantAliases);
  }
  
  return entryQuery;
}

