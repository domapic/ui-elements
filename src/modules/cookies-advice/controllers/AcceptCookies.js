import { connect } from "@xbyorange/react-mercury";

import withRoutes from "components/with-routes";
import AcceptCookiesComponent from "../components/accept-cookies";

import { cookies, acceptCookies } from "data/legal";

export const mapDataSourceToProps = () => {
  return {
    accepted: cookies.accepted().read.getters.value,
    onAccept: acceptCookies
  };
};

export const AcceptCookies = connect(mapDataSourceToProps)(withRoutes(AcceptCookiesComponent));
