import React from "react";
import { Card } from "react-bootstrap";
import { BsCheck, BsCheckAll } from "react-icons/bs";

const Messages = ({ messages, currentUserName }) => {
  // For UI demonstration purposes only: Add status to messages
  // This logic should be replaced by actual message status from the backend.
  const demoMessages = messages.map((msg, index) => ({
    ...msg,
    status: index % 3 === 0 ? 'sent' : (index % 3 === 1 ? 'delivered' : 'read')
  }));

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
      {demoMessages.map((message, index) => ( // Use demoMessages here
        <Message
          key={message.content + index}
          message={message} // message object now includes status for demo
          sameUser={message.fromId === currentUserName}
        />
      ))}
    </div>
  );
};

const Message = ({ message, sameUser }) => {
  const currentStatus = message.status || 'sent'; // Default to 'sent' if status is undefined

  const renderReadReceiptIcon = () => {
    if (!sameUser) return null;

    const iconStyle = { 
      marginLeft: '5px', 
      fontSize: '1.1em', // Slightly larger icon
      verticalAlign: 'middle' // Align icon with text
    };

    switch (currentStatus) {
      case 'sent':
        return <BsCheck style={{ ...iconStyle, color: '#6c757d' }} />; // Grey
      case 'delivered':
        return <BsCheckAll style={{ ...iconStyle, color: '#6c757d' }} />; // Grey
      case 'read':
        return <BsCheckAll style={{ ...iconStyle, color: '#007bff' }} />; // Blue for read
      default:
        return null;
    }
  };

  return (
    <div
    className={`mb-2 mw-75 ${sameUser ? 'align-self-end' : ''}`}
    >
      <Card
        bg={sameUser ? "primary" : "secondary"}
        text="white"
        style={{ borderRadius: '.55rem', marginRight: sameUser ? '10px' : '0', marginLeft: sameUser ? '0' : '10px' }}
      >
        <Card.Header style={{ fontSize: '0.85em', borderRadius: '.55rem .55rem 0 0' }}>
          {sameUser ? "You" : message.fromId}
          <span className="float-end d-inline-flex align-items-center"> {/* Use d-inline-flex for alignment */}
            {message.sentAt}
            {renderReadReceiptIcon()}
          </span>
        </Card.Header>
        <Card.Body style={{ padding: '10px 15px' }}>
          <Card.Text>{message.content}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Messages;
