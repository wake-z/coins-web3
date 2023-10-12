import Web3 from 'web3'

const EMPTY_ADDRESS = '0x0000000000000000000000000000000000000000'

export const getWalletInfo = async () => {
  if (typeof window.ethereum === 'undefined') {
    // 没安装MetaMask钱包进行弹框提示
    alert('Looks like you need a Dapp browser to get started.')
  } else {
    // 如果用户安装了MetaMask，你可以要求他们授权应用登录并获取其账号
    try {
      const accounts = await window.ethereum.enable()
      const web3 = new Web3(window.ethereum)
      const chainId = await web3.eth.net.getId()
      console.log('accounts======', accounts)
      return {
        address: accounts[0],
        chainId: parseInt(chainId)
      }
    } catch (error) {
      return {
        address: EMPTY_ADDRESS,
        chainId: 0
      }
    }
  }
}

// 签名
export const getSign = async (address, str) => {
  if (!address || !str) {
    return {
      sign: '',
      success: false
    }
  }
  try {
    const web3 = new Web3(window.ethereum);
    const toHex = web3.utils.utf8ToHex(str);
    const res = await web3.eth.personal.sign(toHex, address);
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

// web3.eth.getBalance(currentAccount)
export const getBalance = async (address) => {
  if (!address) {
    return '0'
  }
  try { 
    const web3 = new Web3(window.ethereum);
    const account = await web3.eth.getBalance(address)
    console.log('====account getBalance====', account)
    return account
  } catch (error) {
    console.log('====account getBalance error====', error)
    return '0'
  }
  
}
