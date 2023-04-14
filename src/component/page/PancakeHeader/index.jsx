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

import { useWeb3React } from "@web3-react/core";
import Web3 from "web3";
import { networkParams } from "../../networks";
import ModalWallet from "./ModalWallet";
import { Buffer } from "buffer";

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

const PancakeHeader = () => {


  const {
    library,
    account,
    activate,
    deactivate,
  } = useWeb3React();
  const web3 = new Web3(Web3.givenProvider);
  const provider = new ethers.providers.Web3Provider(window.ethereum)
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
  useEffect(() => {
      web3.eth.getAccounts().then((accounts) => {
      console.log(accounts)
      const userAddress = accounts[0];
      setUserAddress(userAddress);
      // dùng với promise
      web3.eth.getBalance(userAddress).then((balance) => {
        setBalance(web3.utils.fromWei(balance, "ether"));
      });
      switch (chainId) {
        case 5:
           setNetwork({name:"Goreli",type:'testnet'})
          break;
        case 97:
          setNetwork({name:"BNB",type:'testnet'})
          break;
        case 1:
          setNetwork({name:"Ethureum",type:'mainnet'})
          break;
        default:
          break;
      }
    });
  }, [chainId]);


  const handleConnectWalet = useCallback(async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setUserAddress(accounts[0]);
        await web3.eth.getChainId().then((data) => setChainId(data));
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask");
    }
  }, []);
  // useEffect(() => {
  //   handleConnectWalet();
  // }, [handleConnectWalet]);

  
  //  THAY ĐỔI NETWORK
  async function handleChangeWalletNetWork(chainId) {
    if (window.ethereum.networkVersion !== chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: web3.utils.toHex(chainId) }],
        });
      } catch (err) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          if (networkParams[chainId] !== undefined) {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [networkParams[chainId]],
            });
          }
        }
      }
      setChainId(chainId);
    }
  }

  // config message của phân chữ kkys
  // 0x48a8d512e0163b48aea5b930943c675a7b1e2e60db5eb4ea7628506babfa5fbf58539670aad352154e6b890c484e2114aa5466c7a4e775d5e41967bfd245be761b
  const typedData = {
    domain: {
      chainId:97,
      name: 'Example App',
      verifyingContract: myContractAbi.address,
      version: '1',
    },
    primaryType: 'Mail',
    types: {
      Mail: [
        { name: 'from', type: 'Person' },
        { name: 'to', type: 'Person' },
        { name: 'content', type: 'string' }
      ],
      Person: [
        { name: 'name', type: 'string' },
        { name: 'wallet', type: 'address' }
      ]
    },
    message :{
      from: {
         name: 'Alice',
         wallet: userAddress
      },
      to: {
         name: 'Bob',
         wallet: myContractAbi.address
      },
      content: 'Hello!'
    }
  };
  
  // chữ ký của user còn hiệu lực khi tài sản của họ sau khi  kí vẫn còn toàn vẹn
  // Yêu cầu người dùng ký 
  const signMessage = async () => {
    if (userAddress===undefined) return;
    try {
     const signature= await  window.ethereum.request({ 
        method: 'eth_signTypedData_v4',
         params: [userAddress, JSON.stringify(typedData)]
    })
      // const signature = await web3.eth.personal.sign(message, userAddress, '');
      // Hai cách
      // const signature = await window.ethereum.request({
      //   method: "personal_sign",
      //   params: [typedData, userAddress]
      // });
      setSignedMessage(typedData);
      setSignature(signature);
      console.log(signature)
      // Có thế lưu vào db
    } catch (error) {
      setError(error);
    }
  };
  const verifySignMessage= async ()=>{
     try {
      console.log("signature::::",signature)
     const recoveredAddress= utils.verifyTypedData(typedData.domain,typedData.types,typedData.message,"0x48a8d512e0163b48aea5b930943c675a7b1e2e60db5eb4ea7628506babfa5fbf58539670aad352154e6b890c484e2114aa5466c7a4e775d5e41967bfd245be761b")
     console.log(recoveredAddress)
        // if (recoveredAddress.toLowerCase() === userAddress.toLowerCase()) {
        //   console.log('Chữ ký hợp lệ.');
        // } else {
        //   console.log('Chữ ký không hợp lệ.');
        // }
      // await web3.eth.personal.ecRecover(typeData, signature)
      // .then((recoveredAddress) => {
      //   console.log(`address: ${userAddress}`)
      //   console.log(`recoveredAddress: ${recoveredAddress}`)
      //   if (recoveredAddress.toLowerCase() === userAddress.toLowerCase()) {
      //     console.log('Chữ ký hợp lệ.');
      //   } else {
      //     console.log('Chữ ký không hợp lệ.');
      //   }
      // });
     } catch (error) {
      console.log(error)
     }
  }

  // Dùng chữ ký và message của họ để lấy địa chỉ ví sau đó thực hiện các chức năng
async function transferToken(signature, amount) {
  //Xác minh lại chữ ký và message của họ
  //  mạng của smart contract phải cùng mạng với user thì mới hoạt đông được
  
  const myContract = new web3.eth.Contract(
    myContractAbi.abi,
    myContractAbi.address
  );
  const address = web3.eth.accounts.recover(typedData, signature);
  const balance = await myContract.methods.balanceOf(address).call();
  if (balance < amount) {
    throw new Error('Not enough balance');
  }
  const tx = await myContract.methods.transfer('0x456...', amount).send({ from: address });
  return tx;
}
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
                      onClick={() => handleChangeWalletNetWork(network.chainId)}
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
                        sad{" "}
                      </Typography>
                    </MenuItem>
                  </MenuList>
                </Paper>
              </Popover>
            </>
          ) : (
            <>
              <ModalWallet/> 
            </>
          )}
        </Box>
        
      </Box>
      {/* </Container> */}
    </Box>
  );
};

export default PancakeHeader;
