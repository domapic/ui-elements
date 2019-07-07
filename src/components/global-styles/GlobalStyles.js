import { appendStyleSheet } from "helpers/append-header";
import "./globalStyles.scss";

appendStyleSheet("semantic/semantic.min.css", {
  method: "prepend"
});
