import React, { useState } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// components
import WaitingRoom from '../components/waitingroom';
import ChatRoom from '../components/chatroom';

function Home() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);
  

  const joinChatRoom = async (userName, chatRoom) => {
    try {
      // Create a connection to the chat hub
      const connection = new HubConnectionBuilder()
        .withUrl('https://corechatappapi-b7h4ckdhfnfdczbx.eastus-01.azurewebsites.net/chat')
        .configureLogging(LogLevel.Information)
        .build();

      // Set up handler
      connection.on("JoinSpecificChatRoom", (username, msg) => {
        setMessages((messages) => [...messages, { username, msg }]);
        console.log(`message: ${msg}`);
      });

      connection.on("ReceiveSpecificChatRoom", (username, msg) => {
        setMessages((messages) => [...messages, { username, msg }]);
      });

      await connection.start();

      // Create a ClientConnection object
      const userConnection = { UserName: userName, ChatRoom: chatRoom };

      // Invoke the JoinSpecificChatRoom method with the object
      await connection.invoke("JoinSpecificChatRoom", userConnection);

      // Set the connection object
      connection.userName = userName;
      connection.chatRoom = chatRoom

      setConnection(connection);
    } catch (err) {
      console.error(err);
    }
  };

  const sendMessage = async (message) => {
    try {
      // Create a Message object
      const msg = { UserName: connection.userName, ChatRoom: connection.chatRoom, Content: message };
      await connection.invoke("SendMessage", msg);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <main>
        <Container>
          <Row className='px-5 my-5'>
            <Col sm='12'>
              <h1 className='font-weight-light'>Welcome to Gama Learn Chat-App</h1>
            </Col>
          </Row>
          {
            !connection
              ? <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
              : <ChatRoom messages={messages} sendMessage={sendMessage}> </ChatRoom>
          }
        </Container>
      </main>
    </div>
  );
}

export default Home;