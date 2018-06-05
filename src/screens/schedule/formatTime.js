"use strict";

import moment from "moment-timezone";
import { timezone } from "../../env.js";

function formatTime(unix: number, hideAMPM: boolean): string {
  return moment.tz(unix, timezone).format(hideAMPM ? "h:mm" : "h:mma");
}

module.exports = formatTime;
