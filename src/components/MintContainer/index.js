import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import MintNFT from './MintNFT';
import { useEagerConnect, useInactiveListener } from '../../hooks';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import OnboardingButton from './OnboardinButton';
import { ethers } from 'ethers';
import ContractABI from '../../abis/rinkeby.json';
import { CONTRACT_ADDRESS } from '../../constants/addresses';
import { NetworkContextName } from '../../constants/misc';

const timerIDs = {};

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

  const [presaleStartDate, setPresaleStartDate] = useState();
  const [whitelistEndDate, setWhitelistEndDate] = useState();

  useEffect(() => {
    if (timerIDs.library) {
      clearTimeout(timerIDs.library);
      timerIDs.library = null;
    }
    timerIDs.library = setTimeout(async () => {
      const provider = library ? new ethers.providers.Web3Provider(library.provider) : new ethers.providers.EtherscanProvider(NetworkContextName);
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, provider);
      const salePlans = await contract.salePlans();

      const presaleStartDate = new Date(salePlans.startTime.toNumber() * 1000); // presale starts at 28th 10am ET
      const whitelistEndDate = new Date(presaleStartDate.getTime() - 1000 * 60 * 60 * 82); // whitelist ends at 82hrs before presale start - closed by 24th 11:59pm ET

      setPresaleStartDate(presaleStartDate);
      setWhitelistEndDate(whitelistEndDate);
    }, 500);
  }, [library]);

  useEffect(() => {
    if (isBeforePreSale) {
      if (timerIDs.presale) {
        clearTimeout(timerIDs.presale);
        timerIDs.presale = null;
      }
      timerIDs.presale = setTimeout(() => {
        setIsBeforePresale(false);
      }, presaleStartDate.getTime() - new Date().getTime());
    }
  }, [isBeforePreSale]);

  useEffect(() => {
    if (isBeforeWhitelist) {
      if (timerIDs.whitelist) {
        clearTimeout(timerIDs.whitelist);
        timerIDs.whitelist = null;
      }
      timerIDs.whitelist = setTimeout(() => {
        setIsBeforeWhitelist(false);
      }, whitelistEndDate.getTime() - new Date().getTime());
    }
  }, [isBeforeWhitelist]);

  useEffect(() => {
    setIsBeforeWhitelist(new Date() < whitelistEndDate);
  }, [whitelistEndDate]);
  useEffect(() => {
    setIsBeforePresale(new Date() < presaleStartDate);
  }, [presaleStartDate]);

  if (isBeforeWhitelist) {
    return (
      <div className="mint-btn mb-3">
        <a
          href="https://wamak77h4yt.typeform.com/zensportsia"
          target="_blank"
        >
          <span>Join NFT Whitelist</span>
        </a>
        <p>
          <span>
            <a
              href="https://zensports.com/blog/zensportsia-nft-drop-how-to-enter-the-whitelist/"
              target="_blank"
              class="sub-text"
            >
              Review whitelist guidelines
            </a>
          </span>
        </p>
      </div>
    );
  }

  if (isBeforePreSale) {
    return (
      <div className="mint-btn mb-4">
        <div className="mint-area">
          <div className="action-area">
            <div className="action-button">
              <Button disabled>Mint NFT's</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mint-btn mb-4">
      { account ? <MintNFT /> : <OnboardingButton /> }
    </div>
  );
}
