import { Options } from "$fresh/plugins/twind.ts";

export default {
  selfURL: import.meta.url,
  theme: {
    extend: {
      width: {
        128: "29rem",
        96: "25.5rem",
        200: "50rem",
      }
    }
  }
} as Options;
