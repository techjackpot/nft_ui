import { useWeb3React } from '@web3-react/core';
import React, { useState, useEffect } from 'react';
import { useEagerConnect, useInactiveListener } from '../../hooks';
import Wallet from './Wallet';

export default function HeaderInfo(props) {
  const { connector, account } = useWeb3React();

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

  return (
    <div class="nav-toggler">
      <a
        href="https://discord.gg/gnwAUarJtx"
        target="_blank"
        title="Discord"
        rel="noreferrer"
      >
        <img
          src="images/discord_icon.png"
          alt="twitter"
          className="toggler-btn"
        />
      </a>
      <a
        href="https://twitter.com/zensportsia"
        target="_blank"
        title="Twitter"
        rel="noreferrer"
      >
        <img
          src="images/twitter_icon.png"
          alt="twitter"
          className="toggler-btn"
        />
      </a>
      { account && <Wallet /> }
    </div>
  );
}
