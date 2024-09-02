import api from "../config/api";

export const signUp = async (payload) => {
  try {
    await api.post("/User/SignUp", payload);
    return true;
  } catch (error) {
    return false;
  }
};


export const signIn = async (payload) => {
   try {
      const res = await api.post("/User/Login", payload);
      return res.json();
    } catch (error) {
      console.error(error)
      return null;
    }
}

export const getAllUsers = async () => {
   try {
      const res = await api.get("/User/Users");
      return res.json();
    } catch (error) {
      console.error(error)
   }
}
