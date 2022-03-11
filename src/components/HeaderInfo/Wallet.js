import { useWeb3React } from '@web3-react/core';
import { NavDropdown } from 'react-bootstrap';
import Balance from '../Balance';

export default function Wallet() {
  const { account, deactivate } = useWeb3React();

  const balance = Balance();

  return (
    <NavDropdown title={account.slice(0, 4) + '......' + account.slice(-4)} id="wallet-dropdown">
      <div className="wallet-info">
        <div className="wallet-address">{ account }</div>
        <div className="wallet-balance">{ balance }ETH</div>
      </div>
      <NavDropdown.Divider />
      <NavDropdown.Item className="link-disconnect" onClick={deactivate}>Disconnect</NavDropdown.Item>
    </NavDropdown>
  );
}
