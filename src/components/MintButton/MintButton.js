import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MetamaskImage from '../../assets/images/metamask.png';
import WalletConnectorImage from '../../assets/images/walletconnect.png';
import walletConnector from '../../connectors/wallectConnector';
import './MintButton.scss';
import ContractABI from '../../assets/abi.json';

const WALLET_PROVIDER = {
    METAMASK: 'metamask',
    WALLET_CONNECTOR: 'walletconnector'
}

let contract;
const CONTRACT_ADDRESS = '0xF19589e8B94f2C6c5a1a86efC56bce0bCbc714E4';

function MintButton() {
    const [show, setShow] = useState(false);
    const [provider, setProvider] = useState('');
    const [rpc, setRpc] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSelectWallet = async () => {
        setShow(false);
        if (provider === WALLET_PROVIDER.WALLET_CONNECTOR) {
            walletConnector.connect();
        } else if (provider === WALLET_PROVIDER.METAMASK) {
            if (window.ethereum) {
                window.ethereum.enable()
                console.log('@@@', contract, rpc)
                if (contract && rpc) {
                    const signer = rpc.getSigner();
                    console.log(signer);
                    await contract.connect(signer).mint(5, { value: window._ethers.utils.parseEther("0.5") });
                }
            }
        }
    }

    useEffect(() => {
        if (window.ethereum && window._ethers) {
            const rpc = new window._ethers.providers.Web3Provider(window.ethereum);
            setRpc(rpc);
            contract = new window._ethers.Contract(CONTRACT_ADDRESS, ContractABI, rpc);
        }
    }, [])

    return (
        <div className="btn-mint">
            <Button onClick={handleShow}>Mint Now</Button>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton >
                    <Modal.Title>
                        Select Wallet Provider
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div
                        className={`wallet-provider ${provider === WALLET_PROVIDER.METAMASK ? 'selected' : ''}`}
                        onClick={() => setProvider(WALLET_PROVIDER.METAMASK)}
                    >
                        <img src={MetamaskImage} width="50" />
                        <div className="wallet-title">Metamask</div>
                    </div>
                    <div
                        className={`wallet-provider ${provider === WALLET_PROVIDER.WALLET_CONNECTOR  ? 'selected' : ''}`}
                        onClick={() => setProvider(WALLET_PROVIDER.WALLET_CONNECTOR)}
                    >
                        <img src={WalletConnectorImage} width="50" />
                        <div className="wallet-title">Wallet Connector</div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleSelectWallet}>
                        Select
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MintButton;
