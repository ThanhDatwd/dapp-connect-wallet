import React from 'react'
// import PancakeHeader from './PancakeHeader'
import './pancake.css'
import PancakeHeaderEther from './PancakeHeaderEther';
import Wagmi from './Wagmi';
import { WagmiConfig,} from 'wagmi'
import {clientConfig } from './Wagmi/connectors';
import SectionOne from './PancakeBody';
 
// Set up client


const PancakePage = () => {
  return (
    <WagmiConfig client={clientConfig}>
       <Wagmi/>
       <SectionOne/>
    </WagmiConfig>
  )
}

export default PancakePage

