module.exports = function sendMessage(exchange, message) {
    exchange.pub("", message)
}
