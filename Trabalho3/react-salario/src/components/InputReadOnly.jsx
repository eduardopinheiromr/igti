import React from 'react'

export default props =>
  <div>
    <div className="nome-imposto">
      <span style={{ color: props.cor }} >{props.name}</span>
    </div>
    <div>
      <input type='text' readOnly value={props.value} placeholder={'Imposto 1'} />
    </div>
  </div>