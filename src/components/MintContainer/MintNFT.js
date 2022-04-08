import { useWeb3React } from '@web3-react/core';
import React, { useState, useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import Balance from '../Balance';
import ContractABI from '../../abis/contract.json';
import { CONTRACT_ADDRESS } from '../../constants/vars';

// const timerIDs = {};

export default function MintNFT() {
  const { account, library } = useWeb3React();
  
  const balance = Balance();

  const [loaded, setLoaded] = useState(false);

  const [quantity, setQuantity] = useState(0);
  const [insufficient, setInsufficient] = useState(balance < 0);
  const [isWhitelisted, setWhitelisted] = useState(false);
  const [unitPrice, setUnitPrice] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [isPresale, setIsPresale] = useState(false);
  const [isPubsale, setIsPubsale] = useState(false);
  const [presaleAllocationCount, setPresaleAllocationCount] = useState(0);
  const [teamAllocationCount, setTeamAllocationCount] = useState(0);
  const [presaleCount, setPresaleCount] = useState(0);
  const [presaleSoldOut, setPresaleSoldOut] = useState(false);
  const [pubsaleCount, setPubsaleCount] = useState(0);
  const [soldOut, setSoldOut] = useState(false);
  const [presaleStartDate, setPresaleStartDate] = useState(new Date());
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [presaleEnded, setPresaleEnded] = useState(false);
  const [presalePrice, setPresalePrice] = useState(0);
  const [pubsalePrice, setPubsalePrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const [forceReload, setForceReload] = useState(0);

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(library.provider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, provider);

      const salePlans = await contract.salePlans();

      const isWhitelisted = await contract.connect(signer).whitelists(account);
      setWhitelisted(isWhitelisted);

      const isPresale = await contract.connect(signer).isPresale();
      setIsPresale(isPresale);

      const isPubsale = await contract.connect(signer).isPubsale();
      setIsPubsale(isPubsale);

      const presaleCount = await contract.connect(signer).presaleCount();
      setPresaleCount(presaleCount.toNumber());

      const pubsaleCount = await contract.connect(signer).pubsaleCount();
      setPubsaleCount(pubsaleCount.toNumber());

      const presaleStartDate = new Date(salePlans.startTime.toNumber() * 1000);
      setPresaleStartDate(presaleStartDate);
      setPresalePrice(parseFloat(ethers.utils.formatEther(salePlans.mintPrice1)));
      setPubsalePrice(parseFloat(ethers.utils.formatEther(salePlans.mintPrice2)));

      setPresaleAllocationCount(salePlans.presaleAllocation.toNumber());
      setTeamAllocationCount(salePlans.teamAllocation.toNumber());

      setLoaded(true);
    })()
  }, [account, library, forceReload]);

  useEffect(() => {
    setPresaleStarted(new Date() >= presaleStartDate);
  }, [presaleStartDate]);

  useEffect(() => {
    setPresaleSoldOut(presaleCount >= presaleAllocationCount);
  }, [presaleCount, presaleAllocationCount]);

  useEffect(() => {
    setSoldOut(presaleCount + pubsaleCount >= 10000 - teamAllocationCount);
  }, [presaleCount, pubsaleCount, teamAllocationCount]);

  useEffect(() => {
    setPresaleEnded(!isPresale || presaleSoldOut);
  }, [isPresale, presaleSoldOut])

  useEffect(() => {
    setUnitPrice(isWhitelisted && !presaleEnded ? presalePrice : pubsalePrice);
  }, [isWhitelisted, presaleEnded, presalePrice, pubsalePrice]);

  useEffect(() => {
    setInsufficient(quantity === 0 || totalAmount > balance);
  }, [unitPrice, quantity, balance, totalAmount]);

  const onQuantityChanged = (value) => {
    setQuantity(value);
  };

  useEffect(() => {
    setTotalAmount(Math.round(unitPrice * quantity * 100) / 100);
  }, [unitPrice, quantity]);

  const confirmMint = async () => {
    if (insufficient) {
      if (quantity === 0) {
        toast.error('Please select a quantity of NFT\'s to buy.');
      } else {
        toast.error('Oops, you don\'t have sufficient funds to mint the number of NFT\'s.');
      }
      return;
    }

    setProcessing(true);
    try {
      const provider = new ethers.providers.Web3Provider(library.provider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, provider);
      const mintResponse = await contract.connect(signer).mint(quantity, {
        value: ethers.utils.parseEther(totalAmount + '')
      })
      toast.promise(mintResponse.wait, {
        pending: {
          render() {
            return <p className="transaction-message">Contacting the smart contract on the Ethereum network in order to mint your NFT's. This could take a couple of minutes. Please hang tight!</p>;
          },
          position: toast.POSITION.TOP_CENTER
        },
        success: {
          render() {
            return <p className="transaction-message">You have successfully minted your ZenSportsia NFT's! Please go to <a className="link_opensea" href="https://opensea.io/" target="_blank" rel="noreferrer">Opensea.io</a> to view them.</p>;
          }
        },
        error: 'Transaction failed'
      })
    } catch(e) {
      toast.error(e.message);
    } finally {
      setProcessing(false);
      setForceReload(forceReload + 1);
    }
  };

  if (!loaded) {
    return (
      <div className="mint-area">
        <div className="action-area">
          <div className="action-button">
            <Button disabled>Loading...</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!presaleStarted) {
    return (
      <div className="mint-area">
        <div className="action-area">
          <div className="action-button">
            <Button disabled>Mint NFT's</Button>
          </div>
        </div>
      </div>
    );
  }

  if (soldOut) {
    return (
      <div className="mint-area">
        <div className="action-area mb-4">
          <div className="action-button">
            <Button disabled>Mint NFT's</Button>
          </div>
        </div>
        <p className="mt-3 mb-0">The Public mint has been sold out.<br/>Feel free to check <u className="link" onClick={() => window.open('https://opensea.io')}>OpenSea</u> if you're interested in buying any NFT's in the public markets.</p>
      </div>
    );
  }

  if (!isWhitelisted && !isPubsale) {
    return (
      <div className="mint-area">
        <div className="action-area mb-4">
          <div className="action-button">
            <Button disabled>Buy NFT's</Button>
          </div>
        </div>
        <p className="mt-3 mb-0">
          The NFT Presale is only open to those whitelisted Ethereum addresses that were approved prior to March 24, 2022 at 11:59pm Eastern Time. You can check <u className="link" onClick={() => window.open('https://docs.google.com/spreadsheets/d/1Bctpq05jMSLviggf_6E36Qqo8calVyUs9HuUwL3c-h0/edit#gid=0')}>HERE</u> to see if your Ethereum wallet address is on the whitelist. If it's not, you'll need to wait until the Public Sale begins on March 30, 2022 at 10:00am Eastern Time to mint a ZenSportsian NFT.
        </p>
      </div>
    );
  }

  if (isWhitelisted && !isPubsale) {
    if (presaleEnded) {
      if (presaleSoldOut) {
        return (
          <div className="mint-area">
            <div className="action-area mb-4">
              <div className="action-button">
                <Button disabled>Mint NFT's</Button>
              </div>
            </div>
            <p className="mt-3 mb-0">The Presale mint has been sold out.<br/>Come back on March 30, 2022 at 10am ET to buy NFT's during the Public mint.</p>
          </div>
        );
      } else {
        return (
          <div className="mint-area">
            <div className="action-area mb-4">
              <div className="action-button">
                <Button disabled>Mint NFT's</Button>
              </div>
            </div>
            <p className="mt-3 mb-0">The Presale mint is now over.<br/>Come back on March 30, 2022 at 10am ET to buy NFT's during the Public mint.</p>
          </div>
        );
      }
    }
  }

  return (
    <div className="mint-area">
      <>
        { isWhitelisted && !presaleEnded && (
          <p className="my-3">
            <span>Congratulations! You are whitelisted.</span>
          </p>
        )}
        <div className="quantity-input-area">
          <span>Price per NFT: { unitPrice }ETH</span>
          <span className="separator">&times;</span>
          <Dropdown id="quantity-selector">
            <Dropdown.Toggle>
              <span>{ quantity === 0 ? <>&nbsp;</> : quantity }</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as="div" onClick={() => onQuantityChanged(5)}>5</Dropdown.Item>
              <Dropdown.Item as="div" onClick={() => onQuantityChanged(4)}>4</Dropdown.Item>
              <Dropdown.Item as="div" onClick={() => onQuantityChanged(3)}>3</Dropdown.Item>
              <Dropdown.Item as="div" onClick={() => onQuantityChanged(2)}>2</Dropdown.Item>
              <Dropdown.Item as="div" onClick={() => onQuantityChanged(1)}>1</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <span className="separator">=</span>
          <span className={`${insufficient ? 'insufficient' : ''}`}>{ totalAmount }ETH</span>
        </div>
        {/* <p className="mt-2">Choose how many NFT's you'd like to buy.<br/>You can buy between 1 and 5 NFT's per mint.</p> */}
        <div className="action-area">
          <div className="action-button mt-4 mb-2">
            <Button disabled={processing} onClick={confirmMint}>{ !processing ? 'Buy NFT\'s' : 'Confirming...' }</Button>
          </div>
          <u className="link" onClick={() => window.open('https://wamak77h4yt.typeform.com/zsnft-referral')}>Have a referral code?</u>
        </div>
      </>
    </div>
  )
}
