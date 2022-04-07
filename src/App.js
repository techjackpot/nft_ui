import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from "ethers";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import IndexPage from "./pages/index";

function getLibrary(provider) {
  return new ethers.providers.Web3Provider(provider);
}

function App() {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <IndexPage />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Web3ReactProvider>
  );
}

export default App;
