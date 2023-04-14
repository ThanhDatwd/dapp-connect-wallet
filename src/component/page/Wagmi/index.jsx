import React, { useCallback, useEffect, useMemo } from "react";
import {
  Avatar,
  Box,
  Container,
  Typography,
  Popover,
  Button,CircularProgress 
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

import ModalWallet from "./ModalWallet";
import {
  useAccount,
  useDisconnect,
  useEnsAvatar,
  useEnsName,
  useSignMessage,
  useBalance,
  useChainId,
  useNetwork,
  useProvider,
  useSigner,
  useContract,
  useSwitchNetwork,
  useToken,
  useContractRead,
  useContractEvent,
} from "wagmi";



// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const PancakeHeaderEther = () => {
  // const provider = new ethers.providers.InfuraProvider("mainnet", "678df701859d42808f45e3d4edae34fa")
  // provider.send("eth_requestAccounts", [])

  // const signer = provider.getSigner()
  const { address, connector, isConnected } = useAccount();
  const { chain } = useNetwork();
  const networks = useSwitchNetwork({
    throwForSwitchChainNotSupported: true,
  });
  const { data: signer } = useSigner({
    chainId: chain ? chain.id : 1,
  });
  const provider = useProvider({
    chainId: chain ? chain.id : 1,
  });
  const { data, isError } = useBalance({
    address: address ? address : "",
    chainId: chain ? chain.id : 1,
    watch: true,
    staleTime: 2000,
    cacheTime: 2000,
  });
  const { disconnect } = useDisconnect();
  const [networkSelectArea, setNetworkSelectArea] = React.useState(null);
  const [walletSelectArea, setWalletSelectArea] = React.useState(null);
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

  //  Khởi tạo smart contract
  const contract = useContract({
    address: myContractAbi.address,
    abi: myContractAbi.abi,
    signerOrProvider: signer,
  });

  //  lăng nghe contract event
  useContractEvent({
    address: myContractAbi.address,
    abi: myContractAbi.abi,
    eventName: "Transfer",
    listener(node, label, owner) {
      console.log("Lắng nghe sự kiện từ contract");
      console.log(node, label, owner);
    },
  });
  const contractRead = useContractRead({
    address: myContractAbi.address,
    abi: myContractAbi.abi,
    functionName: "balanceOf",
    args: [address],
  });
  const handleTransfer = async () => {
    const amount = ethers.utils.parseEther("1");
    // const contract = new ethers.Contract(myContractAbi.address, myContractAbi.abi, signer);
    // const tx = await contract.transfer(
    //   "0xD18F78fCA76205aB084a995cBc33b4662767819E",
    //   amount
    // );
    // await tx.wait();
    const b= await contract.balanceOf(address)
    if(ethers.utils.formatEther(b.toString())>amount){
      const contract = new ethers.Contract(myContractAbi.address, myContractAbi.abi, signer);
        const tx = await contract.transfer(
          "0xD18F78fCA76205aB084a995cBc33b4662767819E",
          amount
        );
        await tx.wait();
    }
    else{
      alert('You not enough Token to purchase!')
    }
  };
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
      <button onClick={handleTransfer}>check</button>
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
            {data?.formatted} {data?.symbol}
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
              {chain?.name}
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
                {networks.chains.map((x) => (
                    <MenuItem sx={{ cursor: "pointer" }}
                      disabled={!networks.switchNetwork || x.id === chain?.id}
                      onClick={() => networks?.switchNetwork?.(x.id)}
                      key={x.id}>
                      <Avatar
                        sx={{ width: "22px", height: "22px", mr: 2 }}
                        src={""}
                      />
                      <ListItemText sx={{ cursor: "pointer" }}>
                        {x?.name}
                      </ListItemText>
                      {networks.isLoading && networks.pendingChainId === x.id &&  <CircularProgress sx={{width:'20px',height:"20px"}}/>}
                     
                  </MenuItem>
                 ))}
                 <MenuItem>
                  <Typography sx={{ fontWeight: "400", fontSize:'12px', color:'red',textAlign:"center" }} variant="body1">
                    {networks.error && networks.error.message}
                  </Typography>
                </MenuItem>
              </MenuList>
            </Paper>
          </Popover>
        </Box>
        {/* Thông tin ví */}

        <Box>
          {address !== undefined ? (
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
                  <span>{address.substring(0, 6)}</span>.....
                  {address.substring(38)}
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
                    <MenuItem
                      sx={{ cursor: "pointer" }}
                      onClick={() => disconnect()}
                    >
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
              <ModalWallet />
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
