export const validateUsername = (
  input: string
): { error: string; sanitized: string } => {
  let username = input.trim();

  // Replace spaces with dashes first
  username = username.replace(/\s+/g, "-");

  if (username.length === 0) {
    return { error: "Username cannot be empty.", sanitized: "" };
  }

  return { error: "", sanitized: username };
};
