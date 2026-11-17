export default {
  input: "src/index.js",
  output: [
    {
      file: "dist/foscam-glance.js",
      format: "es",
      sourcemap: true,
    },
    {
      file: "dist/hass-aarlo.js",
      format: "es",
      sourcemap: true,
    }
  ],
};
