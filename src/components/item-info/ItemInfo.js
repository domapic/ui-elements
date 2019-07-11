import React from "react";
import PropTypes from "prop-types";

import { Table } from "semantic-ui-react";

import styles from "./itemInfo.scss";

export const Detail = ({ label, value }) => (
  <Table.Row>
    <Table.Cell>{label}</Table.Cell>
    <Table.Cell>{value}</Table.Cell>
  </Table.Row>
);

Detail.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export const ItemInfo = ({ data }) => (
  <Table basic className={styles["table-info"]} striped unstackable size="small">
    <Table.Body>
      {data.map(detail => (
        <Detail key={detail.label} label={detail.label} value={detail.value} />
      ))}
    </Table.Body>
  </Table>
);

ItemInfo.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ).isRequired
};
