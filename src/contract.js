import request from 'superagent';
import NebPay from '@/lib/nebpay';

const nebPay = new NebPay();

export default class Contract {
  constructor(contractAddress) {
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
  async callContractMethod({
    from = 'n1Z6SbjLuAEXfhX1UJvXT6BB5osWYxVg3F3', //
    functionName,
    args = [] }) {
    const to = this.contractAddress;
    const txParams = {
      value: '0',
      nonce: 0,
      gasPrice: '1000000',
      gasLimit: '2000000',
      contract: { function: functionName, args: JSON.stringify(args) },
    };
    const { body } = await request
      .post('https://mainnet.nebulas.io/v1/user/call')
      .send(Object.assign({ from, to }, txParams));

    const { result } = body.result;
    const value = JSON.parse(result);
    return value;
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
  async send({ functionName, value = 0, data, options = { listener: undefined } }) {
    const to = this.contractAddress;
    const resp = await nebPay.call(
      to,
      value,
      functionName,
      JSON.stringify(data),
      options);
    return resp;
  }
}
