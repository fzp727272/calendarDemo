import React from 'react';
import styles from './index.less';
import { ActionSheet, WingBlank, WhiteSpace, Button, Toast, Drawer, Icon,DatePickerView  } from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';
import data from './data';

class Index extends React.Component {
  state = {
    docked: true,
    docked2:false,
    data: data,
    value: null,
  }

  onDock = () => {

    this.setState({
      docked: true,

    });
  }
  closeDock = () => {

    this.setState({
      docked: false,
      docked2: false,
      data: data,
      value: null,

    });
  }
  renderCalendar = () => {
    //     return this.state.data.map((item,key) => {
    // const key1 = key;


    return (
      <div className={styles.monthContainer}>

        {this.state.data.map(
          (item, key) => {
            // const key2 =key;


            const select = () => {

              let cash = this.state.data;





              this.state.data.map((item, key) => {
                if (item.type == 'selected') {
                  cash[key].type = "show";
                }
              })

              cash[key].type = "selected";
              // console.log(cash)

              this.setState({ data: cash ,
                docked2:true,
              })

              // cash[key1].data[key2].type="selected";
              // this.setState({data:cash})
            }
            switch (item.type) {
              case 'month':
                return <div className={styles.monthTitle}>{item.txt}
                {/* <div>{item.num}</div> */}
                </div>
                break;
              case 'selected':
                return <div className={`${styles.col} ${styles.selected}`}><span>{item.num}</span></div>
                break;

              case 'show':
                return <div className={styles.col} onClick={() => select()}><span>{item.num}</span></div>
                break;
              case 'undo':
                return <div className={`${styles.col} ${styles.coldisabled}`}><span>{item.num}</span></div>
                break;
              case 'today':
                return <div className={`${styles.col} ${styles.today}`} onClick={() => select()}>
                  <span>{item.num}</span>
                  <div className={styles.todayTag}>今日</div> </div>
                break;
              default:
                return <div className={styles.col}>

                </div>
                break;
            }
            return <div className={styles.col}>

            </div>
          }
        )}

      </div>
    )

    // })
  }
  onChange = (value) => {
    // console.log(value);
    this.setState({ value });
  };
  onValueChange = (...args) => {
    console.log(args);
  };

  render() {



    const sidebar = (<div className={styles.side} style={{}} onClick={e => {
      // e.preventDefault()
    }}>

      <div className={styles.title}>
        <div style={{ width: 36, marginLeft: 5 }} ></div>  <div> 选择日期 </div>
        <Icon type="cross" size='lg' style={{ width: 36, marginRight: 5 }} onClick={this.closeDock.bind(this)} /></div>





      <header>
        <div className={styles.headerBar}></div>

        <div className={styles.headerWeekdays}>
          <span>周日</span>
          <span>周一</span>
          <span>周二</span>
          <span>周三</span>
          <span>周四</span>
          <span>周五</span>
          <span>周六</span>
        </div>
      </header>
      <div style={{ marginTop: 40, height: 500, overflowY: 'auto' }}>
        {this.renderCalendar()}
        <div style={{height:300}}></div>
      </div>


    </div>);



    return (
      <div> 
           
      <div className={styles.container}  >
      <DatePickerView 
      // className={this.state.docked2?styles.picker:styles.picker2}
      style={{
        // display:this.state.docked2?'block':'none',
        opacity:this.state.docked2?1:0,
        position:'absolute',
        transition:'all .3s',
        // height:300,
    width:'100%',
    bottom:this.state.docked2?10:-200,
    zIndex:this.state.docked2?10000:-1,
  
  }}
      mode="time"
              value={this.state.value}
              onChange={this.onChange}
              // onValueChange={this.onValueChange}
            />
         <div className={styles.bottomButton} style={{display:this.state.docked2?'block':'none'}}  onClick={this.closeDock.bind(this)} >
       确定</div>
        <Drawer

          docked={true}
          position={"bottom"}
          // style={{ minHeight: document.documentElement.clientHeight ,width:'100%',background:'rgba(0,0,0,0.6)'}}
          // contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          sidebarStyle={{ minHeight: document.documentElement.clientHeight, minWidth: document.documentElement.clientWidth, background: 'rgba(0,0,0,0.6)' }}
          sidebar={sidebar}
          docked={this.state.docked}
        >
          <div className={styles.listContainer} onClick={this.onDock.bind(this)}>
            <div>时间</div>
            <div>2020-08-12 09:00</div>


          </div>
        </Drawer>
        <div className={this.state.docked2?styles.timePicker:styles.timePicker2}  >
  
  <div className={styles.timeTitle}>选择时间</div>
      

  </div>

{/* 
        <Drawer

          docked={true}
          position={"bottom"}
          // style={{ minHeight: document.documentElement.clientHeight ,width:'100%',background:'rgba(0,0,0,0.6)'}}
          // contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
          // sidebarStyle={{ minHeight: document.documentElement.clientHeight, minWidth: document.documentElement.clientWidth,  }}
          sidebar={selectContainer}
          docked={this.state.docked2}
        >

        </Drawer> */}



      </div>
  
      </div>
    );
  }

};

export default Index
