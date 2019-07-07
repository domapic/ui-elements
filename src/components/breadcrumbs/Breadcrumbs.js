import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";

import Link from "components/link";

import "components/global-styles";
import styles from "./breadcrumbs.scss";

export const Breadcrumbs = ({ sections }) => {
  return (
    <span className={styles.breadcrumbs} data-testid="breadcrumbs">
      {sections.map((sectionData, index) => {
        const icon = sectionData.icon ? <Icon name={sectionData.icon} /> : null;
        const key = `breadcrumb-${index}`;
        if (index === sections.length - 1) {
          return (
            <span key={key}>
              {icon}
              {sectionData.text}
            </span>
          );
        }
        return (
          <React.Fragment key={key}>
            <Link to={sectionData.url}>
              {icon} {sectionData.text}
            </Link>
            <span className={styles.breadcrumbs__separator}> &gt; </span>
          </React.Fragment>
        );
      })}
    </span>
  );
};

Breadcrumbs.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string.isRequired,
      url: PropTypes.string
    })
  ).isRequired
};
