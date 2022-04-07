import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { ZENSPORTSIA_WEB3_URL, ZENSPORTSIA_APP_NAME, supportedChainIds } from '../constants/vars';

export const injected = new InjectedConnector({
  supportedChainIds,
});

export const coinbaseWallet = new WalletLinkConnector({
  url: ZENSPORTSIA_WEB3_URL,
  appName: ZENSPORTSIA_APP_NAME,
  supportedChainIds,
});

export const setConnector = (type) => {
  window.localStorage.setItem('provider', type);
  window.localStorage.removeItem('disconnectForced');
};

export const getConnector = () => window.localStorage.getItem('provider');
export const getSelectedConnector = () => getConnector() === 'coinbaseWallet' ? coinbaseWallet : injected;

export const activateInjectedProvider = (providerName) => {
  const { ethereum } = window;

  if (!ethereum || !ethereum.providers) {
    return false;
  }

  let provider;
  switch (providerName) {
    case 'coinbaseWallet':
      provider = ethereum.providers.find(({ isCoinbaseWallet }) => isCoinbaseWallet);
      break;
    case 'injected':
      provider = ethereum.providers.find(({ isMetaMask }) => isMetaMask);
      break;
    default:
      break;
  }

  if (provider) {
    ethereum.setSelectedProvider(provider);
    return true;
  }
};
