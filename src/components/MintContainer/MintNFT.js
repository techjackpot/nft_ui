import { useWeb3React } from '@web3-react/core';
import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import Balance from '../Balance';
import ContractABI from '../../abis/rinkeby.json';
import { CONTRACT_ADDRESS } from '../../constants/addresses';

export default function MintNFT() {
  const { account, library } = useWeb3React();
  
  const balance = Balance();

  const [quantity, setQuantity] = useState(1);
  const [insufficient, setInsufficient] = useState(balance < 0);
  const [whitelisted, setWhitelisted] = useState(false);
  const [unitPrice, setUnitPrice] = useState(0);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    (async () => {
      const provider = new ethers.providers.Web3Provider(library.provider);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, provider);

      const is_whitelisted = await contract.connect(signer).whitelists(account);
      setWhitelisted(is_whitelisted);

      const salePlans = await contract.connect(signer).getSalePlans();
      setUnitPrice(parseFloat(ethers.utils.formatEther(is_whitelisted ? salePlans.mintPrice1 : salePlans.mintPrice2)));
    })()
  }, [account, library]);

  useEffect(() => {
    setInsufficient(unitPrice * quantity > balance);
  }, [unitPrice, quantity, balance]);

  const onQuantityChanged = (value) => {
    let newQuantity = value;
    if (newQuantity < 1) {
      newQuantity = 1;
      toast.error('Oops! You must buy between 1 and 5 NFTs. Try again.');
    }
    if (newQuantity > 5) {
      newQuantity = 5;
      toast.error('Oops! You must buy between 1 and 5 NFTs. Try again.');
    }
    setQuantity(newQuantity);
  };

  const confirmMint = async () => {
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
          }
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

  return (
    <div className="mint-area">
      <p>Choose how many NFT's you'd like to buy. You can buy between 1 and 5 NFT's per mint.</p>

      { whitelisted && (
        <p className="my-3">
          <span>Congratulations! You are whitelisted.</span>
        </p>
      )}
      <div className="quantity-input-area">
        <span>Price per NFT: { unitPrice }ETH</span>
        <span className="separator">&times;</span>
        <Form.Control
          type="number"
          min={1}
          max={5}
          value={quantity}
          onChange={(e) => onQuantityChanged(e.target.value)}
        />
        <span className="separator">=</span>
        <span className={`${insufficient ? 'insufficient' : ''}`}>{ unitPrice * quantity }ETH</span>
      </div>
      <div className="action-area mt-3">
        <div className="action-button">
          <Button disabled={insufficient || processing} onClick={confirmMint}>{ !processing ? 'Buy NFT\'s' : 'Confirming...' }</Button>
        </div>
      </div>
    </div>
  )
}
