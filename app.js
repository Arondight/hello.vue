import express from "express";
import url from "url";
import path from "path";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import serveIndex from "serve-index";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mRootdir = path.resolve(__dirname);
const m_DEFAULT_PORT = 9934;

(function main() {
  const { argv } = yargs(hideBin(process.argv))
    .help("help")
    .alias("help", "h")
    .version(false)
    .options({
      port: {
        alias: "p",
        type: "number",
        description: "端口",
        requiresArg: true,
        required: false,
      },
    });
  const port = argv.port || m_DEFAULT_PORT;
  const server = express(port);

  server.use(serveIndex(mRootdir, { hidden: true, icons: true, view: "details" }));
  server.use(express.static(mRootdir));
  server.listen(port, "localhost");
})();
