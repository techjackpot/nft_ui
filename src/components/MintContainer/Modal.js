import { Modal, Button, Image } from 'react-bootstrap';

export default function SelectWalletModal(props) {
  return (
    <Modal
      {...props}
      size="xs"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="wallet-connections-modal"
    >
      <Modal.Body>
        <div className="wallet-connections">
          <Button
            variant="outline-primary"
            size="lg"
            onClick={() => props.onSelect('coinbaseWallet')}
          >
            <Image src={require('../../assets/images/coinbasewallet.png')} width="44" height="44" />
            <span>Coinbase Wallet</span>
          </Button>
          <Button
            variant="outline-primary"
            size="lg"
            onClick={() => props.onSelect('injected')}
          >
            <Image src={require('../../assets/images/metamask.png')} width="44" height="44" />
            <span>MetaMask</span>
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
