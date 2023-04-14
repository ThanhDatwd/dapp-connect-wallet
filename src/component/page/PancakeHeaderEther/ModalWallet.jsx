import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { IoWalletOutline, IoEllipsisHorizontalSharp } from "react-icons/io5";
import Web3 from "web3";



import { useWeb3React } from "@web3-react/core";
import { connectors } from "../../connectors";
const wallets = [
  {
    name: "Metamask",
    img: "https://pancakeswap.finance/images/wallets/metamask.png",
    provider: "injected",
  },
  {
    name: "CoinBase",
    img: "https://pancakeswap.finance/images/wallets/coinbase.png",
    provider: "coinbaseWallet",
  },
  {
    name: "WalletConnect",
    img: "https://pancakeswap.finance/images/wallets/walletconnect.png",
    provider: "walletConnect",
  },
  {
    name: "BinanceWallet",
    img: "https://pancakeswap.finance/images/wallets/binance.png",
    provider: "injected",
  },
];
const styleWalletItem = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  gap: "10px",
  margin: "auto",
  cursor: "pointer",
  ".wallet-name": {
    color: "#280d5f",
    fontSize: "12px",
    fontWeight: 400,
  },
};
export default function ModalWallet() {
  const web3 = new Web3(Web3.givenProvider);
  const [open, setOpen] = React.useState(false);
  const { activate,account} = useWeb3React();
  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClickConnector = async (provider) => {
    setProvider(provider);
    switch (provider) {
      case "injected":
        let a =await activate(connectors.injected);
        console.log("acount:::",account)

       alert(a)
        break;
      case "coinbaseWallet":
        let b=activate(connectors.coinbaseWallet);
        alert(a)
        break;
      case "walletConnect":
        activate(connectors.walletConnect);
        break;
      default:
        activate(connectors.injected);
        break;
    }
  };
  

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{
          height: "32px",
          padding: "0px 16px",
          borderRadius: "16px",
          fontWeight: "700",
          color: "#fff",
          backgroundColor: "#1fc7d4",
        }}
      >
        Connect Wallet
      </Button>
      
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          sx={{ background: "#e9f1f5", borderRadius: "inherit", padding: 0 }}
        >
          <Grid container spacing={2} sx={{ borderRadius: "inherit" }}>
            <Grid item xs={6} sx={{ borderRadius: "inherit" }}>
              <Box
                sx={{
                  background: "#fff",
                  padding: "32px 48px",
                  borderRadius: "inherit",
                }}
              >
                <Typography variant="h6">Connect Wallet</Typography>
                <Typography
                  variant="body1"
                  color="#7a6eaa"
                  sx={{
                    fontSize: "14px",
                    padding: "24px 0",
                    fontWeight: 500,
                    lineHeight: "22px",
                    textAlign: "justify",
                  }}
                >
                  Start by connecting with one of the wallets below. Be sure to
                  store your private keys or seed phrase securely. Never share
                  them with anyone.
                </Typography>
                <Box sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Box sx={styleWalletItem}>
                        <Box
                          sx={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "10px",
                            border: " 2px solid #7645d9;",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          onClick={() => {
                            activate(connectors.injected);
                            setProvider("coinbaseWallet");
                            handleClose();
                          }}
                        >
                          <IoWalletOutline fontSize={22} color="#1fc7d4" />
                        </Box>
                        <Typography
                          className="wallet-name"
                          variant="body1"
                          color="initial"
                        >
                          Injected
                        </Typography>
                      </Box>
                    </Grid>
                    {wallets.map((wallet,i) => {
                      return (
                        <Grid item xs={4}  key={i}>
                          <Box
                            sx={styleWalletItem}
                            onClick={() => {
                              handleClickConnector(wallet.provider);
                              handleClose();
                            }}
                          >
                            <Avatar
                              src={wallet.img}
                              sx={{
                                width: "50px",
                                height: "50px",
                                borderRadius: "10px",
                              }}
                            />
                            <Typography
                              className="wallet-name"
                              variant="body1"
                              color="initial"
                            >
                              {wallet.name}
                            </Typography>
                          </Box>
                        </Grid>
                      );
                    })}
                    <Grid item xs={4}>
                      <Box sx={styleWalletItem}>
                        <Box
                          sx={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "10px",
                            border: " 2px solid #7645d9;",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <IoEllipsisHorizontalSharp
                            fontSize={22}
                            color="#1fc7d4"
                          />
                        </Box>
                        <Typography
                          className="wallet-name"
                          variant="body1"
                          color="initial"
                        >
                          More
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
                sx={{
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography variant="h5" fontWeight={700} color={"#7645d9"}>
                  Haven’t got a wallet yet?
                </Typography>
                <Avatar
                  sx={{
                    width: "40%",
                    borderRadius: "10px",
                    height: "auto",
                    margin: "32px 0",
                  }}
                  src="https://cdn.pancakeswap.com/wallets/wallet_intro.png"
                />
                <Button variant="contained">Learn How To Connect</Button>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
