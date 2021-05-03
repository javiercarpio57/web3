import React, { useState } from 'react'

import { Divider, Placeholder, Form, FormGroup, ControlLabel, FormControl, Button } from 'rsuite'

import 'rsuite/dist/styles/rsuite-default.css'
import './style.scss'

const { Paragraph } = Placeholder

export default class App extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            formValue: {name: null}
            
        }
    }
    
    render () {
        return (
            <div style={{height: '100%'}} className='main'>
                <div className='ranking' style={{height: '100%'}}>
                    <div className='titulo-ranking'>
                        <h2>Ranking</h2>
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
