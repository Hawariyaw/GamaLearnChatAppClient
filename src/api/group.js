import api from "../config/api";

export const getAllGroups = async () => {
  try {
    const res = await api.get("/Group/Groups");
    return res.json();
  } catch (error) {
    console.error(error);
  }
};

export const create = async (payload) => {
  try {
    const response = await api.post('/Group', payload);
    if (response.status === 201 || response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};
