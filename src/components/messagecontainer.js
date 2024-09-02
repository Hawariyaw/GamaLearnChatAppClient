const MessageContainer = ({ messages }) => {
    return <div>
            {
                messages.map((msg, index) => (
                    <div key={index}>
                        <p>{msg.username}: {msg.msg}</p>
                    </div>
                ))
            }
        </div>
    
}

export default MessageContainer;