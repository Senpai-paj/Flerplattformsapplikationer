export async function fetchUnsplashImages(query) {
    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
  
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`
    );
  
    if (!res.ok) {
      console.log("Error status: " + res.status)
      throw new Error('Failed to fetch images from Unsplash');
    }
  
    const data = await res.json();
    return data.results;
  }