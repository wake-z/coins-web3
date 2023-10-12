"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWalletInfo = void 0;
const web3_1 = __importDefault(require("web3"));
const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
const getWalletInfo = () => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof window.ethereum === 'undefined') {
        // 没安装MetaMask钱包进行弹框提示
        alert('Looks like you need a Dapp browser to get started.');
    }
    else {
        // 如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
        try {
            const accounts = yield window.ethereum.enable();
            const web3 = new web3_1.default(window.ethereum);
            console.log('accounts======', accounts);
            return {
                address: accounts[0]
            };
        }
        catch (error) {
            return {
                address: EMPTY_ADDRESS,
                chainId: 0
            };
        }
    }
});
exports.getWalletInfo = getWalletInfo;
// 签名
// export const getSign = async (address, str) => {
//   if (!address || !str) {
//     return {
//       sign: '',
//       success: false
//     }
//   }
//   try {
//     const web3 = new Web3(window.ethereum);
//     const toHex = web3.utils.utf8ToHex(str);
//     const res = await web3.eth.personal.sign(toHex, address);
//     return {
//       sign: res,
//       success: true,
//     };
//   } catch (error) {
//     return {
//       sign: '',
//       success: false
//     };
//   }
// };
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
