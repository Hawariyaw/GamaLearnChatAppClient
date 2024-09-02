import React from "react";
import { Tab, Tabs } from "react-bootstrap";

const Sidebar = ({ children, onTabChange }) => {
  return (
    <Tabs
      defaultActiveKey="personal"
      id="justify-tab-example"
      className="mb-3"
      justify
      onSelect={onTabChange}
    >
      <Tab eventKey="personal" title="Personal" >
        {children[0]}
      </Tab>
      <Tab eventKey="group" title="Group">
        {children[1]}
      </Tab>

    </Tabs>
  );
};

export default Sidebar;
