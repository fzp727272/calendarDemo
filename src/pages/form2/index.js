import React from 'react';
import styles from './index.less';
import {
  ActionSheet,
  WingBlank,
  WhiteSpace,
  Button,
  Toast,
  Drawer,
  Icon,
  DatePickerView,
} from 'antd-mobile';
import enUs from 'antd-mobile/lib/date-picker-view/locale/en_US';
import data from './data';
class Index extends React.Component {


  state = {
    docked: true,
    docked2: false,
    data: data,
    value: null,
    selectNum: 0,
    beginKey: 0,
    selectButton: null,
    // endKey,
    title: '开始时间',
  };

  onDock = () => {
    this.setState({
      docked: true,
    });
  };
  closeDock = () => {
    this.setState({
      docked: false,
      // docked2: false,
      // data: data,
      // value: null,
      // selectNum: 0,
    });
  };
  renderCalendar = () => {
    //     return this.state.data.map((item,key) => {
    // const key1 = key;

    return (
      <div className={styles.monthContainer}>
        {this.state.data.map((item, key) => {
          // const key2 =key;

          const select = () => {
            this.setState({selectButton:null})
            let cash = this.state.data;

            // if (item.type == 'selected') {
            //   if (this.state.selectNum == 0) {
            //     cash[key].type = "begin";

            //     this.setState({
            //       selectNum: 1,
            //       title:'开始时间'
            //     })
            //   } else {
            //     cash[key].type = "end";
            //     this.setState({
            //       selectNum: 0,
            //       title:'结束时间'
            //     })
            //   }

            // }

            // this.state.data.map((item, key) => {
            //   if (item.type == 'selected') {
            //     cash[key].type = "show";
            //   }
            // })
            if (this.state.selectNum != 1) {
              this.state.data.map((item, key) => {
                if (item.type == 'begin') {
                  cash[key].type = 'show';
                } else if (item.type == 'end') {
                  cash[key].type = 'show';
                } else if (item.type == 'progress') {
                  cash[key].type = 'show';
                } else if (item.type == 'beginSecond') {
                  cash[key].type = 'show';
                }
              });

              cash[key].type = 'begin';
              this.setState({
                selectNum: 1,
                title: '开始时间',
                beginKey: key,
              });
            } else {
              if (key > this.state.beginKey) {

                cash[key].type = 'end';
                cash[this.state.beginKey].type = 'beginSecond';
                // arr.splice(this.state.beginKey+1, key-1,);
                const _key = key;

                this.state.data.map((item, key) => {
                  if (key > this.state.beginKey && key < _key) {
                    if (cash[key].type == null) {
                      cash[key].type = null;
                    } else if (cash[key].type == 'undo') {
                      cash[key].type = 'undo';
                    } else if (cash[key].type == 'month') {
                      cash[key].type = 'month';
                    } else {
                      cash[key].type = 'progress'
                    }

                  }
                });

                this.setState({
                  selectNum: 0,
                  title: '结束时间',
                });



              } else if (key < this.state.beginKey) {
                this.state.data.map((item, key) => {
                  if (item.type == 'begin') {
                    cash[key].type = 'show';
                  } else if (item.type == 'end') {
                    cash[key].type = 'show';
                  } else if (item.type == 'beginSecond') {
                    cash[key].type = 'show';
                  }
                });
                cash[key].type = 'begin';
                this.setState({
                  selectNum: 1,
                  title: '开始时间',
                  beginKey: key,
                });

              }


            }

            // console.log(cash)

            this.setState({
              data: cash,

            });

            // cash[key1].data[key2].type="selected";
            // this.setState({data:cash})
          };
          switch (item.type) {
            case 'month':
              return (
                <div className={styles.monthTitle}>
                  {item.txt}
                  {/* <div>{item.num}</div> */}
                </div>
              );
              break;
            case 'selected':
              return (
                <div className={`${styles.col} ${styles.selected}`} onClick={() => select()}>
                  <span>{item.num}</span>
                  <div className={styles.subTag}>{item.subscribe}</div>{' '}
                </div>
              );
              break;
            case 'begin':
              return (
                <div className={`${styles.col} ${styles.begin}`} onClick={() => select()}>
                  <span>{item.num}</span>
                  {/* <div className={styles.bottomTag}>起</div> */}
                  <div className={styles.subTag}>{item.subscribe}</div>{' '}
                </div>
              );
              break;
            case 'beginSecond':
              return (
                <div className={`${styles.col} ${styles.beginSecond}`} onClick={() => select()}>
                  <span>{item.num}</span>
                  <div className={styles.bottomTag}>起</div>
                  <div className={styles.subTag}>{item.subscribe}</div>{' '}
                </div>
              );
              break;
            case 'end':
              return (
                <div className={`${styles.col} ${styles.end}`} onClick={() => select()}>
                  <span>{item.num}</span>
                  <div className={styles.bottomTag}>止</div>{' '}
                  <div className={styles.subTag}>{item.subscribe}</div>{' '}
                </div>
              );
              break;
            case 'progress':
              return (
                <div className={`${styles.col} ${styles.progress}`} onClick={() => select()}>
                  <span>{item.num}</span>
                  <div className={styles.subTag}>{item.subscribe}</div>{' '}
                </div>
              );
              break;
            case 'show':
              return (
                <div className={styles.col} onClick={() => select()}>
                  <span>{item.num}</span>
                  <div className={styles.subTag}>{item.subscribe}</div>{' '}
                </div>
              );
              break;
            case 'undo':
              return (
                <div className={`${styles.col} ${styles.coldisabled}`}>
                  <span>{item.num}</span>
                </div>
              );
              break;
            case 'today':
              return (
                <div className={`${styles.col} ${styles.today}`} onClick={() => select()}>
                  <span>{item.num}</span>
                  <div className={styles.subTag}>今日</div>{' '}
                </div>
              );
              break;
            default:
              return <div className={styles.col}></div>;
              break;
          }
          return <div className={styles.col}></div>;
        })}
      </div>
    );

    // })
  };
  onChange = value => {
    // console.log(value);
    this.setState({ value });
  };
  onValueChange = (...args) => {
    console.log(args);
  };
  reset = () => {
    const cash = this.state.data;
    this.state.data.map((item, key) => {
      if (item.type == 'begin') {
        cash[key].type = 'show';
      } else if (item.type == 'end') {
        cash[key].type = 'show';
      } else if (item.type == 'progress') {
        cash[key].type = 'show';
      } else if (item.type == 'beginSecond') {
        cash[key].type = 'show';
      }
    });
    this.setState({
      data: cash,
      // selectButton:null
    })

  }
  headerButtonCLick = (item, key) => {

    if (key == this.state.selectButton) {
      this.setState({
        selectButton: null
      })
    } else {
      this.setState({
        selectButton: key
      });
      this.reset()
  

    }
  }
  render() {
    const headerBotton = ["全部时间", "本周", "本月", "周末"]

    const sidebar = (
      <div
        className={styles.side}
        style={{}}
        onClick={e => {
          // e.preventDefault()
        }}
      >
        {/* <div className={styles.title}>
          <div style={{ width: 36, marginLeft: 5 }}></div> <div> 选择日期 </div>
          <Icon
            type="cross"
            size="lg"
            style={{ width: 36, marginRight: 5 }}
            onClick={this.closeDock.bind(this)}
          />
        </div> */}

        <header>
          <div className={styles.headerBar}></div>
          <div className={styles.headerButtonContainer}>
            {headerBotton.map((item, key) => {
              return (
                <div className={key == this.state.selectButton ? styles.headerButtonActive : styles.headerButton} key={key} onClick={() => this.headerButtonCLick(item, key)}>{item}</div>
              )
            })}

          </div>
          <div className={styles.headerWeekdays}>
            <span className={styles.weekend}>日</span>
            <span>一</span>
            <span>二</span>
            <span>三</span>
            <span>四</span>
            <span>五</span>
            <span className={styles.weekend}>六</span>
          </div>
        </header>
        <div style={{ marginTop: 40, height: 400, overflowY: 'auto' }}>
          {this.renderCalendar()}

        </div>
        <div className={styles.footerContainer}>
          <div className={styles.reset} onClick={this.reset}>重置</div>
          <div className={styles.save} onClick={this.closeDock}>确定</div>
        </div>
      </div>
    );

    return (
      <div>
        <div className={styles.container}>


          <Drawer
            docked={this.state.docked}
            position={'top'}
            // style={{ minHeight: document.documentElement.clientHeight ,width:'100%',background:'rgba(0,0,0,0.6)'}}
            // contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
            sidebarStyle={{
              minHeight: document.documentElement.clientHeight,
              minWidth: document.documentElement.clientWidth,
              background: 'rgba(0,0,0,0.6)',
            }}
            sidebar={sidebar}
            docked={this.state.docked}
          >
            <div className={styles.filterContainer} onClick={this.onDock.bind(this)} >
              <div>全部运动</div>
              <div>全部时间</div>
              <div>排序</div>
              <div>筛选</div>
            </div>
          </Drawer>

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
}

export default Index;
