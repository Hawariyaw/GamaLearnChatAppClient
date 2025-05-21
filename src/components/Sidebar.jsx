import React, { useState } from "react";
import { Tab, Tabs, InputGroup, FormControl } from "react-bootstrap";
import { FaUser, FaUsers } from "react-icons/fa";

const Sidebar = ({ children, onTabChange }) => {
  const [personalSearchTerm, setPersonalSearchTerm] = useState("");
  const [groupSearchTerm, setGroupSearchTerm] = useState("");

  return (
    <Tabs
      defaultActiveKey="personal"
      id="sidebar-tabs"
      variant="pills"
      className="flex-column custom-sidebar-tabs mb-3"
      onSelect={onTabChange}
    >
      <Tab eventKey="personal" title={<><FaUser /> Personal</>}>
        <InputGroup className="my-2 px-2">
          <FormControl
            placeholder="Search Personal..."
            value={personalSearchTerm}
            onChange={e => setPersonalSearchTerm(e.target.value)}
          />
        </InputGroup>
        {React.Children.map(children[0], child =>
          React.isValidElement(child) ? React.cloneElement(child, { searchTerm: personalSearchTerm }) : child
        )}
      </Tab>
      <Tab eventKey="group" title={<><FaUsers /> Group</>}>
        <InputGroup className="my-2 px-2">
          <FormControl
            placeholder="Search Groups..."
            value={groupSearchTerm}
            onChange={e => setGroupSearchTerm(e.target.value)}
          />
        </InputGroup>
        {React.Children.map(children[1], child =>
          React.isValidElement(child) ? React.cloneElement(child, { searchTerm: groupSearchTerm }) : child
        )}
      </Tab>

    </Tabs>
  );
};

export default Sidebar;
