import { ThemeProvider, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useWeb3React } from '@web3-react/core';
import OnboardinButton from './OnboardinButton';
import MintNFT from './MintNFT';
import { useEagerConnect, useInactiveListener } from '../hooks';
import React, { useState, useEffect } from 'react';

const MintContainer = () => {
  const context = useWeb3React()
  const { connector, account, error } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();
  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    if (error) {
      // console.log(error);
      toast.error(error.message);
    }
  }, [error])

  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
    >
      <Container className="AppContainer">
        <Row>
          <Col>
            <OnboardinButton />
          </Col>
        </Row>
        <Row>
          <Col>
            { account && <MintNFT /> }
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
}

export default MintContainer;
