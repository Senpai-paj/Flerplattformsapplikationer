export async function fetchDestinations(query, includeDetails = false) {
    const url = `/api/destinations?q=${encodeURIComponent(query)}${includeDetails ? '&details=true' : ''}`;
    const res = await fetch(url);
  
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Failed to fetch destinations: ${errorData.error || res.status}`);
    }
  
    const data = await res.json();
    return data;
  }
  
  
  // Will be implemented soon, details of a place
  export async function fetchDestinationsDetailed(query) {
    return fetchDestinations(query, true);
  }