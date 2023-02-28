import { fetchWrapper } from "@/util/fetchWrapper";

export async function encryptMessage({ body }) {
  const response = await fetchWrapper({
    endpoint: `/encrypt`,
    method: "POST",
    body,
  });
  const decodedResponse = await response.json();
  if (response.ok) {
    return decodedResponse;
  }
  throw { code: response.status, message: decodedResponse.message };
}

export async function decryptMessage({ body }) {
  const response = await fetchWrapper({
    endpoint: `/decrypt`,
    method: "POST",
    body,
  });
  const decodedResponse = await response.json();
  if (response.ok) {
    return decodedResponse;
  }
  throw { code: response.status, message: "Failed to decrypt message" };
}
