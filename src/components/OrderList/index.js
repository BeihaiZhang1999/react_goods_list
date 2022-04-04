import React, { Component } from 'react'
import OrderItem from '../OrderItem'



export default class OrderList extends Component {
    constructor(props){
        super(props);
        this.state={data:[]};
    }
    //一般用在进入页面后，数据初始化
    componentDidMount(){
        //fetch获取的路径就是public目录
        fetch('/mock/orders.json').then(res=>{
            if(res.ok){
                res.json().then(data=>{
                    this.setState({
                        data:data
                    }
                    )
                })
            }
        })
    }
  render() {
    return (
      <div>
          {
              this.state.data.map(item=>{
                return <OrderItem key={item.id} value={item} onSubmit={this.handleOnSubmit}/>
              })
          }
        
      </div>
    )
  }
  handleOnSubmit=(id,comment,stars)=>{
      const newData=this.state.data.map(
          (data)=>{
              return data.id===id?{
                  ...data,comment,stars,ifCommented:true
              }:data
          }
      )
      this.setState({
          data:newData
      })
  }
}
