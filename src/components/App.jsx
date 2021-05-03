import React, { useState } from 'react'
import Web3 from 'web3'

import { Button, List, AutoComplete, InputNumber, Panel } from 'rsuite'

import 'rsuite/dist/styles/rsuite-default.css'
import './style.scss'

export default class App extends React.Component {
    componentWillMount() {
        this.loadBlockchainData()
    }

    async loadBlockchainData() {
        this.web3 = new Web3("http://localhost:8721")
        const accounts = await this.web3.eth.getAccounts()
        console.log(accounts)
        this.setState({ accounts: accounts })

        this.getBalances()
    }
    
    async getBalances() {
        const balances = {}
        const accounts = this.state.accounts
    
        await Promise.all(
            accounts.map(async (account) => {
                const balance = this.web3.utils.fromWei(
                    await this.web3.eth.getBalance(account),
                    'ether'
                );
                balances[account] = balance
            })
        )
        console.log(balances)
        this.setState({
            balances: balances
        })
    }

    constructor (props) {
        super(props)
        this.web3 = null

        this.state = {
            accounts: [],
            from: null,
            to: null,
            key: null,
            balances: {},
            eth: '0.001',
            infoTo: '',
            infoFrom: '',
            infoBlock: '',
            infoValue:'',
            infoGas: '',
            infoNonce: ''
        }

        this.handleChangeFrom = this.handleChangeFrom.bind(this)
        this.handleChangeTo = this.handleChangeTo.bind(this)
        this.handleChangeKey = this.handleChangeKey.bind(this)
        this.handleChangeEth = this.handleChangeEth.bind(this)
        this.transfer = this.transfer.bind(this)
        this.handleSortEnd = this.handleSortEnd.bind(this);
    }

    handleChangeFrom(value) {
        this.setState({
          from: value
        })
    }

    handleChangeTo(value) {
        this.setState({
          to: value
        })
    }

    handleChangeKey(value) {
        this.setState({
          key: value
        })
    }

    handleChangeEth(value) {
        this.setState({
            eth: value
        })
    }

    transfer() {
        this.trans()
        // console.log(this.state.from)
        // console.log(this.state.to)
        // console.log(this.state.key)
        // console.log(this.state.eth)
        // this.getBalances()
    }

    handleSortEnd({ oldIndex, newIndex }) {
        this.setState(({ accounts }) => {
          const moveData = accounts.splice(oldIndex, 1);
          const newData = [...accounts];
          newData.splice(newIndex, 0, moveData[0]);
          return {
            accounts: newData
          };
        });
      }

    async trans(){
        
        const privKey  = this.state.key
        const addressFrom = this.state.from
        const addressTo = this.state.to

        console.log(
            `Attempting to make transaction from ${addressFrom} to ${addressTo}`
        );
    
        const createTransaction = await this.web3.eth.accounts.signTransaction(
        {
            from: addressFrom,
            to: addressTo,
            value: this.web3.utils.toWei(this.state.eth, 'ether'),
            gas: '21000',
        },
        privKey
        )
        //console.log(createTransaction)
    
        // Deploy transaction
        const createReceipt = await this.web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
        );
        console.log(
        `Transaction successful with hash: ${createReceipt.transactionHash}`
        );
         
        const infoTo = (await this.web3.eth.getTransaction(createReceipt.transactionHash)).to;
        const infoFrom = (await this.web3.eth.getTransaction(createReceipt.transactionHash)).from;
        const infoBlock =(await this.web3.eth.getTransaction(createReceipt.transactionHash)).blockNumber;
        const infoValue = (await this.web3.eth.getTransaction(createReceipt.transactionHash)).value / (1 * Math.pow(10, 18));
        const infoGas =(await this.web3.eth.getTransaction(createReceipt.transactionHash)).gas;
        const infoNonce =(await this.web3.eth.getTransaction(createReceipt.transactionHash)).nonce;

        this.setState({
            infoTo,
            infoFrom,
            infoBlock,
            infoValue,
            infoGas,
            infoNonce
        })
        this.getBalances()
    }

    render () {
        return (
            <div style={{height: '100%'}} className='main'>
                <div className='ranking' style={{height: '100%'}}>
                    <div className='titulo-ranking'>
                        <h2 style={{color: 'black'}}>Accounts</h2>
                    </div>
                    <div>
                        <div>
                            <List sortable onSort={this.handleSortEnd} bordered style={{boxShadow: 'none'}}>
                                {
                                    this.state.accounts.map((item, index) => (
                                        <List.Item
                                            key={index}
                                            index={index}
                                            style={{backgroundColor: 'transparent', boxShadow: '0px 1px 2px #000', fontSize: '12px'}}
                                        >
                                            {item}  @  {this.state.balances[item]} ETH
                                        </List.Item>
                                    ))
                                }
                            </List>
                        </div>
                    </div>
                </div>

                <div className='nombre-input' style={{height: '100%'}}>
                    <h2 style={{color: 'black'}}>Realiza tu transacción</h2>

                    <div className='input'>
                        <AutoComplete
                            data={this.state.accounts}
                            placeholder="Account from"
                            onChange={this.handleChangeFrom}
                            style={{width: '90%'}}
                        />
                    </div>

                    <div className='input'>
                        <AutoComplete
                            data={this.state.accounts}
                            placeholder="Private key"
                            onChange={this.handleChangeKey}
                            style={{width: '90%'}}
                        />
                    </div>

                    <div className='input'>
                        <AutoComplete
                            data={this.state.accounts}
                            placeholder="Account to"
                            onChange={this.handleChangeTo}
                            style={{width: '90%'}}
                        />
                    </div>

                    <div className='input'>
                        <InputNumber
                            defaultValue={0.001}
                            step={0.001}
                            postfix="ETH"
                            onChange={this.handleChangeEth}
                            style={{width: '90%'}}
                        />
                    </div>

                    <div className='input'>
                        <Button color="green" block style={{width: '50%'}} onClick={this.transfer}>Transferir</Button>
                    </div>

                </div>
            
                <div className='card'>
                    <Panel shaded bordered bodyFill style={{ display: 'inline-block', width: 400 }}>
                        <Panel header="Última transacción" style={{color: 'black'}}>
                            <p style={{color: 'black'}}>
                                <small>Nonce: {this.state.infoNonce}</small>
                            </p>
                            <p style={{color: 'black'}}>
                                <small>Block number: {this.state.infoBlock}</small>
                            </p>
                            <p style={{color: 'black'}}>
                                <small>From: {this.state.infoFrom}</small>
                            </p>
                            <p style={{color: 'black'}}>
                                <small>To: {this.state.infoTo}</small>
                            </p>
                            <p style={{color: 'black'}}>
                                <small>Value: {this.state.infoValue}</small>
                            </p>
                            <p style={{color: 'black'}}>
                                <small>Gas: {this.state.infoGas}</small>
                            </p>
                        </Panel>
                    </Panel>
                </div>
            </div>
        )
    }
}
