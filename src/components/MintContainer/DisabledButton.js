import { Button } from 'react-bootstrap';

export default function DisabledButton() {
  return (
    <div className="mint-btn mb-4">
      <div className="mint-area">
        <div className="action-area">
          <div className="action-button">
            <Button disabled>Mint NFT's</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
