// import WalletConnect from "@walletconnect/web3-provider";
// import CoinbaseWalletSDK from "@coinbase/wallet-sdk";

export const providerOptions = {
  // walletlink: {
  //   package: CoinbaseWalletSDK, // Required
  //   options: {
  //     appName: "Web 3 Modal Demo", // Required
  //     infuraId: process.env.INFURA_KEY // Required unless you provide a JSON RPC url; see `rpc` below
  //   }
  // },
  // walletconnect: {
  //   package: WalletConnect, // required
  //   options: {
  //     infuraId: process.env.INFURA_KEY // required
  //   }
  // },
  injected: {
    display: {
      logo: "data:image/gif;base64,INSERT_BASE64_STRING",
      name: "Injected",
      description: "Connect with the provider in your Browser"
    },
    package: null
  },
};
