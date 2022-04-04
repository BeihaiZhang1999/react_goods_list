import React, { Component } from "react";
import "./style.css";
export default class OrderItem extends Component {
constructor(props){
    super(props);
    this.state={
        stars:props.value.stars || 0,
        isediting:false,
        comment:props.value.comment||"",
    }
}

  render() {
    const { product, shop, price, picture, ifCommented } = this.props.value;
    return (
      <div className="orderItem">
        <div className="orderItem__picContainer">
          <img className="orderItem__pic" src={picture}></img>
        </div>
        <div className="orderItem__content">
          <div className="orderItem__product">{product}</div>
          <div className="orderItem__shop">{shop}</div>
          <div className="orderItem__detail">
            <div className="orderItem__price">{price}</div>
            <div>
              {ifCommented ? (
                <button className="orderItem__btn orderItem__btn--grey">
                  已评价
                </button>
              ) : (
                <button className="orderItem__btn orderItem__btn--red" onClick={this.handleCommentButton}>
                  评价
                </button>
              )}
            </div>
          </div>
        </div>
        {this.state.isediting?this.renderEditArea():null}
      </div>
      
    );
  }
  renderEditArea(){
      return(
          <div className="orderItem__commentContainer">
              <textarea className="orderItem__comment" onChange={this.handleCommentChange} value={this.state.comment}></textarea>
              {this.renderStars()}
              <button className="orderItem__btn orderItem__btn--red" onClick={this.handleSubmit}>提交</button>
              <button className="orderItem__btn orderItem__btn--grey" onClick={this.handleCancel}>取消</button>
          </div>
      )
  }
  renderStars(){
      const stars=this.state.stars;

      return(
          <div>
          {

              [1,2,3,4,5].map(
                  (item,index)=>{
                  const light=stars>=item?'orderItem_star--red':'orderItem_star';
                  return(
                    <span key={index} className={light} onClick={this.handleStars.bind(this,item)}>★</span>
                  )
              })
          }
        </div>
      )

  }
  handleCommentButton=()=>{
      this.setState({
          isediting:true,
      })
  }
  handleCommentChange=(e)=>{
    this.setState({
        comment:e.target.value
    })
  }
  handleStars=(item)=>{
    this.setState({
        stars:item
    })
  }

  handleCancel=()=>{
      this.setState({
        isediting:false,
        stars:0,
        comment:""

      })
  }
  handleSubmit=()=>{
      const {id}=this.props.value
      this.setState({
          isediting:false
      })
      this.props.onSubmit(id,this.state.comment,this.state.stars)
  }
}
