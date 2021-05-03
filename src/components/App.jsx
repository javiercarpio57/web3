import React, { useState } from 'react'
import Web3 from 'web3'

import { Divider, Placeholder, Form, FormGroup, ControlLabel, FormControl, Button } from 'rsuite'

import 'rsuite/dist/styles/rsuite-default.css'
import './style.scss'

const { Paragraph } = Placeholder

export default class App extends React.Component {
    componentWillMount() {
        this.loadBlockchainData(),
        this.prubea()
        this.trans()
      }

    constructor (props) {
        super(props)

        this.state = {
            formValue: {name: null},
            account: ''
            
        }
    }
    async trans(){
        
        const privKey = '11de7e214b8fba5fe1a774abc90434e12105ae0105f01b07b028b92409a41a02'
        const addressFrom = '0x111Cf7B6D381Cdd8c8ffd0819016CbF20e1019bB';
        const addressTo = '0x59A808daC156a0d8A7a24fC9B77B0EDC8BDFA48A';

        const web3 = new Web3(Web3.givenProvider || "http://localhost:8721")

        console.log(
            `Attempting to make transaction from ${addressFrom} to ${addressTo}`
         );
      
         const createTransaction = await web3.eth.accounts.signTransaction(
            {
               from: addressFrom,
               to: addressTo,
               value: web3.utils.toWei('10', 'ether'),
               gas: '21000',
            },
            privKey
         );
      
         // Deploy transaction
         const createReceipt = await web3.eth.sendSignedTransaction(
            createTransaction.rawTransaction
         );
         console.log(
            `Transaction successful with hash: ${createReceipt.transactionHash}`
         );
    }
    
    async prubea(){
        await(90);
        const addressFrom = '0x111Cf7B6D381Cdd8c8ffd0819016CbF20e1019bB';
        const addressTo = '0x59A808daC156a0d8A7a24fC9B77B0EDC8BDFA48A';

        const web3 = new Web3(Web3.givenProvider || "http://localhost:8721")

        const balanceFrom = web3.utils.fromWei(
            await web3.eth.getBalance(addressFrom),
            'ether'
         );
         const balanceTo = await web3.utils.fromWei(
            await web3.eth.getBalance(addressTo),
            'ether'
         );
      
         console.log(`The balance of ${addressFrom} is: ${balanceFrom} ETH.`);
         console.log(`The balance of ${addressTo} is: ${balanceTo} ETH.`);
    }
    async loadBlockchainData() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8721")
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
      }

    render () {
       
        
        
        return (
            <div style={{height: '100%'}} className='main'>
                <div className='ranking' style={{height: '100%'}}>
                    <div className='titulo-ranking'>
                        <h2>Ranking</h2>
                        <p>Your account: {this.state.account}</p>
                    </div>
                    <div>
                        <Paragraph rows={15} />
                    </div>
                </div>
                <Divider vertical style={{height: '100%'}} />
                <div className='nombre-input' style={{height: '100%'}}>
                    <h2>¡Construye tu conocimiento! PMBOK</h2>

                    <div className='input'>
                        <Form layout='horizontal' onChange={formValue => this.setState({formValue})}>
                            <FormGroup>
                                <ControlLabel>Ingresa tu nombre</ControlLabel>
                                <FormControl name='name' />
                            </FormGroup>
                        </Form>

                    </div>

                    <Button color="green" block style={{width: '50%'}} disabled={!this.state.formValue.name}>¡A jugar!</Button>

                </div>
            </div>
        )
    }
}
