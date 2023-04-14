import "./App.css";
import Video from "./component/Video";
import Home from "./component/header";
import { Box, Typography } from "@mui/material";

import PancakePage from "./component/page";
// import SwapToken from './component/test/index2';
// import PaymentForm from './component/test/index3';
import { useWeb3React } from "@web3-react/core";

// const { wallet } = useWallet();

const activeChain = "ethereum";
function App() {
  const {
    library,
    chainId,
    account,
    activate,
    deactivate,
    active
  } = useWeb3React();

  return (
    <div className="App">
          <PancakePage/>
    
    </div>
  );
}

export default App;
