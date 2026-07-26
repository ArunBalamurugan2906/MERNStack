import React, { useState } from "react";
import { Button, Card, Form, Container, InputGroup } from "react-bootstrap";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Todo = () => {
  let [items, setItems] = useState([
    { id: 1, label: "HTML&CSS", checked: true },
    { id: 2, label: "JavaScript", checked: true },
    { id: 3, label: "React.Js", checked: false },
  ]);

  let [newItems, setNewItems] = useState("");
  let [isEditing, setEditing] = useState(false);
  let [currentElement, setCurrentElement] = useState(null);

  let handleChange = (id) => {
    let handleCheck = items.map((item) => {
      return item.id === id ? { ...item, checked: !item.checked } : item;
    });
    setItems(handleCheck);
  };

  let handleAddandSave = () => {
    if (isEditing) {
      let editSave = items.map((item) => {
        return item.id === currentElement ? { ...item, label: newItems } : item;
      });
      setItems(editSave);
      setCurrentElement(null);
      setNewItems("");
      setEditing(false);
    } else {
      setItems([
        ...items,
        { id: items.length + 1, label: newItems, checked: false },
      ]);
      setNewItems("");
    }
  };

  let handleDelete = (id) => {
    let itemDelete = items
      .filter((item) => item.id !== id)
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });

    setItems(itemDelete);
  };

  let handleEdit = (id) => {
    let handleEdit_label = items.find((item) => item.id === id);
    setNewItems(handleEdit_label.label);
    setEditing(true);
    setCurrentElement(id);
  };

  return (
    <Container className="d-flex justify-content-center mt-5">
      <Card className="shadow p-4" style={{ width: "500px" }}>
        <Card.Title className="text-center mb-4">
          <h2>Todo List</h2>
        </Card.Title>

        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Enter Your Items"
            value={newItems}
            onChange={(e) => {
              setNewItems(e.target.value);
            }}
          />
          <Button variant="primary" onClick={handleAddandSave}>
            {isEditing ? "Save" : "ADD"}
          </Button>
        </InputGroup>

        <ul className="list-group">
          {items.map((item) => {
            return (
              <li
                key={item.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <div className="d-flex align-items-center">
                  <Form.Check
                    type="checkbox"
                    checked={item.checked}
                    onChange={() => {
                      handleChange(item.id);
                    }}
                    className="me-2"
                  />

                  <label
                    style={{
                      textDecoration: item.checked ? "line-through" : "none",
                    }}
                  >
                    {item.label}
                  </label>
                </div>

                <div>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      handleEdit(item.id);
                    }}
                  >
                    <FaRegEdit />
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => {
                      handleDelete(item.id);
                    }}
                  >
                    <MdDeleteForever />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </Card>
    </Container>
  );
};

export default Todo;
