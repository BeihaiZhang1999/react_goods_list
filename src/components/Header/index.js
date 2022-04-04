/* es7组件 输入rcc快速创建一个component */

import React, { Component } from 'react'
import './style.css'

export default class Header extends Component {
  render() {
    return (
      <header className='myOrder'>
        我的订单
      </header>
    )
  }
}
