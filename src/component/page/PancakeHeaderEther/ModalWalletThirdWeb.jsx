import React from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

;

function ModalWalletThirdWeb() {
  return (
    <>
      <ConnectWallet
        color="light"
        dropdownPosition={{ side: "bottom", align: "center" }}
      />
    </>
  );
}

export default ModalWalletThirdWeb;
