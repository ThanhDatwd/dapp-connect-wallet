/* eslint-disable react-hooks/rules-of-hooks */
import { Box ,Select,} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';
import Web3 from "web3";
import contractAbi from '../header/contractAbi.json';

const tokenOptions = [
  { value: '0x123', label: 'ETH' },
  { value: '0x456', label: "BNB" },
  { value: '0x789', label: 'DAI' },
];

const PaymentForm = () => {
  const [selectedToken, setSelectedToken] = useState(null);

  const handleTokenSelect = (event) => {
    setSelectedToken(event.target.value);
  }
    // const accounts =  web3.eth.getAccounts();
    // const tokenAddresses =  Promise.all(accounts.map(account => getTokenAddress(account)));
    
    // // Lấy số dư của các token
    // const tokenBalances =  Promise.all(tokenAddresses.map(tokenAddress => getTokenBalance(tokenAddress)));
    const [tokenBalance, setTokenBalance] = useState(null);
    const [amount, setAmount] = useState(0);
  
    // Lấy thông tin số dư của token được chọn
    useEffect(() => {
      const getTokenBalance = async () => {
        const tokenContract = new Web3.eth.Contract(contractAbi, selectedToken.value);
        const balance = await tokenContract.methods.balanceOf("0x44aA052063c521799e8fb75c5E1AFB1B4c1cD7ff").call();
        setTokenBalance(balance);
      };
      getTokenBalance();
    }, [selectedToken, "0x44aA052063c521799e8fb75c5E1AFB1B4c1cD7ff"]);
  
    // Hàm xử lý khi người dùng nhấn nút thanh toán
    const handlePayment = async () => {
      const tokenContract = new Web3.eth.Contract(contractAbi, selectedToken.value);
      const amountInWei = Web3.utils.toWei(amount, 'ether');
      try {
        // Gọi hàm chuyển đổi đồng
        await tokenContract.methods.transfer("0x44aA052063c521799e8fb75c5E1AFB1B4c1cD7ff", amountInWei).send({ from: "0x44aA052063c521799e8fb75c5E1AFB1B4c1cD7ff" });
        console.log('Payment successful');
      } catch (error) {
        console.error('Payment error:', error);
      }
    };
  return (
    <div>
      <h2>Thanh toán bằng token</h2>
      <form>
        <label>
          Số tiền muốn thanh toán:
          <input type="number" />
        </label>
        <label>
          Địa chỉ nhận tiền:
          <input type="text" />
        </label>
        <label>
          Chọn loại token muốn trả:
          <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedToken}
          label="selectedToken"
          onChange={handleTokenSelect}
        >
          <MenuItem value={'0x44aA052063c521799e8fb75c5E1AFB1B4c1cD7ff'}>ETH</MenuItem>
          <MenuItem value={'0x44aA052063c521799e8fb75c5E1AFB1B4c1cD7ff'}>BNB</MenuItem>
          <MenuItem value={'0x44aA052063c521799e8fb75c5E1AFB1B4c1cD7ff'}>DAI</MenuItem>
        </Select>
        </label>
        <button type="submit">Thanh toán</button>
      </form>
    </div>
  );
};

export default PaymentForm