import { useWeb3React } from '@web3-react/core';
import { ethers } from 'ethers';
import { useState, useEffect, useCallback, useRef } from 'react';

const Balance = () => {
  
  const context = useWeb3React()
  const { library } = context;

  const [balance, setBalance] = useState(0);
  // Using React ref here to prevent component re-rendering when changing
  // previous balance value
  const prevBalanceRef = useRef(0);

  const fetchBalance = useCallback(async () => {
    const provider = new ethers.providers.Web3Provider(library.provider);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    // console.log('get balance - ', address);

    const rawBalance = await provider.getBalance(address);
    // Format ETH balance and parse it to JS number
    const value = parseFloat(ethers.utils.formatEther(rawBalance)).toFixed(4);

    // Optimization: check that user balance has actually changed before
    // updating state and triggering the consuming component re-render
    if (value !== prevBalanceRef.current) {
      prevBalanceRef.current = value;
      setBalance(value);
    }
  }, [library]);

  // useEffect(() => {
  //   fetchBalance();
  // }, [fetchBalance]);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(library.provider);

    // Fetch user balance on each block
    provider.on('block', fetchBalance);

    // Cleanup function is used to unsubscribe from 'block' event and prevent
    // a possible memory leak in your application.
    return () => {
      provider.off('block', fetchBalance);
    };
  }, [fetchBalance, library]);

  return balance;
}

export default Balance;
