export async function handleResponse(response: Response, url: string) {
  if (!response.ok) {
    let errorBody;
    try {
      errorBody = await response.json(); // Get the actual error response
    } catch {
      errorBody = await response.text(); // Fallback to text
    }

    const errorMessage = `HTTP error in ${url}, status: ${response.status} - ${response.statusText}`;

    // Throw an error that includes the backend's response
    throw new Error(
      JSON.stringify({
        status: response.status,
        message: errorMessage,
        body: errorBody,
      })
    );
  }

  try {
    const jsonResponse = await response.json();
    console.log(`Response in handleResponse from ${url}: `, jsonResponse);
    return jsonResponse;
  } catch (error) {
    console.warn(`Failed to parse JSON from ${url}: `, error);
    return { error: response.text(), message: "Failed to parse JSON" };
  }
}
