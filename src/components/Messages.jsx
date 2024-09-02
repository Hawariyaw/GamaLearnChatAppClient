import React from "react";
import { Card } from "react-bootstrap";

const Messages = ({ messages, currentUserName }) => {
  return (
    <div
      className="m-b-0  h-full d-flex flex-column w-100"
      style={{
        overflowY: "scroll",
        height: "85vh",
        flexDirection: "column-reverse",
        backgroundColor: "#eee",
      }}
    >
      {messages.map((message, index) => (
        <Message
          key={message.content + index}
          message={message}
          sameUser={message.fromId === currentUserName}
        />
      ))}
    </div>
  );
};

const Message = ({ message, sameUser }) => {
  return (
    <div
    className={`clearfix m-4 w-50 ${sameUser ? 'align-self-end' : ''}`}
    style={{ clear: 'both' }}
    >
      <Card
        bg={sameUser ? "primary" : "secondary"}
        text="white"
      >
        <Card.Header>
          {sameUser ? "You" : message.fromId}
          <span className="float-end">{message.sentAt}</span>
        </Card.Header>
        <Card.Body>
          <Card.Text>{message.content}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Messages;
