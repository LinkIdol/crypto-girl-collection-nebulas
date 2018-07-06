import '../../node_modules/nasa.js/dist/nasa';

// const nebPay = new NebPay();

const networkSetting = {
  mainnet: {
    rpcApi: 'https://mainnet.nebulas.io',
  },
  testnet: {
    rpcApi: 'https://testnet.nebulas.io',
  },
};

export default class Contract {
  constructor({ network = 'mainnet', contractAddress }) {
    this.api = networkSetting[network].rpcApi;
    this.contractAddress = contractAddress;
  }

  /**
     * callContractMethod({from, functionName, args})
     * Call a smart contract function.
     * The smart contract must have been submited.
     * Method calls are run only on the current node, not broadcast.
     * @param: from - User that send Request
     * @param: functionName - The name of the function
     * @param: args - Function arguement, please enter arguement in ordered array
     */
  async call({
    functionName,
    args = [],
  }) {
    const { contractAddress } = this;
    return Nasa.query(contractAddress, functionName, args);
  }
  /**
     * send({ functionName, value = 0, data, options = { listener: undefined } }})
     * Send tx to a smart contract function.
     * The smart contract must have been submited.
     * @param: functionName - The name of the function
     * @param: value - How many nebulas NAS should cost
     * @param: data - Function arguement, please enter arguement in ordered array
     * @param: options - please check https://github.com/nebulasio/nebPay/blob/master/doc/NebPay%E4%BB%8B%E7%BB%8D.md#options
     */
  async send({ functionName, value = 0, data = [] }) {
    const { contractAddress } = this;
    return Nasa.call(contractAddress, functionName, data, { value });
    // const resp = await nebPay.call(
    //   to,
    //   value,
    //   functionName,
    //   JSON.stringify(data),
    //   options);
    // return resp;
  }
}
