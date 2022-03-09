const WalletConnect = window.WalletConnect.default;
const WalletConnectQRCodeModal = window.WalletConnectQRCodeModal.default;

// Get an instance of the WalletConnect connector
const connector = new WalletConnect({
    bridge: 'https://bridge.walletconnect.org' // Required
});

// When the connect/disconnect button is clicked
const connect = function () {
    // Check if connection is already established
    if (!connector.connected) {
        // create new session
        connector.createSession().then(() => {
            // get uri for QR Code modal
            const uri = connector.uri;
            // display QR Code modal
            WalletConnectQRCodeModal.open(uri, () => {
                console.log('QR Code Modal closed');
            });
        });
    } else {
        // disconnect
        connector.killSession();
    }
}

// Subscribe to connection events: connect, session_update and disconnect
connector.on('connect', function (error, payload) {
    if (error) {
        console.error(error);
    } else {
        // Close QR Code Modal
        WalletConnectQRCodeModal.close();

        // something to display
    }
});

connector.on('session_update', function (error, payload) {
    if (error) {
        console.error(error);
    } else if (connector.connected) {
        // data may be changed
    }
});

export default { connector, connect }
