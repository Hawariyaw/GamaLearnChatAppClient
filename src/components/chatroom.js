import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap"
import MessageContainer from "./messagecontainer"
import SendMessageForm from "./sendmessageform";

const ChatRoom = ({ messages , sendMessage}) => {
    // UI Demo State: Real-time logic will be needed later
    const [isTyping, setIsTyping] = useState(false);
    const [typingUser, setTypingUser] = useState("");

    // useEffect for UI demonstration purposes only
    useEffect(() => {
        setIsTyping(true);
        setTypingUser("Jane Doe");
    }, []);

    return (
        <div>
            <Row className="px-3 pt-3 pb-2">
                <Col sm={12}>
                    <h2>ChatRoom</h2>
                </Col>
            </Row>
            <Row className="px-3 pb-3">
                <Col sm={12}>
                    <MessageContainer messages={messages} />
                </Col>
                {isTyping && typingUser && (
                    <Col sm={11} className="mt-1"> {/* Using sm={11} to allow slight indent if desired, or sm={12} for full width */}
                        <div className="typing-indicator">
                            {typingUser} is typing...
                        </div>
                    </Col>
                )}
                <Col sm={12} className={isTyping && typingUser ? "mt-1" : "mt-2"}> {/* Adjust margin based on typing indicator presence */}
                    <SendMessageForm sendMessage={sendMessage} />
                </Col>
            </Row>
        </div>  
    );
}

export default ChatRoom;