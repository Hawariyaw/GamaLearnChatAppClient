import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  OverlayTrigger,
  Popover
} from "react-bootstrap";
import EmojiPicker from "emoji-picker-react";

// api
import { getAllUsers } from "../api/user";
import { getAllGroups } from "../api/group";
import { getGroupMessages, getPersonalMessages } from "../api/messages";
// socket
import { signal } from "../socket/signal";
// components
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Users from "../components/Users";
import Groups from "../components/Groups";
import Messages from "../components/Messages";

const Home = ({ onSignOut, userName = "" }) => {
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const chatRoom = useRef({
    to: "",
    isPrivate: false,
  });

  const getUsers = useCallback(async () => {
    const users = await getAllUsers();
    if (users) {
      setUsers(users);
    }
  }, []);

  const getGroups = useCallback(async () => {
    const groups = await getAllGroups();
    if (groups) {
      setGroups(groups);
    }
  }, []);

  const getGroupChat = useCallback(async (toUserName) => {
    const messages = await getGroupMessages(toUserName);
    if (messages) {
      setMessages(messages);
    }
  }, []);

  const getPersonalChat = useCallback(
    async (toUserName) => {
      const messages = await getPersonalMessages(userName, toUserName);
      if (messages) {
        setMessages(messages);
      }
    },
    [userName]
  );

  const onJoined = (_userName, msg) => {
    console.log("joined", _userName, msg);
  };

  const onMessageReceived = useCallback((_userName, msg) => {
    setMessages((messages) => [
      ...messages,
      { fromId: _userName, content: msg, sentAt: new Date().toString() },
    ]);
  }, []);

  useEffect(() => {
    getUsers();
    signal.init(onJoined, onMessageReceived);
  }, [getUsers, onMessageReceived]);

  const onTabChange = useCallback(
    async (key) => {
      if (key === "group") {
        return getGroups();
      }
      getUsers();
    },
    [getGroups, getUsers]
  );

  const onJoinRoom = useCallback(
    (toUserName, personal = false) => {
      setMessages([]);
      signal.joinChatRoom(userName, toUserName, personal, chatRoom.current.to);
      chatRoom.current = {
        to: toUserName,
        isPrivate: personal,
      };
      if (personal) {
        return getPersonalChat(toUserName);
      }

      getGroupChat(toUserName);
    },
    [getGroupChat, getPersonalChat, userName]
  );

  const handleSend = (e) => {
    e.preventDefault();
    signal.sendMessage(
      userName,
      message,
      chatRoom.current.to,
      chatRoom.current.isPrivate
    );
    setMessage("");
  };

  const onEmojiClick = (emojiObject) => {
    setMessage(message + emojiObject.emoji);
  }

  return (
    <Container fluid>
      <Header onSignOut={onSignOut} userName={userName} />
      <Row className="mh-100" style={{ minHeight: "90vh" }}>
        <Col md={4} className="border mh-100">
          <Sidebar onTabChange={onTabChange}>
            <Users
              users={users}
              joinRoom={onJoinRoom}
              currentUsername={userName}
              selected={chatRoom.current.to}
            />
            <Groups
              groups={groups}
              refreshGroups={getGroups}
              joinRoom={onJoinRoom}
              selected={chatRoom.current.to}
            />
          </Sidebar>
        </Col>
        <Col md={8} className="pl-4 d-flex flex-column">
          <Col className="border d-flex flex-1">
            <Messages messages={messages} currentUserName={userName} />
          </Col>
          <Col className="flex-grow-0">
            <Form onSubmit={handleSend}>
              <InputGroup className="mt-3" size="lg">
              <OverlayTrigger placement="top" trigger="click" overlay={popover(onEmojiClick)}>
                  <Button variant="outline-secondary">😀</Button>
                </OverlayTrigger>
                <Form.Control
                  placeholder="Type something here..."
                  aria-label="Type something here..."
                  aria-describedby="send-btn"
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  disabled={!chatRoom.current.to}
                  value={message}
                />
                <Button variant="primary" id="send-btn" type="submit">
                  Send
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

const popover = (onEmojiClick) => (
  <Popover id="popover-basic">
      <EmojiPicker onEmojiClick={onEmojiClick}/>
  </Popover>
);

export default Home;
