/**
 *
 * @param {*} key String
 * @param {*} value String
 * @param {*} ttl Number : in seconds
 */
export function setItem(key, value) {
  let _value;
  if (typeof value === "string") {
    _value = value;
  } else if (typeof value === "object") {
    _value = JSON.stringify(value);
  } else {
    throw new Error("value pass to setItem should be json or an object");
  }
  window.localStorage.setItem(key, _value);
}
export function removeItem(key) {
  window.localStorage.removeItem(key);
}
export function getItem(key) {
  return window.localStorage.getItem(key);
}
export function setItemWithExpire(key, value, ttl) {
  const date = new Date();
  const now = date.getTime();
  const expireIn = typeof ttl === "object" ? ttl.exact : now + ttl * 1000;
  window.localStorage.setItem(key, JSON.stringify({ value, expireIn }));
}
export function getItemWithExpire(key) {
  const date = new Date();
  const now = date.getTime();
  const data =
    (window.localStorage.getItem(key) &&
      JSON.parse(window.localStorage.getItem(key))) ||
    null;
  if (data && now < data.expireIn) {
    return data.value;
  } else {
    window.localStorage.removeItem(key);
    return null;
  }
}
export function deleteCredentialsCache() {
  //todo delete query client cache here      {queryclient.clearQuery(["user"])}
  removeItem("accessToken");
  removeItem("refreshToken");
  removeItem("user");
}
