import React, { Component } from 'react';
import { Icon } from 'antd';
const IconRender = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1249471_ijsn568cknn.js',
});//at.alicdn.com/t/font_1249471_0t1vbpzfroh.js

export default class MyIcon extends Component {
//   static defaultProps = {
//     color:'#333',
//     fontSize:'14px'
// } 
  state = {};
  render() {
    return <IconRender style={{color:this.props.color,fontSize:this.props.fontSize}} type={this.props.type}  />;
  }
}
