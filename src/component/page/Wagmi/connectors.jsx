import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
// wallet connect version 1
import { WalletConnectLegacyConnector } from 'wagmi/connectors/walletConnectLegacy'
// wallet connect versiion 2
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { WagmiConfig, createClient, configureChains, mainnet} from 'wagmi'
import { avalanche, bsc, bscTestnet,goerli } from '@wagmi/chains'
 
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public'

import metamaskIcon from '../../../images/wallets/metamask.png'
import coinbaseIcon from '../../../images/wallets/coinbase.png'
import walletConnectIcon from '../../../images/wallets/walletconnect.png'
import injected from '../../../images/wallets/injected.svg'
const { chains, provider, webSocketProvider } = configureChains(
    [mainnet, avalanche, bsc,bscTestnet,goerli ],
    [
        // alchemyProvider({ apiKey: 'yourAlchemyApiKey' }), 
        infuraProvider({ apiKey:"678df701859d42808f45e3d4edae34fa"}),
        publicProvider(),
    ],
  )
 export const walletIcon={
    metaMask:metamaskIcon,
    coinbaseWallet:coinbaseIcon,
    walletConnect:walletConnectIcon,
    injected:injected
 }
 export const connectorsConfig = [
    {
        image:metamaskIcon,
        wallet:new MetaMaskConnector({ chains })
    },
    {
        image:coinbaseIcon,
        wallet:new CoinbaseWalletConnector({
            chains,
            options: {
              appName: 'wagmi',
            },
          })
    },
    {
        image:walletConnectIcon,
        wallet:new WalletConnectConnector({
            chains,
            options: {
              projectId: '1441e226cb28e168c1d7e73dafe24acb',
            },
          })
    },
  ];
  export const clientConfig = createClient({
    autoConnect: true,
    connectors: [
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }),
        new MetaMaskConnector({ chains }),
        new CoinbaseWalletConnector({
          chains,
          options: {
            appName: 'wagmi',
          },
        }),
        new WalletConnectConnector({
          chains,
          options: {
            projectId: '1441e226cb28e168c1d7e73dafe24acb',
            //  qrcode: true,
          },
        }),
        
      ],
    provider,
    webSocketProvider,
  })
  