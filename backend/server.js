const http = require('http')
const path = require("path")
const fs = require("fs")

const config = require("./../config")

function handleGet(req, res) {
  return new Promise((resolve, reject) => {
    
  })
}

function handlePost(req, res) {
  return new Promise((resolve, reject) => {
  })
}

function handleBadRequest(req, res) {
  return Promise.reject("bad request")
}

function listener() {
  let handler

  if (req.method === "GET") {
    return handleGet(req, res)
  } else if (req.method === "POST" && req.url.startsWith("/api")) {
    handler = handlePost
  } else {
    handler = handleBadRequest
  }

}

function startServer() {
  return new Promise((resolve, reject) => {
    const server = http.createServer(listener)

    server.on("error", error => {
      console.log("Web server crashed")
      reject(error)
    })

    server.listen(config.server.port, () => {
      console.log(`Web server has started successfully on port ${config.server.port}`)
    })
  })
};

startServer().then(res => {
  console.log("Server Started")
}).catch(error => {
  console.log("Server Crashed")
});