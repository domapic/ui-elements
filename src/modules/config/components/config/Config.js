import React from "react";
import PropTypes from "prop-types";

import Container from "components/content-layout";
import ItemInfo from "components/item-info";
import Breadcrumbs from "components/breadcrumbs";

export const Config = ({ title, loading, error, config = [] }) => {
  return (
    <Container loading={loading} error={error} background={true}>
      <Container.Header>
        <Breadcrumbs
          sections={[
            {
              text: title,
              icon: "configure"
            }
          ]}
        />
      </Container.Header>
      <Container.Content>
        <ItemInfo loading={loading} data={config} />
      </Container.Content>
    </Container>
  );
};

Config.propTypes = {
  config: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  error: PropTypes.instanceOf(Error),
  loading: PropTypes.bool.isRequired,
  title: PropTypes.string
};
