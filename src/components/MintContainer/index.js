import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import MintNFT from './MintNFT';
import { useEagerConnect, useInactiveListener } from '../../hooks';
import React, { useState, useEffect } from 'react';
import OnboardingButton from './OnboardinButton';

export default function MintContainer() {
  const { connector, account, error } = useWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error(error.message);
    }
  }, [error])

  return (
    <div className="mint-btn">
      { account && <MintNFT /> }
      { !account && <OnboardingButton /> }
    </div>
  );
}
