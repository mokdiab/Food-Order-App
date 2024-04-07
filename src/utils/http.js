export async function httpRequestFetch(url, config) {
  try {
    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) {
      throw new Error(
        data.message || "Something went wrong, Failed to send request"
      );
    }
    return data;
  } catch (err) {
    throw err;
  }
}
