import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42,97]
});

const walletconnect = new WalletConnectConnector({
  rpcUrl: `https://mainnet.infura.io/v3/678df701859d42808f45e3d4edae34fa`,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true
});

const CoinbaseWallet = new WalletLinkConnector({
  url: `https://mainnet.infura.io/v3/678df701859d42808f45e3d4edae34fa`,
  appName: "Web3-react Demo",
  supportedChainIds: [1, 3, 4, 5, 42],
 });

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: CoinbaseWallet
};