// "use server";

export async function createUser(email, password) {
  const responce = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  const data = await responce.json();

  if (!responce.ok) {
    throw new Error(data.message || "Something went Wrong");
  }
  return data;
}

export async function getData() {
  const responce = await fetch("/api/auth", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await responce.json();
  return data;
}
