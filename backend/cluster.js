const cluster = require("cluster")
const os = require("os")

if (cluster.isMaster) {
  let numOfCPUs = os.cpus().length
  for (let i = 0; i < numOfCPUs; i++) {
    let worker = cluster.fork()

    worker.on("online", () => {
      console.log(`Worker ${worker.process.pid} has started`)
    });

    worker.on("error", (error) => {
      console.log(`Worker encountered an error`)
    });

    worker.on("exit", (worker, code, signal) => {
      if (worker.exitedAfterDisconnect && code != 0) {
        return console.log(`Worker has exitted voluntarily with a code: ${code} and signal: ${signal}`)
      }

      console.log(`Worker ${worker.process.pid} has exited with a code: ${code} and a signal: ${signal}, respawning right away!`)
      cluster.fork()
    });
  }
} else {
  require("./server")
}