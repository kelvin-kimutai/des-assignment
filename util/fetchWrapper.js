export const fetchWrapper = ({ endpoint, method, body }) => {
  return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
