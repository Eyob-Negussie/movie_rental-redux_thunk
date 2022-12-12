import React from "react";

function ListGroup(props) {
  const {
    items,
    selectedItem,
    onItemSelect,
    valueProperty,
    textProperty
  } = props;

  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          key={item[valueProperty]}
          className={
            selectedItem === item
              ? "clickable list-group-item active"
              : "clickable list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
}

ListGroup.defaultProps = {
  textProperty: "genre",
  valueProperty: "_id"
};

export default ListGroup;
