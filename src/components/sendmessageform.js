import React, { useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';

const SendMessageForm = ({ sendMessage }) => {
    const [message, setMessage] = useState('');
    
    return <Form onSubmit = {e => {
        e.preventDefault();
        sendMessage(message);
        setMessage('');
    }}>

    <InputGroup className='mb-3'>   
        <InputGroup.Text>
            Chat
        </InputGroup.Text>
        <Form.Control onChange={e => setMessage(e.target.value)} value={message} placeholder='type a message' />
        <button type='submit' className='btn btn-primary' disabled={!message}>Send</button>
    </InputGroup>
    </Form>
    }

    export default SendMessageForm;