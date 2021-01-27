import { Component } from 'react';
import { Table, Input, Icon, Button, Divider } from 'antd';
import Link from 'umi/link';
import styles from './DataTable.less';

class DataTable extends Component {
  // state={
  //   searchText: ''
  // }

  static defaultProps = {
    data: [],
    columns: [],
    link: '',
    height: () => {
      const screenHeight = document.getElementById('root').offsetHeight;
      const contentHeight = screenHeight - 240;
      return contentHeight;
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.state = {
      searchText: '',
      filterNo: 0,
      loading: true,
    };
  }
  // { data, columns, link, height }
  // if(columns != undefined){
  //   state.loading =false;
  // }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data != undefined) {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    let tableColumns = [];
    const handleSearch = (selectedKeys, confirm) => () => {
      confirm();
      this.setState({
        searchText: selectedKeys[0],
      });

      // this.setState({ searchText: selectedKeys[0] });
    };

    const handleReset = clearFilters => () => {
      clearFilters();
      this.setState({
        searchText: '',
      });
    };

    const searchCode = () => {
      return {
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => {
          // console.log(key);
          return (
            <div className={styles.searchContainer}>
              <Input
                className={styles.inputContainer}
                ref={node => {
                  this.searchInput = node;
                }}
                placeholder="Search name"
                value={selectedKeys[0]}
                onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={handleSearch(selectedKeys, confirm)}
              />
              <Button
                size="small"
                style={{ width: 90, marginRight: 8 }}
                type="primary"
                onClick={handleSearch(selectedKeys, confirm)}
              >
                Search
              </Button>
              <Button size="small" style={{ width: 90 }} onClick={handleReset(clearFilters)}>
                Reset
              </Button>
            </div>
          );
        },
        filterIcon: filtered => (
          <Icon type="search" style={{ color: filtered ? '#108ee9' : '#aaa' }} />
        ),
        onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: visible => {
          if (visible) {
            setTimeout(() => {
              this.searchInput.select();
              // saveInput.current.focus();
            });
          }
        },
      };
    };

    const filterCode = () => {
      return {
        filters: [
          {
            text: 'London',
            value: 'London',
          },
          {
            text: 'New York',
            value: 'New York',
          },
        ],
        filterMultiple: false,
        onFilter: (value, record) => record.address.indexOf(value) === 0,
      };
    };

    const sortCode = () => {
      return {
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],
      };
    };
    this.props.columns.forEach((item, key) => {
      let column = {
        title: item.label,
        dataIndex: item.name,
        key: item.dataIndex,
      };

      if (key == 0) {
        column.fixed = 'left';

        column.render = (text, record) => (
          <Link to={`${this.props.link}/${record.id}`}>{text}</Link>
        );
        column = Object.assign(column, searchCode());
      } else if (key == 1) {
        column = Object.assign(column, filterCode());
      } else if (key == this.props.columns.length - 1) {
        column.render = (text, record) => (
          <span>
            <a>Invite {record.name}</a>
            <Divider type="vertical" />
            <a>Delete</a>
          </span>
        );
        column.fixed = 'right';
        column.width = 300;
      }
      column.width = 180;

      tableColumns.push(column);
      return;
    });
    tableColumns.push({});
    // console.log(tableColumns);
    // console.log(data);
    // if (data != undefined) {
    //   data = data.concat(data);
    // } else {
    // }

    //遍历data，通过column筛选出对应的值
    const tableData = [];
    this.props.data.forEach((item, key) => {
      let cash = {};
      const _item = item;
      (tableColumns || []).forEach((item, key) => {
        // console.log(item.dataIndex)
        // console.log(_item.indexOf(item.dataIndex))
        // { item.dataIndex : }
        cash[item.dataIndex] = _item[item.dataIndex];
      });
      tableData.push(cash);
      // console.log(tableData )
    });
    // console.log(tableData)
    return (
      <Table
        dataSource={tableData}
        columns={tableColumns}
        bordered
        loading={this.state.loading}
        pagination={{ pageSize: 50 }}
        scroll={{ y: this.props.height, x: 'max-content' }}
      />
    );
  }
}

export default DataTable;
