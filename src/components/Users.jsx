import React from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

const Users = ({ users = [], joinRoom, currentUsername, selected }) => {
  return (
    <ListGroup>
      {users.map((user) => {
        if (currentUsername === user.userName) return null;

        return (
          <User
            key={user.id}
            user={user}
            join={() => joinRoom(user.userName, true)}
            active={selected === user.userName}
          />
        );
      })}
    </ListGroup>
  );
};

const User = ({ user = {}, join, active }) => {
  return (
    <ListGroup.Item
      key={user.id}
      as="li"
      className="d-flex justify-content-between align-items-start"
      onClick={join}
      active={active}
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">
          {user.firstName} {user.lastName}
        </div>
        {user.userName}
      </div>
    </ListGroup.Item>
  );
};

export default Users;
