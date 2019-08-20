import BitcoinExchangeServer from "./api/bitcoinExchangeServer";

console.log("Launching Server");
const server = new BitcoinExchangeServer();
server.launch(3000);
console.log("Listening on port 3000");

process.on('exit', () => {
    console.log("Server shutting down");
    server.shutdown();
    console.log("Server shut down");
});