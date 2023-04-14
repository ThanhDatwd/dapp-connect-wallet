import React, { useCallback, useEffect, useMemo } from "react";
import {
  Avatar,
  Box,
  Container,
  Typography,
  Popover,
  Button,
} from "@mui/material";
import {
  MdOutlineLanguage,
  MdSettings,
  MdKeyboardArrowDown,
} from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { BigNumber, ethers, utils } from "ethers";
import myContractAbi from "../../header/contractAbi.json";
import scLandAbi from "../../header/scLand.json";

import { useWeb3React } from "@web3-react/core";
import { networkParams } from "../../networks";
import ModalWallet from "./ModalWallet";
import { Buffer } from "buffer";
import ModalWalletThirdWeb from "./ModalWalletThirdWeb";

const networkOption = [
  {
    chainId: 97,
    name: "BNB",
    img: "https://pancakeswap.finance/images/chains/56.png",
  },
  {
    chainId: 5,
    name: "Goreli",
    img: "https://rpc.info/_next/image?url=%2Flogos%2Fgoerli.png&w=32&q=75",
  },
  {
    chainId: 5,
    name: "Ethureum",
    img: "https://pancakeswap.finance/images/chains/1.png",
  },
  {
    chainId: 11155111,
    name: "Sepolia",
    img: "https://rpc.info/_next/image?url=%2Flogos%2Fgoerli.png&w=32&q=75",
  },
  {
    chainId: "0x63564c40",
    name: "Harmony Mainnet",
    img: "https://rpc.info/_next/image?url=%2Flogos%2Fharmony-testnet.png&w=32&q=75",
  },
];

const PancakeHeaderEther = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  // provider.send("eth_requestAccounts", [])
  
  const signer = provider.getSigner()

  const [userAddress, setUserAddress] = React.useState();
  const [networkSelectArea, setNetworkSelectArea] = React.useState(null);
  const [walletSelectArea, setWalletSelectArea] = React.useState(null);
  const [balance, setBalance] = React.useState();
  const [chainId, setChainId] = React.useState("");
  const [network, setNetwork] = React.useState();

  // const [message, setMessage] = React.useState("");
  const [signedMessage, setSignedMessage] = React.useState("");
  const [verified, setVerified] = React.useState();
  const [signature, setSignature] = React.useState("");
  const [error, setError] = React.useState("");

  const handleSelectNetWork = (event) => {
    setNetworkSelectArea(event.currentTarget);
  };
  const handleSelectWallet = (event) => {
    setWalletSelectArea(event.currentTarget);
  };

  const handleCloseNetWork = () => {
    setNetworkSelectArea(null);
  };
  const handleCloseWallet = () => {
    setWalletSelectArea(null);
  };

  const openSelectWallet = Boolean(walletSelectArea);
  const openSelectNetWork = Boolean(networkSelectArea);

  //   PHẦN KẾT NỐI  VỚI VÍ
  const getData=async()=>{
    const userAdress= await signer.getAddress()
    setUserAddress(userAdress)
    const accounts = await provider.listAccounts();
    console.log("list account :::",accounts)
  }
  useEffect(() => {
    getData()
  }, [chainId]);

  // config message của phân chữ kkys
  // 0x48a8d512e0163b48aea5b930943c675a7b1e2e60db5eb4ea7628506babfa5fbf58539670aad352154e6b890c484e2114aa5466c7a4e775d5e41967bfd245be761b
  const domain = {
    name: 'Ether Mail',
    version: '1',
    chainId: 97,
    verifyingContract: myContractAbi.address
};

// The named list of all type definitions
const types = {
    Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' }
    ],
    Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'contents', type: 'string' }
    ]
};
// The data to sign
const value = {
    from: {
        name: 'Cow',
        wallet: '0x44aA052063c521799e8fb75c5E1AFB1B4c1cD7ff'
    },
    to: {
        name: 'Bob',
        wallet: '0x9d1aa1f265C87E6BCE1fc1424ceDDA7573E7D7Bf'
    },
    contents: 'Hello, Bob!'
};

  
  // chữ ký của user còn hiệu lực khi tài sản của họ sau khi  kí vẫn còn toàn vẹn
  // Yêu cầu người dùng ký 
  const signMessage = async () => {
    if (userAddress===undefined) return;
    try {
      let signature = await signer._signTypedData(domain, types, value);
      setSignature(signature);
    } catch (error) {
      setError(error);
    }
  };
  const verifySignMessage= async ()=>{
     try {
      console.log("signature::::",signature)
      const recoveredAddress= utils.verifyTypedData(domain,types,value,signature)
      console.log(recoveredAddress)
     } catch (error) {
      console.log(error)
     }
  }
  const handleDisconnect=()=>{
  }
  const checkAcountOrSC= async()=>{
    // điều này giúp chúng ta biết được khi nào nên dùng sendTransaction khi nào dùng transfer
    // có một số trường hợp sc trả về 
    const bytecode = await provider.getCode(myContractAbi.address);
    if (bytecode === "0x") {
      console.log(`${myContractAbi.address} là một địa chỉ tài khoản`);
    } else {
      console.log(`${myContractAbi.address} là một địa chỉ smart contract`);
    }
  }
  const handleChectNetWorkUserAndSc= async()=>{
    //  Lưu ý mạng của user phải cùng mạng với smart contract thì mới hoạt động được
    // Get mạng của user :
    const userNetWork= await provider.getNetwork();
    console.log(userNetWork)
    // Get mạng của smart contract
    const contract = new ethers.Contract(myContractAbi.address, myContractAbi.abi, provider);
    const contractNetwork = await contract.provider.getNetwork();
    console.log(contractNetwork)
    console.log(contract)
    //check mạng của user và lấy scAdress tương 

  }
  const handleListenerWalletOnChange=()=>{
    const handleAccountsChanged=()=>{
      console.log('người dùng đang thay đổi ví')
      window.ethereum.off('accountsChanged', handleAccountsChanged);
    }
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      // 
    const handleChainChanged=()=>{
      console.log('người dùng đang thay đổi chainid')
      window.ethereum.off('chainChanged', handleChainChanged);
    }
      window.ethereum.on('chainChanged', handleChainChanged);
    // 
    const handleNetworkChanged=()=>{
      console.log('người dùng đang thay đổi chainid')
      window.ethereum.off('chainChanged', handleNetworkChanged);
    }
      window.ethereum.on('networkChanged', handleNetworkChanged);
    const handleConnect=()=>{
      console.log('user đang kết nối')
      window.ethereum.off('connect', handleConnect);
    }
      window.ethereum.on('connect', handleConnect);
      window.ethereum.on('disconnect', function (chainId) {
        console.log('ngắt kết nối với ví')
         
      });
  }
  handleListenerWalletOnChange()
  return (
    <Box
      className="pancake-header"
      sx={{
        padding: "8px 16px",
        borderBottom: "1px solid #e7e3eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
     <Button onClick={signMessage}>sign</Button>
     <Button onClick={verifySignMessage}>verify</Button>
     <Button onClick={handleDisconnect}>Disconnect</Button>
     <Button onClick={checkAcountOrSC}>Check</Button>
     <Button onClick={handleChectNetWorkUserAndSc}>Check nw user and sc</Button>
      {/* <Container maxWidth="lg"> */}
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
          <img
            className="pancake-header__logo"
            src="https://altcoinsbox.com/wp-content/uploads/2023/02/full-pancakeswap-logo.webp"
            alt=""
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              a: {
                display: "flex",
                alignItems: "center",
                padding: "0 16px",
                color: "#7a6eaa",
                height: "48px",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                "&:hover": {
                  background: "#eff4f5",
                  borderRadius: "8px",
                },
              },
            }}
          >
            <Typography variant="body1" color="initial">
              <a href="">Trade</a>
            </Typography>
            <Typography variant="body1" color="initial">
              <a href="">Earn</a>
            </Typography>
            <Typography variant="body1" color="initial">
              <a href="">Win</a>
            </Typography>
            <Typography variant="body1" color="initial">
              <a href="">NFT</a>
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Box
          className="balance"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Avatar sx={{ width: "22px", height: "22px", mr: 1 }} />
          <Typography variant="body1" fontWeight={900} color={"#7a6eaa"}>
            {balance}
          </Typography>
        </Box>
        <Box className="language" sx={{ cursor: "pointer" }}>
          <MdOutlineLanguage size={26} color="#7a6eaa" />
        </Box>
        <Box className="language" sx={{ cursor: "pointer" }}>
          <MdSettings size={26} color="#7a6eaa" />
        </Box>
        <Box>
          <Box
            sx={{
              position: "relative",
              background: "#eff4f5",
              boxShadow: "rgb(0 0 0 / 10%) 0px -2px 0px inset",
              height: "32px",
              paddingLeft: "32px",
              paddingRight: "8px",
              display: "inline-flex",
              alignItems: "center",
              borderRadius: "16px",
              cursor: "pointer",
            }}
            onClick={handleSelectNetWork}
          >
            <Avatar
              src="https://pancakeswap.finance/images/chains/56.png"
              sx={{
                position: "absolute",
                left: 0,
                maxWidth: "32px",
                maxHeight: "32px",
              }}
            />
            <Typography
              sx={{ margin: "0 8px", fontWeight: "700" }}
              variant="body2"
              color="initial"
            >
              {network !== undefined ? network.name+ " " +network.type : ""}
            </Typography>
            <MdKeyboardArrowDown size={22} />
          </Box>
          <Popover
            id="simple-popover2"
            open={openSelectNetWork}
            anchorEl={networkSelectArea}
            onClose={handleCloseNetWork}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Paper sx={{ width: 320, maxWidth: "100%", mt: 1 }}>
              <MenuList
                sx={{ fontWeight: "700" }}
                className="pancake-paperHover"
              >
                <MenuItem>
                  <Typography sx={{ fontWeight: "600" }} variant="body1">
                    Select a Network
                  </Typography>
                </MenuItem>
                <Divider />
                {networkOption.map((network, i) => {
                  return (
                    <MenuItem
                      
                      sx={{ cursor: "pointer" }}
                      key={i}
                    >
                      <Avatar
                        sx={{ width: "22px", height: "22px", mr: 2 }}
                        src={network.img}
                      />
                      <ListItemText sx={{ cursor: "pointer" }}>
                        {network.name}
                      </ListItemText>
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Paper>
          </Popover>
        </Box>
        {/* Thông tin ví */}

        <Box>
          {userAddress !== undefined ? (
            <>
              <Box
                aria-describedby={"simple-popover2"}
                sx={{
                  position: "relative",
                  background: "#eff4f5",
                  boxShadow: "rgb(0 0 0 / 10%) 0px -2px 0px inset",
                  height: "32px",
                  paddingLeft: "32px",
                  paddingRight: "8px",
                  display: "inline-flex",
                  alignItems: "center",
                  borderRadius: "16px",
                  cursor: "pointer",
                }}
                onClick={handleSelectWallet}
              >
                <Box
                  sx={{
                    position: "absolute",
                    left: 0,
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: "1px solid #1fc7d4",
                    background: "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IoWalletOutline fontSize={22} color="#1fc7d4" />
                </Box>
                <Typography
                  sx={{ margin: "0 8px", fontWeight: "700" }}
                  variant="body2"
                  color="initial"
                >
                  <span>{userAddress.substring(0, 6)}</span>.....
                  {userAddress.substring(38)}
                </Typography>
                <MdKeyboardArrowDown size={22} />
              </Box>
              <Popover
                id="simple-popover"
                open={openSelectWallet}
                anchorEl={walletSelectArea}
                onClose={handleCloseWallet}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Paper sx={{ width: 320, maxWidth: "100%", mt: 1 }}>
                  <MenuList
                    sx={{ fontWeight: "700" }}
                    className="pancake-paperHover"
                  >
                    <MenuItem>
                      <Typography sx={{ fontWeight: "600" }} variant="body1">
                        Wallet
                      </Typography>
                    </MenuItem>
                    <MenuItem>
                      <Typography sx={{ fontWeight: "600" }} variant="body1">
                        Recent Transactions
                      </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem sx={{ cursor: "pointer" }}>
                      <ListItemText>Your NFTs</ListItemText>
                    </MenuItem>
                    <MenuItem sx={{ cursor: "pointer" }}>
                      <ListItemText>Make profile</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem sx={{ cursor: "pointer" }}>
                      <ListItemText>Disconnect</ListItemText>
                      <Typography variant="body2" color="text.secondary">
                        {"-->"}
                      </Typography>
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Popover>
            </>
          ) : (
            <>
              <ModalWallet/> 
              {/* <ModalWalletThirdWeb/> */}
            </>
          )}
        </Box>
        
      </Box>
      {/* </Container> */}
    </Box>
  );
};

export default PancakeHeaderEther;
