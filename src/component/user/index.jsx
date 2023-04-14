import React from "react";
import { Box, Typography } from "@mui/material";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Avatar from "@mui/material/Avatar";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Web3 from "web3";
import { networkParams } from "../networks";

const HeaderUserInfo = ({
  open = false,
  anchorEl = null,
  placement = null,
  userAddress = null,
}) => {
  const web3 = new Web3(Web3.givenProvider);

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

  const handleChangeWalletNetWork = async (event) => {
    setChainId(event.target.value);
    if (window.ethereum.networkVersion !== event.target.value) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: web3.utils.toHex(event.target.value) }]
        });
      } catch (err) {
          // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          if(networkParams[event.target.value]!==undefined){
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                networkParams[event.target.value]
              ]
            });

          }
        }
      }
    }

  };
  return (
    <>
      <Popper open={open} anchorEl={anchorEl} placement={placement} transition  sx={{zIndex:'10'}}>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper sx={{ p: 2, maxWidth: "300px",background: "rgb(137, 174, 208)",color:"#fff" }}>
              <Box>
                <Box
                  sx={{ display: "flex", gap: "1rem", alignItems: "center",mb:2 }}
                >
                  <Avatar sizes="small" />
                  <span>{userAddress.substring(0, 12)}</span>.....
                  {userAddress.substring(38)}
                </Box>
              </Box>
              <List sx={{ width: "100%" }}>
                <ListItem
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{ display: "flex", gap: "1rem", alignItems: "center" }}
                  >
                    <Avatar sx={{ width: "20px", height: "20px" }} />
                    <span>BNB</span>
                  </Box>
                  <Typography
                    variant="span"
                    sx={{ textAlign: "center" }}
                  >
                    {balance}
                  </Typography>
                </ListItem>
                <ListItem sx={{ cursor: "pointer" }}>Favorite</ListItem>
                <ListItem sx={{ cursor: "pointer" }}>Profile</ListItem>
                <ListItem sx={{ cursor: "pointer" }}>MyCollection</ListItem>
                <ListItem sx={{ cursor: "pointer" }}>
                      <FormControl fullWidth>
                        <Select 
                          placeholder="Change network"
                          value={chainId}
                          onChange={handleChangeWalletNetWork}
                          sx={
                               {border:'none',color:'#fff',display:'flex',
                                'fieldset':{
                                      borderColor:'#fff',
                                      outlineColor:'#fff'
                                   }
                                }
                             }
                        >
                          <MenuItem value={97}> <Avatar sx={{ width: "20px", height: "20px", mr:1 }} />BNB</MenuItem>
                          <MenuItem value={5}> <Avatar sx={{ width: "20px", height: "20px", mr:1  }} />Goreli</MenuItem>
                          <MenuItem value={11155111}> <Avatar sx={{ width: "20px", height: "20px", mr:1  }} /> Sepolia</MenuItem>
                          <MenuItem value={"0x63564c40"}> <Avatar sx={{ width: "20px", height: "20px", mr:1  }} /> Harmony Mainnet</MenuItem>
                          <MenuItem value={"0xa4ec"}> <Avatar sx={{ width: "20px", height: "20px", mr:1  }} /> Celo Mainnet</MenuItem>
                        </Select>
                      </FormControl>

                </ListItem>
              </List>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default HeaderUserInfo;
