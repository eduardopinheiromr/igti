import React, { Component } from 'react'
import InputReadOnly from './InputReadOnly'
import { calculateSalaryFrom } from './salary'
import Barra from './Barra';

export default class CalculadoraCLT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseINSS: 0,
      descontoINSS: 0,
      baseIRPF: 0,
      descontoIRPF: 0,
      salarioLiquido: 0,
      percentualSLiq: 0,
      percentualINSS: 0,
      percentualIRPF: 0,
    }
  }
  handleKeypress = (event) => {
    let salarioBruto = event.target.value
    let salarioCalculado = calculateSalaryFrom(salarioBruto)
    this.setState({
      baseINSS: salarioCalculado.baseINSS,
      descontoINSS: salarioCalculado.discountINSS,
      baseIRPF: salarioCalculado.baseIRPF,
      descontoIRPF: salarioCalculado.discountIRPF,
      salarioLiquido: salarioCalculado.netSalary,
      percentualINSS: salarioCalculado.discountINSS / salarioBruto * 100,
      percentualIRPF: salarioCalculado.discountIRPF / salarioBruto * 100,
      percentualSLiq: salarioCalculado.netSalary / salarioBruto * 100,
    })
  }
  render() {
    const { baseINSS, descontoINSS, baseIRPF, descontoIRPF, salarioLiquido, percentualINSS, percentualIRPF, percentualSLiq } = this.state;
    return (
      <div className="calculadoraCLT">
        <div className="salario">
          <span>Digite seu salário</span>
          <input id="input-salario" type="number" onInput={this.handleKeypress} step={100} />
        </div>
        <div className="impostos">
          <InputReadOnly name={'Base INSS'} value={`R$${baseINSS}`} />
          <InputReadOnly name={`Desconto INSS (${percentualINSS.toFixed(2)}%)`} value={`R$${descontoINSS}`} cor={'orange'} />
          <InputReadOnly name={'Base IRPF'} value={`R$ ${baseIRPF}`} />
          <InputReadOnly name={`Desconto IRPF (${percentualIRPF.toFixed(2)}%)`} value={`R$${descontoIRPF}`} cor={'red'} />
        </div>
        <div className="impostos">
          <InputReadOnly name={`Salário Líquido (${percentualSLiq.toFixed(2)}%)`} value={`R$${salarioLiquido}`} />
        </div>
        <div className="impostos">
          <Barra salarioLiquido={percentualSLiq} descontoINSS={percentualINSS} descontoIRPF={percentualIRPF} />
        </div>
      </div>
    )
  }
}
