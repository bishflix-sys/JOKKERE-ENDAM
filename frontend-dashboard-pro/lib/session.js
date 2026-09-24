const SESSION_VALUE = "authenticated";

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value) throw new Error("SESSION_SECRET is required");
  return value;
}

async function sign(value) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function createSessionValue() {
  return `${SESSION_VALUE}.${await sign(SESSION_VALUE)}`;
}

export async function isValidSession(value) {
  if (!value) return false;
  const [payload, signature] = value.split(".");
  if (payload !== SESSION_VALUE || !signature) return false;
  return signature === await sign(payload);
}
