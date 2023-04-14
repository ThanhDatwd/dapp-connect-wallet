import React, { useEffect, useMemo, useState } from "react";
import Container from "@mui/material/Container";
import { OutlinedInput, Box, Typography, Button,TextField, Drawer } from "@mui/material";
import { RiWallet3Fill } from "react-icons/ri";
import { BsThreeDots,BsSearch } from "react-icons/bs";
import { FaUserAlt } from "react-icons/fa";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import "../../App.css";

import Web3 from "web3";
import myContractAbi from "./contractAbi.json";
import { useWeb3React } from "@web3-react/core";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import HeaderUserInfo from "../user";

const Home = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElUserPoper, setAnchorElUserPoper] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [openUserPoper, setOpenUserPoper] = React.useState(false);
  const [placement, setPlacement] = React.useState();
  const [placementUserPoper, setPlacementUserPoper] = React.useState();

  const { activate, deactivate } = useWeb3React();
  const [userAddress, setUserAddress] = useState();
  const web3 = new Web3(Web3.givenProvider);

  const handleOpenWalletPopver = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };
  const handleOpenUse = (newPlacement) => (event) => {
    setAnchorElUserPoper(event.currentTarget);
    setOpenUserPoper((prev) => placement !== newPlacement || !prev);
    setPlacementUserPoper(newPlacement);
  };

  const CoinbaseWallet = new WalletLinkConnector({
    url: `https://mainnet.infura.io/v3/678df701859d42808f45e3d4edae34fa`,
    appName: "Web3-react Demo",
    supportedChainIds: [1, 3, 4, 5, 42],
  });

  const WalletConnect = new WalletConnectConnector({
    rpcUrl: `https://mainnet.infura.io/v3/678df701859d42808f45e3d4edae34fa`,
    bridge: "https://bridge.walletconnect.org",
    qrcode: true,
  });

  const Injected = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42, 97],
  });
  useMemo(() => {
    web3.eth.getAccounts().then((accounts) => {
      const userAddress = accounts[0];
      setUserAddress(userAddress);
    });
  }, []);
   const [balance, setBalance] = React.useState();
  const [chainId, setChainId] = React.useState('');
  React.useEffect(() => {
    if (userAddress !== null) {
      web3.eth.getBalance(userAddress).then((balance) => {
        setBalance(web3.utils.fromWei(balance, "ether"));
      });
      // web3.eth.getSymbol(userAddress).then((sb) => {
      //  console.log(sb)
      // });
      // const tokenAddresses = ;
    
      // Lấy số dư của các token
      // const tokenBalances =  Promise.all(tokenAddresses.map(tokenAddress => getTokenBalance(tokenAddress)));
    }
  }, [userAddress,chainId]);

  // KẾT NỐI VỚI SMART CONTRACT
  async function createTransaction() {
    // Hàm giao dịch giữa các ví đồng native
  //   web3.eth.signTransaction({
  //     from: userAddress,
  //     gasPrice: "20000000000",
  //     gas: "21000",
  //     to: '0xD18F78fCA76205aB084a995cBc33b4662767819E',
  //     value: web3.utils.toWei("0.2", "ether") ,
  //     data: ""
  // }).then(console.log);
    // web3.eth.sendTransaction({
    //   from: userAddress,
    //   to: '0xD18F78fCA76205aB084a995cBc33b4662767819E',
    //   value:  web3.utils.toWei("0.2", "ether") 
    //   })
    //   .then(function(receipt){
    //     console.log(receipt)
    //   });

  // Giao dịch đồng token hàm write
    const myContract = new web3.eth.Contract(
      myContractAbi.abi,
      myContractAbi.address
    );
    // const tx = await myContract.methods.transferFrom(userAddress,"0xD18F78fCA76205aB084a995cBc33b4662767819E",web3.utils.toWei("1", "ether") ).send({
    //   from: userAddress,
    //   gas: "21000",
    // });
    // const signedTx = await web3.eth.signTransaction(tx);
   
    //  tương tác với hàm read call
    

     await myContract.methods.balanceOf(userAddress).call()
    .then(async(data)=>{
      if(web3.utils.fromWei(data, "ether")>1000){
        await myContract.methods.approve("0x9d1aa1f265C87E6BCE1fc1424ceDDA7573E7D7Bf",web3.utils.toWei("1", "ether")).send({
          from: userAddress,
         // gas: "21000",
        })
        .then( async() => {
          await myContract.methods.transferFrom(userAddress, "0x9d1aa1f265C87E6BCE1fc1424ceDDA7573E7D7Bf", 100).send({ from: "0x9d1aa1f265C87E6BCE1fc1424ceDDA7573E7D7Bf" })
            .then(() => alert("Chuyển token thành công!"))
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
      }
      else{
        alert('Số dư của bạn không đủ để thực hiện chức năng này')
      }
    })
  }

  //  ĐỔI MẠNG WALLET
  // const chainId = 137 // Polygon Mainnet

  
  return (
    <>
      <Box className="header" sx={{ padding: "20px",position:'sticky',top:'0',left:'0',zIndex:'2',width:'100%' }}>
        <Container maxWidth="lg" sx={{}}>
          <Box className="home__nav">
            <div className="logo">
              <img
                src="https://metaspacecy.com/static/media/HeaderLogoDark.fddedf94.png"
                alt=""
              />
            </div>
            <Box className="search" sx={{display:'flex',alignItems:'center',gap:'16px', backgroundColor:' rgba(177, 218, 255, 0.45)',padding:'0 10px', borderRadius:'12px',boxShadow: "4px 4px 10px 4px rgba(0 0 0 / 0.1)"}}>
              <BsSearch/>
              <OutlinedInput
                size="small"
              />
            </Box>
            <Box className="action" sx={{ display: "flex", gap: "10px",color:"#ffff" }}>
              <div
                className="connect-wallet"
                onClick={handleOpenWalletPopver("bottom-start")}
              >
                <RiWallet3Fill />
              </div>
              <div className="other">
                  {userAddress!==undefined?<FaUserAlt  onClick={handleOpenUse("bottom-start")}/>:<BsThreeDots  />}
              </div>
              <Popper
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
                sx={{zIndex:'10'}}
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{ p: 2, maxWidth: "300px" }}>
                      <Box>
                        <Typography
                          variant="h4"
                          sx={{
                            textAlign: "center",
                            mt: 1,
                            mb: 2,
                            fontWeight: 400,
                            fontStyle: "italic",
                          }}
                          color="initial"
                        >
                          Connect to Wallet
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ textAlign: "center" }}
                          color="initial"
                        >
                          Use any existing crypto wallet to connect to
                          Metaspacecy
                        </Typography>
                      </Box>
                      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                        <ListItem sx={{ cursor: "pointer" }}>
                          <ListItemAvatar>
                            <Avatar src="https://spacecywallet.com/favicon.ico"></Avatar>
                          </ListItemAvatar>
                          Spacecy Wallet
                        </ListItem>
                        <ListItem
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            activate(Injected);
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar src="https://raw.githubusercontent.com/hippospace/aptos-wallet-adapter/main/logos/petra.png"></Avatar>
                          </ListItemAvatar>
                          MetaMask
                        </ListItem>
                        <ListItem
                          sx={{ cursor: "pointer" }}
                          onClick={() => {
                            activate(WalletConnect);
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar src="https://raw.githubusercontent.com/hippospace/aptos-wallet-adapter/main/logos/martian.png"></Avatar>
                          </ListItemAvatar>
                          Spacecy Wallet
                        </ListItem>
                      </List>
                    </Paper>
                  </Fade>
                )}
              </Popper>
              <HeaderUserInfo
                open={openUserPoper}
                anchorEl={anchorElUserPoper}
                placement={placementUserPoper}
                userAddress={userAddress}
              />
            </Box>
          <Button variant="contained" onClick={createTransaction}>
            Tạo Transaction
          </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Home;
