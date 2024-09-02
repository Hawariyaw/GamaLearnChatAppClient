import api from "../config/api";

export const getAllGroups = async () => {
  try {
    const res = await api.get("/Group/Groups");
    return res.json();
  } catch (error) {
    console.error(error);
  }
};
