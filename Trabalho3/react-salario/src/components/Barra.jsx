import React, { Component } from 'react'

export default class Barra extends Component {
  render() {
    const { salarioLiquido, descontoINSS, descontoIRPF } = this.props
    return (
      <div className="divbarra">
        <div className="barra orange" type="number" readOnly style={{ width: `${descontoINSS}%` }}></div>
        <div className="barra red" type="number" readOnly style={{ width: `${descontoIRPF}%` }}></div>
        <div className="barra green" type="number" readOnly style={{ width: `${salarioLiquido}%` }}></div>
      </div>
    )
  }
}