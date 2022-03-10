import { useWeb3React } from '@web3-react/core';
import React, { useState, useEffect } from 'react';
import { InputGroup, Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import Balance from './Balance';
import ContractABI from '../abis/rinkeby.json';
import { CONTRACT_ADDRESS } from '../constants/addresses';

const MintNFT = () => {
  const context = useWeb3React()
  const { account, library } = context;
  
  const balance = Balance();

  const [quantity, setQuantity] = useState(1);
  const [disabled, setDisabled] = useState(balance < 0);
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
    setDisabled(unitPrice * quantity > balance);
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
        pending: 'Waiting ...',
        success: 'Successfully minted',
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

      <div className="mt-3">
        <span>Your balance: </span>
        <span>{ balance } ETH</span>
      </div>
      { whitelisted && (
        <div className="my-3">
          <span>Congratulations! You are whitelisted.</span>
        </div>
      )}
      <div className="mt-3">
        <span>Price per NFT: </span>
        <span>{ unitPrice } ETH</span>
      </div>
      <div className="action-area mt-3">
        <div className="quantity-input-area">
          <InputGroup>
            <InputGroup.Text>Quantity</InputGroup.Text>
            <Form.Control
              type="number"
              min={1}
              max={5}
              value={quantity}
              onChange={(e) => onQuantityChanged(e.target.value)}
            />
          </InputGroup>
            <Form.Range
              min={1}
              max={5}
              step={1}
              value={quantity}
              onChange={(e) => onQuantityChanged(e.target.value)}
            />
        </div>
        <div className="action-button">
          <Button disabled={disabled} onClick={confirmMint}>{ !processing ? 'Confirm' : <Spinner size="sm" animation="border" /> }</Button>
        </div>
      </div>
    </div>
  )
}

export default MintNFT;
