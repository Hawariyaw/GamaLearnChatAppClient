import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

// config
import { BASE_URL } from "../config/config";

export const signal = {
  connection: null,
  init: async function (joinedListener, receivedListener) {
    try {
      // Create a connection to the chat hub
      this.connection = new HubConnectionBuilder()
        .withUrl(`${BASE_URL}/chat`)
        .configureLogging(LogLevel.Information)
        .build();

      // Set up handler
      this.connection.on("JoinSpecificChatRoom", joinedListener);

      this.connection.on("ReceiveSpecificChatRoom", receivedListener);

      await this.connection.start();
    } catch (error) {
      console.error(error);
    }
  },
  joinChatRoom: async function (fromUserName, toUserName) {
    try {
      // Invoke the JoinSpecificChatRoom method with the object
      await this.connection.invoke("JoinSpecificChatRoom", {
        UserName: fromUserName,
        ChatRoom: toUserName,
      });
    } catch (error) {
      console.log("Join Error", error);
    }
  },
  sendMessage: async function (userName, message, chatRoom, isPrivate = true) {
    try {
      // Create a Message object
      await this.connection.invoke("SendMessage", {
        UserName: userName,
        ChatRoom: chatRoom,
        Content: message,
        IsPrivate: isPrivate,
      });
    } catch (error) {
      console.log("Send Error", error);
    }
  },
};
