import { useState } from 'react';
import { Form , Row, Col } from 'react-bootstrap';

const WaitingRoom = ({ joinChatRoom}) => {
    const [userName, setUserName] = useState();
    const [chatRoom, setChatRoom] = useState();

    return <Form onSubmit = {
        (e) => {
            e.preventDefault();
            joinChatRoom(userName, chatRoom);
        }
    }>

    <Row className='px-5 py-5'>
        <Col sm={12}>
            <Form.Group>
                <Form.Control type='text' placeholder='Enter your username' onChange={(e) => setUserName(e.target.value)} />
                <Form.Control type='text' placeholder='Enter your chatroom' onChange={(e) => setChatRoom(e.target.value)} />
            </Form.Group>
        </Col>
        <Col sm={12}>
            <button type='submit' className='btn btn-primary'>Join Chat Room</button>
        </Col>
    </Row>

    </Form>
}

export default WaitingRoom;