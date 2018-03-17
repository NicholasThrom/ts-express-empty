//
// This script was inspired by
// www.npmjs.com/package/express-generator
//

import * as http from "http";

import app from "../app/app";
import Log from "../modules/log/log";

/**
 * Starts the app.
 */
class Start {

    /**
     * Converts the port string to a number, if it is a strictly positive
     * integer, otherwise returns it as a string.
     */
    private static normalizePort(port: string) {
        const portNumber = parseInt(port, 10);
        if (isNaN(portNumber) || portNumber < 0) {
            return port;
        } else {
            return portNumber;
        }
    }

    /**
     * Runs the server.
     */
    public static run() {

        const port = Start.normalizePort(process.env.PORT || "3000");

        const portName = typeof port === "string"
            ? `pipe ${port}`
            : `port ${port}`;

        const server = http.createServer(app.app);

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
            Log.log(`And we're off on ${portName}`);
        });

        server.listen(port);

    }

    /**
     * This class is never instantiated.
     */
    private constructor() {
        throw new Error("This class cannot be instantiated");
    }

}

Start.run();

export { Start };
