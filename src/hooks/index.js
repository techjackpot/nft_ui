import { useState, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';

import {
  getConnector,
  activateInjectedProvider,
  getSelectedConnector,
} from '../connectors';

export function useEagerConnect() {
  const { activate, active } = useWeb3React()

  const [tried, setTried] = useState(false)

  useEffect(() => {
    const disconnectForced = window.localStorage.getItem('disconnectForced');

    if (disconnectForced === '1') {
      setTried(true)
    } else {
      if (activateInjectedProvider(getConnector())) {
        if (getConnector() === 'coinbaseWallet') {
          activate(getSelectedConnector(), undefined, true).catch(() => {
            setTried(true)
          })
        } else {
          getSelectedConnector().isAuthorized().then((isAuthorized) => {
            if (isAuthorized) {
              activate(getSelectedConnector(), undefined, true).catch(() => {
                setTried(true)
              })
            } else {
              setTried(true)
            }
          })
        }
      }
    }
  }, []) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true)
    }
  }, [tried, active])

  return tried
}

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React()

  useEffect(() => {
    const { ethereum } = window
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleConnect = () => {
        // console.log("Handling 'connect' event")
        activate(getSelectedConnector())
      }
      const handleChainChanged = (chainId) => {
        // console.log("Handling 'chainChanged' event with payload", chainId)
        activate(getSelectedConnector())
      }
      const handleAccountsChanged = (accounts) => {
        // console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          activate(getSelectedConnector())
        }
      }
      const handleNetworkChanged = (networkId) => {
        // console.log("Handling 'networkChanged' event with payload", networkId)
        activate(getSelectedConnector())
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    }
  }, [active, error, suppress, activate])
}
