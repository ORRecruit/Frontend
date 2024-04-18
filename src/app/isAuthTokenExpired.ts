export const isAuthTokenExpired = (token: string) => {
  // Decode the token by splitting it and then base64 decoding the payload
  const payload = token?.split(".")[1];
  const decodedPayload = atob(payload?.replace(/-/g, "+").replace(/_/g, "/"));
  const jwtPayload = JSON.parse(decodedPayload);

  // Get the current time and expiration time from the token
  const currentTime = Math.floor(Date.now() / 1000);
  const expirationTime = jwtPayload.exp;

  // Check if the token is expired
  return currentTime > expirationTime;
};
