import { connect } from "@xbyorange/react-mercury";

import AcceptCookiesComponent from "../components/accept-cookies";

import { cookies, acceptCookies } from "data/legal";

export const mapDataSourceToProps = () => {
  return {
    accepted: cookies.accepted().read.getters.value,
    onAccept: acceptCookies
  };
};

export const AcceptCookies = connect(mapDataSourceToProps)(AcceptCookiesComponent);
