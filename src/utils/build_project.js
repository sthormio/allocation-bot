const shell = require("shelljs");

shell.exec("tsc --build")
shell.exec("node build/app.js")