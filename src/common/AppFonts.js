"use strict";

import { Platform, Dimensions } from "react-native";

const DEVICE_SCALE = Dimensions.get("window").width / 375;

const PRIMARY_FONT = "helvetica";
const DEFAULT_FONT = "museosans-300";
const SECONDARY_FONT = Platform.OS === "android" ? "basis" : "helvetica";

/* utils ==================================================================== */

// get font name and weight
function fontWithWeight(
  family: string = DEFAULT_FONT,
  weight: string = "regular"
): string {
  return family;
}

function normalize(size: number): number {
  return Math.round(DEVICE_SCALE * size);
}

// attempt to normalize x-platform line heights
function lineHeight(
  val: number = 1,
  scale: number = 1,
  normalized: boolean = true
): number {
  let adjusted = normalized ? normalize(val) : val;
  return Math.round(Platform.OS === "android" ? adjusted * scale : adjusted);
}

/* export =================================================================== */

export default {
  primary: PRIMARY_FONT,
  default: DEFAULT_FONT,
  helvetica: DEFAULT_FONT,
  basis: SECONDARY_FONT,
  h1: DEFAULT_FONT,
  h2: DEFAULT_FONT,
  h3: DEFAULT_FONT,
  h4: DEFAULT_FONT,
  p: DEFAULT_FONT,
  button: DEFAULT_FONT,

  fontWithWeight,
  lineHeight,
  normalize
};
