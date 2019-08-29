import BitcoinExchangeServer from "./api/bitcoinExchangeServer";

console.log("Launching Server");
const server = new BitcoinExchangeServer();
server.launch(4000);
console.log("Listening on port 4000");

process.on('exit', () => {
    console.log("Server shutting down");
    server.shutdown();
    console.log("Server shut down");
});