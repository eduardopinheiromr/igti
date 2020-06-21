import React from 'react'
import './index.css'
import Input from './components/CalculadoraCLT'
import InputReadOnly from './components/Campo'
import Barra from './components/Barra'
import { calculateSalaryFrom } from './salary'

export default (props) => (
  <div className="App">
    <h1>React Salário</h1>
    <Input placeholder={'Insira o valor do salário aqui'}></Input>
    <div className="impostos">
      <InputReadOnly name={'Base INSS:'} />
      <InputReadOnly name={'Desconto INSS:'} />
      <InputReadOnly name={'Base IRPF:'} />
      <InputReadOnly name={'Desconto IRPF:'} />
    </div>
    <div className="impostos">
      <Imposto name={'Salário Líquido'} valor={0}></Imposto>
    </div>
  </div >
)