import { useWeb3React } from '@web3-react/core';
import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';
import { Button } from 'react-bootstrap';
import SelectWalletModal from "./Modal";
import {
  setConnector,
  getConnector,
  activateInjectedProvider,
  getSelectedConnector,
} from '../../connectors';

export default function OnboardingButton(props) {
  const context = useWeb3React()

  const { connector, active, account, activate } = context;

  const [modalShow, setModalShow] = React.useState(false);

  const onboarding = React.useRef();

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (account) {
        onboarding.current.stopOnboarding();
      }
    }
  }, [connector, active, account]);

  const onConnectorSelected = (connectorName) => {
    setConnector(connectorName);
    if (connectorName === 'injected') {
      if (!MetaMaskOnboarding.isMetaMaskInstalled()) {
        onboarding.current.startOnboarding();
      }
    }
    activateInjectedProvider(getConnector());
    activate(getSelectedConnector());
    setModalShow(false)
  };

  return (
    <div className="action-button">
      <Button onClick={() => setModalShow(true)}>
        Mint NFT's
      </Button>
      <SelectWalletModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSelect={(connectorName) => onConnectorSelected(connectorName)}
      />
    </div>
  );
}