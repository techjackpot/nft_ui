import { useWeb3React } from '@web3-react/core';
import MetaMaskOnboarding from '@metamask/onboarding';
import React from 'react';
import { toast } from 'react-toastify';
import { Button } from 'react-bootstrap';
import { injected } from '../../connectors';

const ONBOARD_TEXT = 'Mint NFT\'s'; //'Click here to install MetaMask!';
const CONNECT_TEXT = 'Mint NFT\'s';
const CONNECTED_TEXT = 'Disconnect';

export default function OnboardingButton(props) {
  const context = useWeb3React()

  const { connector, active, account, activate, deactivate } = context;

  const [buttonText, setButtonText] = React.useState(ONBOARD_TEXT);
  const [isDisabled, setDisabled] = React.useState(false);

  const onboarding = React.useRef();

  React.useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding();
    }
  }, []);

  React.useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (account) {
        setButtonText(CONNECTED_TEXT);
        setDisabled(false);
        onboarding.current.stopOnboarding();
      } else {
        setButtonText(CONNECT_TEXT);
        setDisabled(false);
      }
    }
  }, [connector, active, account]);

  const onClick = () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (account) {
        deactivate();
      } else {
        activate(injected).then(() => {
          toast.success('Connected');
        });
      }
    } else {
      onboarding.current.startOnboarding();
    }
  };

  return (
    <div className="action-button">
      <Button disabled={isDisabled} onClick={onClick}>
        {buttonText}
      </Button>
    </div>
  );
}