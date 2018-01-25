//
// This script was inspired by (read: stolen from)
// https://www.npmjs.com/package/express-generator.
//

import * as debugPackage from "debug";
import * as http from "http";
import { app } from "../app/app";

const debug = debugPackage("express:startup");

/**
 * Converts the port string to a number, if it is a strictly positive integer,
 * otherwise returns it as a string.
 * @param {string} port The port to convert.
 * @returns {string | number} A value for the port that can be listened to.
 */
function normalizePort(port: string) {
    const portNumber = parseInt(port, 10);
    if (isNaN(portNumber) || portNumber < 0) {
        return port;
    } else {
        return portNumber;
    }
}

const port = normalizePort(process.env.PORT || "3000");
const portName = typeof port === "string"
    ? `pipe ${port}`
    : `port ${port}`;

const server = http.createServer(app);

server.listen(port);

server.on("error", (error) => {
    if ((error as any).syscall !== "listen") {
        throw error;
    }

    switch ((error as any).code) {
        case "EACCES":
            throw new Error(`You do not have permission to use ${portName}. Did you mean to \`sudo\`?`);
        case "EADDRINUSE":
            throw new Error(`Something is already using ${portName}. Maybe \`killall node\`?`);
        default:
            throw error;
    }
});

server.on("listening", () => {
    debug(`And we're off on ${portName}`);
});
