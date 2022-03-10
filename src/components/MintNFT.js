import { useWeb3React } from '@web3-react/core';
import React, { useState, useEffect } from 'react';
import { InputGroup, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { ethers } from 'ethers';
import Balance from './Balance';
import ContractABI from '../abis/rinkeby.json';
import { CONTRACT_ADDRESS } from '../constants/addresses';

export default function() {
  const context = useWeb3React()
  const { connector, active, account, error, activate, library } = context;
  
  const balance = Balance();

  const provider = new ethers.providers.Web3Provider(library.provider);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ContractABI, provider);

  const [quantity, setQuantity] = useState(1);
  const [disabled, setDisabled] = useState(balance < 0);

  useEffect(() => {
    // await contract.connect(signer).getSalePlans();
  }, [active, account, error, activate]);

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
  }

  return (
    <div className="mint-area">
      <p>Choose how many NFT's you'd like to buy. You can buy between 1 and 5 NFT's per mint.</p>
      <div className="action-area">
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
          <Button disabled={disabled}>Mint</Button> {disabled ? 'disabled' : 'enabled'} {balance}
        </div>
      </div>
    </div>
  )

}