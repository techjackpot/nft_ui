import { useWeb3React } from '@web3-react/core';
import Wallet from './Wallet';

export default function HeaderInfo() {
  const { account } = useWeb3React();

  return (
    <div class="nav-toggler">
      <a
        href="https://discord.gg/gnwAUarJtx"
        target="_blank"
        title="Discord"
        rel="noreferrer"
      >
        <img
          src="images/discord_icon.png"
          alt="twitter"
          className="toggler-btn"
        />
      </a>
      <a
        href="https://twitter.com/zensportsia"
        target="_blank"
        title="Twitter"
        rel="noreferrer"
      >
        <img
          src="images/twitter_icon.png"
          alt="twitter"
          className="toggler-btn"
        />
      </a>
      { account && <Wallet /> }
    </div>
  );
}
