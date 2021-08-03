const fs = require("fs");
const UglifyJS = require("uglify-js");
const config = require("./config");

const options = {
  annotations: false,
  output: {
    beautify: false,
    preamble: "/* uglified */",
  },
};
fs.readFile(config.TARGETED_FILE, config.ENCODING, (err, data) => {
  if (err) {
    console.log("error: ", err);
    return;
  }

  if (!fs.existsSync(config.OUTPUT_DIR)) {
    fs.mkdirSync(config.OUTPUT_DIR);
  }

  fs.writeFile(
    config.OUTPUT_DIR + config.OUTPUT_FILE_NAME,
    UglifyJS.minify(data, options).code,
    config.ENCODING,
    (err) => {
      if (err) {
        console.log("error: ", err);
        return;
      }
    }
  );
});
