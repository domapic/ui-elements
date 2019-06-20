import TextType from "./Text";
import NumberType from "./Number";
import BooleanType from "./Boolean";
import ObjectType from "./Object";

export const TEXT = "text";
export const NUMBER = "number";
export const BOOLEAN = "boolean";
export const OBJECT = "object";

export default {
  [TEXT]: TextType,
  [NUMBER]: NumberType,
  [BOOLEAN]: BooleanType,
  [OBJECT]: ObjectType
};
