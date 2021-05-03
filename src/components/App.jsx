import React, { useState } from 'react'
import Web3 from 'web3'

import { Divider, Placeholder, Form, FormGroup, ControlLabel, FormControl, Button, List, AutoComplete } from 'rsuite'

import 'rsuite/dist/styles/rsuite-default.css'
import './style.scss'

const { Paragraph } = Placeholder

export default class App extends React.Component {
    componentWillMount() {
        this.loadBlockchainData()
    }

    async loadBlockchainData() {
        const web3 = new Web3("http://localhost:8721")
        const accounts = await web3.eth.getAccounts()
        console.log(accounts)
        this.setState({ accounts: accounts })
      }

    constructor (props) {
        super(props)

        this.state = {
            accounts: [],
            // formValue: {from: null},
            from: null,
            to: null
        }

        this.handleChangeFrom = this.handleChangeFrom.bind(this)
        this.handleChangeTo = this.handleChangeTo.bind(this)
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
    
    render () {
        return (
            <div style={{height: '100%'}} className='main'>
                <div className='ranking' style={{height: '100%'}}>
                    <div className='titulo-ranking'>
                        <h2>Accounts</h2>
                    </div>
                    <div>
                        <div>
                            <List bordered>
                                {
                                    this.state.accounts.map((item, index) => (
                                    <List.Item key={index} index={index} style={{backgroundColor: 'transparent', boxShadow: '0 -1px 0 #000, 0 1px 0 #000'}}>
                                        {item}
                                    </List.Item>
                                    ))
                                }
                            </List>
                        </div>
                    </div>
                </div>
                <Divider vertical style={{height: '100%'}} />
                <div className='nombre-input' style={{height: '100%'}}>
                    <h2>Realiza tu transacción</h2>

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
                            placeholder="Account to"
                            onChange={this.handleChangeTo}
                            style={{width: '90%'}}
                        />
                    </div>

                    {/* <Button color="green" block style={{width: '50%'}} disabled={!this.state.formValue.name}>¡A jugar!</Button> */}

                </div>
            </div>
        )
    }
}
