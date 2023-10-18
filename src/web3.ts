import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { formatUnits, parseUnits } from "@ethersproject/units";
import TOKEN_ABI from './tokenAbi'

const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000'

const TRANSFORM_ADDRESS = "0x3F94bc9C56afd05D011C7E6673841438e1ae4846"
const GAS = 320000;

export const parseAmount = (num : string = "0", decimal: number = 18) => {
  return parseUnits(num, decimal).toString();
};

export const getWalletInfo = async () => {
  if (typeof (window as any).ethereum === 'undefined') {
    // 没安装MetaMask钱包进行弹框提示
    alert('Looks like you need a Dapp browser to get started.')
  } else {
    // 如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
    try {
      const accounts = await (window as any).ethereum.enable()
      const web3 = new Web3((window as any).ethereum)
      const chainId = await web3.eth.net.getId()
      console.log('accounts======', accounts)
      return {
        address: accounts[0],
        chainId: chainId
      }
    } catch (error) {
      return {
        address: EMPTY_ADDRESS,
        chainId: 0
      }
    }
  }
}

const myObject: Record<string, any> = {}

export const deposit = async (amount : string | number = "0", tokenName:string = "USDC") => {

  // const TOKEN = {
  //   USDT: {
  //     contract: "",
  //     decimal: 6,
  //     name: "USDT"
  //   },
  //   USDC: {
  //     contract: "0xe9DcE89B076BA6107Bb64EF30678efec11939234",
  //     decimal: 6,
  //     name: "USDC"
  //   }
  // }

  
  

  const _getKeyValue_ = (key: string) => (obj: Record<string, any>) => obj[key];

   interface Token {
    USDT: object;
    USDC: object;
  }

  const TOKEN: Token = {
    USDT: {
      contract: "",
      decimal: 6,
      name: "USDT"
    },
    USDC: {
      contract: "0xe9DcE89B076BA6107Bb64EF30678efec11939234",
      decimal: 6,
      name: "USDC"
    }
  };

  const token = _getKeyValue_(tokenName)(TOKEN);

  // const token = TOKEN[tokenName]

  const { contract, decimal } = token
  const web3 = new Web3((window as any).ethereum)
  
  const myContract = new web3.eth.Contract(TOKEN_ABI as AbiItem[], contract);
  const _amount = parseAmount(amount+'', decimal)

  const accounts = await (window as any).ethereum.enable()

  try {
    const res = await myContract.methods
      .transfer(TRANSFORM_ADDRESS, _amount)
      .send({ from: accounts[0], gas: GAS });
    return {
      ...res,
      success: true,
    };
  } catch (err: any) {
    return {
      ...err,
      success: false,
    };
  }
}

// sign
export const getSign = async (address: string, str: string) => {
  if (!address || !str) {
    return {
      sign: '',
      success: false
    }
  }
  try {
    const web3 = new Web3((window as any).ethereum);
    const toHex = web3.utils.utf8ToHex(str);
    const res = await web3.eth.personal.sign(toHex, address, '');
    return {
      sign: res,
      success: true,
    };
  } catch (error) {
    return {
      sign: '',
      success: false
    };
  }
};

// // web3.eth.getBalance(currentAccount)
// export const getBalance = async (address) => {
//   if (!address) {
//     return '0'
//   }
//   try { 
//     const web3 = new Web3(window.ethereum);
//     const account = await web3.eth.getBalance(address)
//     console.log('====account getBalance====', account)
//     return account
//   } catch (error) {
//     console.log('====account getBalance error====', error)
//     return '0'
//   }
  
// }
