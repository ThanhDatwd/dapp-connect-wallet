import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { IoTicket } from "react-icons/io5";
import { FaAward } from "react-icons/fa";
const SectionOne = () => {
  return (
    <Box
      sx={{
        padding: "100px",
        background: "linear-gradient(180deg,#6fb6f1 0%,#eaf2f6 100%);",
      }}
    >
      <Container maxWidth="md">
        <Box
          className="play-game"
          sx={{
            padding: "40px",
            background: "rgb(255 255 255 / 60%)",
            border: "1px solid #e7e3eb",
            backdropFilter: "blur(12px)",
            borderRadius: "72px",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                "&::first-letter": {
                    color: "rgb(40, 13, 95)",
                },
              }}
              mb={"24px"}
            >
              Win millions in prizes
            </Typography>
            <Typography
              variant="body1"
              color={"#7a6eaa"}
              fontWeight={600}
              mb="8px"
            >
              Provably fair, on-chain games.
            </Typography>
            <Typography
              variant="body1"
              color={"#7a6eaa"}
              fontWeight={600}
              mb={"40px"}
            >
              Win big with PancakeSwap.
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "40px",
              maxWidth: "600px",
              margin: "auto",
            }}
          >
            <Box
              sx={{
                flex:'1',
                transform: " rotate(-2.36deg)",
                background: "rgb(255 178 55)",
                borderRadius: "24px",
                paddingBottom: "8px",
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(rgb(255, 178, 55) 0%, rgb(255, 205, 81) 51.17%, rgb(255, 231, 106) 100%)",
                  padding: "24px",
                  borderRadius: "24px",
                //   position: "relative",
                  color: "rgb(40, 13, 95)",
                }}
              >
                <Box sx={{ textAlign: "right" }}>
                  <FaAward size={"30px"} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginTop: "14px",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{
                        color: "inherit",
                        fontWeight: 700,
                        lineHeight: 1.5,
                        fontSize: "16px",
                      }}
                    >
                      Prediction
                    </Typography>
                    <Typography
                      variant="h4"
                      color="initial"
                      sx={{
                        margin: "8px 0",
                        fontWeight: 700,
                        color: "inherit",
                      }}
                    >
                      $1.2 billion
                    </Typography>
                    <Typography
                      sx={{
                        color: "inherit",
                        fontWeight: 700,
                        lineHeight: 1.5,
                        fontSize: "16px",
                        marginBottom: "24px",
                      }}
                      variant="body1"
                      color="initial"
                    >
                      in BNB + CAKE won so far
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "inherit",
                        fontWeight: 700,
                        lineHeight: 1.5,
                        marginBottom: "40px",
                        fontSize: "16px",
                      }}
                      color="initial"
                    >
                      Predict the price trend of BNB or CAKE to win
                    </Typography>
                  </Box>
                  <Button variant="outlined" color="primary">
                    Play
                  </Button>
                </Box>
              </Box>
            </Box>
            {/* HỘP SỐ 2 */}
            <Box
              sx={{
                flex:'1',
                transform: " rotate(2.36deg)",
                background: "rgb(60 23 134)",
                borderRadius: "24px",
                paddingBottom: "8px",
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(rgb(118, 69, 217) 0%, rgb(81, 33, 177) 100%);",
                  padding: "24px",
                  borderRadius: "24px",
                  position: "relative",
                  color: "#ffff",
                }}
              >
                <Box sx={{ textAlign: "right" }}>
                  <IoTicket size={"30px"} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    marginTop: "14px",
                  }}
                >
                  <Box>
                    <Typography
                      variant="body1"
                      color="initial"
                      sx={{
                        color: "inherit",
                        fontWeight: 700,
                        lineHeight: 1.5,
                        fontSize: "16px",
                      }}
                    >
                      Lottery
                    </Typography>
                    <Typography
                      variant="h4"
                      sx={{
                        margin: "8px 0",
                        fontWeight: 700,
                        color: "rgb(255 178 55)",
                      }}
                    >
                     $82,392
                    </Typography>
                    <Typography
                      sx={{
                        color: "inherit",
                        fontWeight: 700,
                        lineHeight: 1.5,
                        fontSize: "16px",
                        marginBottom: "24px",
                      }}
                      variant="body1"
                    >
                      in CAKE prizes this round
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        color: "inherit",
                        fontWeight: 700,
                        lineHeight: 1.5,
                        marginBottom: "40px",
                        fontSize: "16px",
                      }}
                    >
                      Buy tickets with CAKE, win CAKE if your numbers match
                    </Typography>
                  </Box>
                  <Button variant="outlined" color="primary">
                    Buy Ticket
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SectionOne;
