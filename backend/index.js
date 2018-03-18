const config = require("./../config")

config.mode === "development" ? require("./server") : require("./cluster")