const path = require("path");
const fs = require("fs");
const os = require("os");
const chalk  = require("chalk");

module.exports = function () {
    const docDir = path.join(os.homedir() + "/Documents");
    const confDir = path.join(docDir, "/node-hub");
    const confFi = path.join(confDir, "/config.json");
    if (fs.existsSync(docDir)) {
        if (!fs.lstatSync(docDir).isDirectory()) {
            console.log(chalk.red(`CRITICAL: ${docDir} is a file!`));
            process.exit(1);
        };
    } else {
        fs.mkdirSync(docDir);
    };
    if (fs.existsSync(confDir)) {
        if (!fs.lstatSync(confDir).isDirectory()) {
            console.log(chalk.red(`CRITICAL: ${confDir} is a file!`));
            return process.exit(1);
        };
    } else {
        fs.mkdirSync(confDir);
    };
    if (fs.existsSync(confFi)) {
        if (!fs.lstatSync(confFi).isFile()) {
            console.log(chalk.red(`CRITICAL: ${confFi} is a directory!`));
            return process.exit(1);
        };
    } else {
        fs.writeFileSync(confFi, JSON.stringify(process.defaultConfig, null, 2));
    };
    const fileContent = fs.readFileSync(confFi, "utf-8");
    process.config = JSON.parse(fileContent);
    return JSON.parse(fileContent);
};