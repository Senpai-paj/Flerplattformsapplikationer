export async function fetchUnsplashImages(query,pages) {
  const res = await fetch(`/api/unsplash?q=${query}&page=${pages}`);

  if (!res.ok) {
    console.log("Error status: " + res.status);
    throw new Error("Failed to fetch images from API route");
  }

  const data = await res.json();
  return data.results;
}