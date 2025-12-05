import urlBase from "./urlBase";

async function getToken(user: string, pass: string): Promise<string | boolean> {
  const response = await fetch(
    `${urlBase}/_sol/API/cliente-v2/api-login-token.php`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login: user, password: pass }),
    }
  );

  if (!response.ok) {
    return false;
  }

  const data = await response.json();
  return data.key;
}

export default getToken;
