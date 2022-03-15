import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import MintNFT from './MintNFT';
import { useEagerConnect, useInactiveListener } from '../../hooks';
import React, { useState, useEffect } from 'react';
import OnboardingButton from './OnboardinButton';
import { ethers } from 'ethers';
import ContractABI from '../../abis/rinkeby.json';
import { CONTRACT_ADDRESS } from '../../constants/addresses';
import { NetworkContextName } from '../../constants/misc';

let timerId = null;

export default function MintContainer() {
  const { connector, account, error, library } = useWeb3React();

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

  const [isBeforePreSale, setIsBeforePresale] = useState(undefined);
  const [isBeforeWhitelist, setIsBeforeWhitelist] = useState(undefined);

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
    timerId = setTimeout(async () => {
      const provider = library ? new ethers.providers.Web3Provider(library.provider) : new ethers.providers.EtherscanProvider(NetworkContextName);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, provider);
      const salePlans = await contract.getSalePlans();
      // console.log(library ? 'from provider' : 'from rinkeby', salePlans);
      const presaleStartDate = new Date(salePlans.startTime.toNumber() * 1000);
      const whitelistEndDate = new Date(presaleStartDate.getTime() - 1000 * 60 * 60 * 24 * 2);
      // console.log(presaleStartDate, whitelistEndDate);
      setIsBeforePresale(new Date() < presaleStartDate);
      setIsBeforeWhitelist(new Date() < whitelistEndDate);
    }, 500);
  }, [library]);

  return (
    <div className="mint-btn">
      { isBeforeWhitelist === true && (
        <>
          <a
            href="https://wamak77h4yt.typeform.com/zensportsia"
            target="_blank"
          >
            <span>Join NFT Whitelist</span>
          </a>
          <p>
            <span
              ><a
                href="https://zensports.com/blog/zensportsia-nft-drop-how-to-enter-the-whitelist/"
                target="_blank"
                class="sub-text"
                >Review whitelist guidelines</a
              ></span
            >
          </p>
        </>
      ) }
      { isBeforeWhitelist === false && (
        <>
          { account && <MintNFT /> }
          { !account && <OnboardingButton  /> }
        </>
      ) }
    </div>
  );
}
