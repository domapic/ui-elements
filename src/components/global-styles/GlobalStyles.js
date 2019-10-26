import { appendStyleSheet } from "helpers/append-header";
import "./globalStyles.scss";

export const SEMANTIC_URL = "semantic/semantic.min.css";

appendStyleSheet(SEMANTIC_URL, {
  method: "prepend"
});
