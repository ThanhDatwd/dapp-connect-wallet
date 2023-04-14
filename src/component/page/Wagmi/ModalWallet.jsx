import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { Avatar, Box, Typography,CircularProgress} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import { IoWalletOutline, IoEllipsisHorizontalSharp } from "react-icons/io5";
import { useConnect } from 'wagmi'
import { useWeb3React } from "@web3-react/core";
import { walletIcon } from "./connectors";

const styleWalletItem = {
  width:'100%',
  height:"100%",
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
  const { connect, connectors, error, isLoading, pendingConnector } =useConnect()
  console.log(connectors)
  const [open, setOpen] = React.useState(false);
  const { activate } = useWeb3React();
  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
        sx={{
            zIndex:80
        }}
      >
        <DialogContent
          sx={{ background: "#e9f1f5", borderRadius: "inherit", padding: 0 }}
        >
          <Grid container spacing={2} sx={{ borderRadius: "inherit" }}>
            <Grid item xs={12} md={6} sx={{ borderRadius: "inherit" }}>
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
                    
                    {connectors.map((connector,i) => {
                      return (
                        <Grid item xs={4}  key={i}>
                          <Box
                            sx={styleWalletItem}
                            onClick={() => {
                              connect({connector})
                              
                            }}
                          >
                             {isLoading && connector.id === pendingConnector?.id ?
                              <CircularProgress />
                              :<>
                                  <Avatar
                                    src={walletIcon[connector?.id]}
                                    sx={{
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "10px",
                                      // background:'#7645d9',
                                      // border: " 2px solid #7645d9;",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      "svg":{
                                        fontSize:'22px'
                                      }
                                    }}
                                  />
                                  <Typography
                                    className="wallet-name"
                                    variant="body1"
                                    color="initial"
                                  >
                                    {connector.name}
                                  </Typography>
                                </>
                            }
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
                 <Typography variant="body1" color="red" fontSize={"11px"} textAlign={'center'} marginTop={'10px'}>
                    {error===null?handleClose:<div>{error?.message}</div>}
                 </Typography>
              </Box>

            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  p:2,
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
