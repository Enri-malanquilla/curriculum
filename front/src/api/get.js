export async function get(
  url,
  funcion,
  onError = (response) => {
    console.error(
      'Error de petición!!!!',
      response.status,
      response.statusText
    );
  },
  onConnectionError = (msg) => {
    console.error('Error de conexión', msg);
  }
) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const body = await response.json();
      funcion(body);
    } else {
      onError(response);
    }
  } catch (msg) {
    onConnectionError(msg);
  }
}
