const fs = require("fs");
const currVer = require("../package.json").version;
const config = require("./config");
const changeType = config.CHANGE_TYPE;

// update version number
const changeVer = (currVer, changeType) => {
  const currArr = currVer.split(".");
  const nextVer = currArr
    .map((num, index) => {
      if (index === parseInt(changeType)) {
        num = parseInt(num) + 1;
      }
      return num;
    })
    .join(".");
  console.log(nextVer);
  return nextVer;
};
const nextVer = changeVer(currVer, changeType);

// update the version number in package.json (async)
fs.readFile("./package.json", config.ENCODING, (err, data) => {
  if (err) {
    console.log("error: ", err);
    return;
  }
  const newContent = data.replace(currVer, nextVer);
  fs.writeFile("./package.json", newContent, config.ENCODING, (err) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
  });
});

// rename the minified js file by the new version number
fs.rename(
  config.OUTPUT_DIR + config.OUTPUT_FILE_NAME,
  config.OUTPUT_DIR + nextVer + ".txt",
  (err) => {
    if (err) {
      console.log("error: ", err);
      return;
    }
  }
);
