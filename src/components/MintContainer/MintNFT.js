import { useWeb3React } from '@web3-react/core';
import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import Balance from '../Balance';
import ContractABI from '../../abis/rinkeby.json';
import { CONTRACT_ADDRESS } from '../../constants/addresses';

const timerIDs = {};

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
  const [presaleCount, setPresaleCount] = useState(0);
  const [presaleSoldOut, setPresaleSoldOut] = useState(false);
  const [pubsaleCount, setPubsaleCount] = useState(0);
  const [soldOut, setSoldOut] = useState(false);
  const [presaleStartDate, setPresaleStartDate] = useState(new Date());
  const [presaleStarted, setPresaleStarted] = useState(false);
  const [presaleEnded, setPresaleEnded] = useState(false);
  const [presalePrice, setPresalePrice] = useState(0);
  const [pubsalePrice, setPubsalePrice] = useState(0);

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(library.provider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, provider);

      const salePlans = await contract.connect(signer).getSalePlans();

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

      setLoaded(true);
    })()
  }, [account, library]);

  useEffect(() => {
    setPresaleStarted(new Date() >= presaleStartDate);
  }, [presaleStartDate]);

  useEffect(() => {
    setPresaleSoldOut(presaleCount >= 5000);
  }, [presaleCount]);

  useEffect(() => {
    setSoldOut(presaleCount + pubsaleCount >= 9800);
  }, [presaleCount, pubsaleCount]);

  useEffect(() => {
    setPresaleEnded(!isPresale || presaleSoldOut);
  }, [isPresale, presaleSoldOut])

  useEffect(() => {
    setUnitPrice(isWhitelisted && !presaleEnded ? presalePrice : pubsalePrice);
  }, [isWhitelisted, presaleEnded, presalePrice, pubsalePrice]);

  useEffect(() => {
    setInsufficient(quantity === 0 || unitPrice * quantity > balance);
  }, [unitPrice, quantity, balance]);

  const onQuantityChanged = (value) => {
    setQuantity(value);
  };

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
        value: ethers.utils.parseEther(quantity * unitPrice + '')
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
    }
  };

  if (!loaded) {
    return (
      <div className="mint-area">
        <div className="action-area mt-3">
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
        <div className="action-area mt-3">
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
        <p className="my-3">The Public mint has been sold out. Feel free to check <u className="link" onClick={() => window.open('https://opensea.io')}>OpenSea</u> if you're interested in buying any NFT's in the public markets.</p>
        <div className="action-area mt-3">
          <div className="action-button">
            <Button disabled>Mint NFT's</Button>
          </div>
        </div>
      </div>
    );
  }

  if (!isWhitelisted && !isPubsale) {
    return (
      <div className="mint-area">
        <div className="action-area mt-3">
          <div className="action-button">
            <Button disabled>Mint NFT's</Button>
          </div>
        </div>
        <p className="mt-3">
          <a
            href="https://zensports.com/blog/zensportsia-nft-drop-how-to-enter-the-whitelist/"
            target="_blank"
            class="sub-text"
          >Review whitelist guidelines</a>
        </p>
      </div>
    );
  }

  if (isWhitelisted && !isPubsale) {
    if (presaleEnded) {
      if (presaleSoldOut) {
        return (
          <div className="mint-area">
            <p className="my-3">The Presale mint has been sold out. Come back on March 30, 2022 at 10am ET to buy NFT's during the Public mint.</p>
            <div className="action-area mt-3">
              <div className="action-button">
                <Button disabled>Mint NFT's</Button>
              </div>
            </div>
          </div>
        );
      } else {
        return (
          <div className="mint-area">
            <p className="my-3">The Presale mint is now over. Come back on March 30, 2022 at 10am ET to buy NFT's during the Public mint.</p>
            <div className="action-area mt-3">
              <div className="action-button">
                <Button disabled>Mint NFT's</Button>
              </div>
            </div>
          </div>
        );
      }
    }
  }

  return (
    <div className="mint-area">
      <>
        <p>Choose how many NFT's you'd like to buy. You can buy between 1 and 5 NFT's per mint.</p>

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
          <span className={`${insufficient ? 'insufficient' : ''}`}>{ unitPrice * quantity }ETH</span>
        </div>
        <div className="action-area mt-3">
          <div className="action-button">
            <Button disabled={processing} onClick={confirmMint}>{ !processing ? 'Buy NFT\'s' : 'Confirming...' }</Button>
          </div>
        </div>
      </>
    </div>
  )
}
