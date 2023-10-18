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
exports.sign = exports.getBalance = exports.deposit = exports.getWalletInfo = exports.parseAmount = void 0;
const web3_1 = __importDefault(require("web3"));
const units_1 = require("@ethersproject/units");
const tokenAbi_1 = __importDefault(require("./tokenAbi"));
const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000';
const TRANSFORM_ADDRESS = "0x3F94bc9C56afd05D011C7E6673841438e1ae4846";
const GAS = 320000;
const getToken = (key) => (obj) => obj[key];
const TOKEN = {
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
const parseAmount = (num = "0", decimal = 18) => {
    return (0, units_1.parseUnits)(num, decimal).toString();
};
exports.parseAmount = parseAmount;
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
            const chainId = yield web3.eth.net.getId();
            console.log('accounts======', accounts);
            return {
                address: accounts[0],
                chainId: chainId
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
const myObject = {};
const deposit = (amount = "0", tokenName = "USDC") => __awaiter(void 0, void 0, void 0, function* () {
    const token = getToken(tokenName)(TOKEN);
    const { contract, decimal } = token;
    const web3 = new web3_1.default(window.ethereum);
    const myContract = new web3.eth.Contract(tokenAbi_1.default, contract);
    const _amount = (0, exports.parseAmount)(amount + '', decimal);
    const accounts = yield window.ethereum.enable();
    try {
        const res = yield myContract.methods
            .transfer(TRANSFORM_ADDRESS, _amount)
            .send({ from: accounts[0], gas: GAS });
        return Object.assign(Object.assign({}, res), { success: true });
    }
    catch (err) {
        return Object.assign(Object.assign({}, err), { success: false });
    }
});
exports.deposit = deposit;
// 获取 balance
const getBalance = (tokenName = "USDC") => __awaiter(void 0, void 0, void 0, function* () {
    const token = getToken(tokenName)(TOKEN);
    const { contract, decimal } = token;
    const web3 = new web3_1.default(window.ethereum);
    const myContract = new web3.eth.Contract(tokenAbi_1.default, contract);
    const accounts = yield window.ethereum.enable();
    try {
        const res = yield myContract.methods.balanceOf(accounts[0]).call();
        return (0, units_1.formatUnits)(res, decimal);
    }
    catch (err) {
        return '0';
    }
});
exports.getBalance = getBalance;
// sign
const sign = (address, str) => __awaiter(void 0, void 0, void 0, function* () {
    if (!address || !str) {
        return {
            sign: '',
            success: false
        };
    }
    try {
        const web3 = new web3_1.default(window.ethereum);
        const toHex = web3.utils.utf8ToHex(str);
        const res = yield web3.eth.personal.sign(toHex, address, '');
        return {
            sign: res,
            success: true,
        };
    }
    catch (error) {
        return {
            sign: '',
            success: false
        };
    }
});
exports.sign = sign;
