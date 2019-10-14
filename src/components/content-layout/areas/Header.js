import React from "react";
import PropTypes from "prop-types";
import { Header, Placeholder } from "semantic-ui-react";

import styles from "./header.scss";

export const HeaderArea = ({ children, as, loading }) => {
  const type = as || "h4";
  return loading ? (
    <Placeholder as={type} data-testid="content-layout-header--placeholder">
      <Placeholder.Paragraph>
        <Placeholder.Line as={type} />
      </Placeholder.Paragraph>
    </Placeholder>
  ) : (
    <Header
      as={type}
      className={styles["content-layout__header"]}
      data-testid="content-layout-header"
    >
      {children}
    </Header>
  );
};

HeaderArea.displayName = "ContentHeader";

HeaderArea.propTypes = {
  as: PropTypes.string,
  children: PropTypes.node,
  loading: PropTypes.bool
};
