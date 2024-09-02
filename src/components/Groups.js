import React from "react";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";

const Groups = ({ groups = [], joinRoom, selected }) => {
  return (
    <ListGroup>
      {groups.map((group) => (
        <Group
          key={group.id}
          group={group}
          join={() => joinRoom(group.groupName)}
          active={selected === group.groupName}
        />
      ))}
    </ListGroup>
  );
};

const Group = ({ group = {}, join, active }) => {
  return (
    <ListGroup.Item
      key={group.id}
      as="li"
      className="d-flex justify-content-between align-items-start"
      onClick={join}
      active={active}
    >
      <div className="ms-2 me-auto">
        <div className="fw-bold">{group.groupName}</div>
        {group?.userIds?.length} members
      </div>
    </ListGroup.Item>
  );
};

export default Groups;
