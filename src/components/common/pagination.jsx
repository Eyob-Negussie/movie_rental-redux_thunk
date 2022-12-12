import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

function Pagination(props) {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pageCount = Math.ceil(itemsCount / pageSize);

  if (pageCount === 1) {
    return null;
  }

  return (
    <nav>
      <ul className="pagination">
        {_.range(1, pageCount + 1).map(page => (
          <li
            key={page}
            className={
              page === currentPage
                ? "clickable page-item active"
                : "clickable page-item"
            }
          >
            {/* eslint-disable-next-line */}
            <a onClick={() => onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
