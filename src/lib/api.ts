import axios from "axios";

export async function getUser(username: string) {
  try {
    const res = await axios.get(
      `${
        process.env.NODE_ENV === "production"
          ? "https://portly.netlify.app/"
          : "http://localhost:3000/"
      }api/profile/get-user?username=${username}`
    );
    return res.data;
  } catch (error) {
    return null;
  }
}
