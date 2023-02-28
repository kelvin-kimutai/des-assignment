import { fetchWrapper } from "@/util/fetchWrapper";

export async function encryptMessage({ body }) {
  const response = await fetchWrapper({
    endpoint: `/encrypt`,
    method: "POST",
    body,
  });
  if (response.ok) {
    const decodedResponse = await response.json();
    return decodedResponse;
  }
  throw { code: response.status, message: "Failed to encrypt message" };
}

export async function decryptMessage({ body }) {
  const response = await fetchWrapper({
    endpoint: `/decrypt`,
    method: "POST",
    body,
  });
  if (response.ok) {
    const decodedResponse = await response.json();
    return decodedResponse;
  }
  throw { code: response.status, message: "Failed to decrypt message" };
}
