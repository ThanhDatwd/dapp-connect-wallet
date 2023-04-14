import React, { useState } from "react";
import Web3 from "web3";
import contractAbi from '../header/contractAbi.json';

function SwapToken() {
  const [inputTokenAddress, setInputTokenAddress] = useState("");
  const [outputTokenAddress, setOutputTokenAddress] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [outputAmount, setOutputAmount] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleInputTokenChange = (event) => {
    setInputTokenAddress(event.target.value);
  };

  const handleOutputTokenChange = (event) => {
    setOutputTokenAddress(event.target.value);
  };

  const handleInputAmountChange = (event) => {
    setInputAmount(event.target.value);
  };

  const swapTokens = async () => {
    const web3 = new Web3(Web3.givenProvider);
    const accounts = await web3.eth.getAccounts();
    const inputToken = new web3.eth.Contract(contractAbi, inputTokenAddress);
    const outputToken = new web3.eth.Contract(contractAbi, outputTokenAddress);
    const inputTokenBalance = await inputToken.methods.balanceOf(accounts[0]).call();
    if (inputTokenBalance < inputAmount) {
      alert("Insufficient balance");
      return;
    }
    const nonce = await web3.eth.getTransactionCount(accounts[0]);
    const gasPrice = await web3.eth.getGasPrice();
    const inputTokenTransferData = inputToken.methods.transfer(outputTokenAddress, inputAmount).encodeABI();
    const txData = {
      nonce: nonce,
      gasPrice: gasPrice,
      to: inputTokenAddress,
      data: inputTokenTransferData
    };
    // const signedTx = await web3.eth.accounts.signTransaction(txData, process.env.REACT_APP_PRIVATE_KEY);
    // const tx = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    // const outputTokenBalance = await outputToken.methods.balanceOf(accounts[0]).call();
    // setOutputAmount(outputTokenBalance);
    // setTxHash("Transaction hash: " + tx.transactionHash);
  };

  return (
    <div>
      <label>
        Input token:
        <select value={inputTokenAddress} onChange={handleInputTokenChange}>
          <option value="">Select input token</option>
          <option value="0x123...">Token A</option>
          <option value="0x456...">Token B</option>
          <option value="0x789...">Token C</option>
        </select>
      </label>
      <br />
      <label>
        Output token:
        <select value={outputTokenAddress} onChange={handleOutputTokenChange}>
          <option value="">Select output token</option>
          <option value="0x123...">Token A</option>
          <option value="0x456...">Token B</option>
          <option value="0x789...">Token C</option>
        </select>
      </label>
      <br />
      <label>
        Input amount:
        <input type="text" value={inputAmount} onChange={handleInputAmountChange} />
      </label>
      <br />
      <button onClick={swapTokens}>Swap tokens</button>
      <br />
      <label>Output amount: {outputAmount}</label>
      <br />
      <label>{txHash}</label>
</div>
);
}

export default SwapToken;
