export async function handleResponse(response: Response, url: string) {
  if (!response.ok) {
    const errorMessage = `HTTP error in ${url}, status: ${response.status} - ${response.statusText}`;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }

  try {
    const jsonResponse = await response.json();
    console.log(`Response in handleResponse from ${url}: `, jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.warn(`Failed to parse JSON from ${url}: `, error);
    return { error: response.text(), message: "Failed to parse JSON" }; // Fallback to plain text
  }
}
