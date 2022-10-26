export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://dani-store-server.herokuapp.com"
    : "http://localhost:4001";
