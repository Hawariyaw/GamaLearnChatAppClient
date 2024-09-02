import api from "../config/api";

export const getPersonalMessages = async (roomName, fromUserName) => {
    try {
       const res = await api.get(`/Messages/${roomName}/${fromUserName}`);
       return res.json();
     } catch (error) {
       console.error(error)
    }
 }

 export const getGroupMessages = async (roomName) => {
    try {
       const res = await api.get(`/MessagesTo/${roomName}`);
       return res.json();
     } catch (error) {
       console.error(error)
    }
 }