import React, { Component } from 'react';
import { Table, Input, Select, TimePicker, Button, Popconfirm, Form, Icon, Divider } from 'antd';
import styles from './ProductItemList.less';
import moment from 'moment';
const EditableContext = React.createContext();
const { Option } = Select;
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  };

  toggleEdit = editable => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        if (editable == 'input') this.input.focus();
      }
    });
  };

  save = e => {
    const { record, handleSave, editable } = this.props;
    this.form.validateFields((error, values) => {
      if (error && error[e.currentTarget.id]) {
        return;
      }
      this.toggleEdit(editable);
      handleSave({ ...record, ...values });
    });
  };

  renderCell = form => {
    this.form = form;
    const { children, dataIndex, record, title, editable } = this.props;
    const { editing } = this.state;
    console.log(this.props);

    const renderForm = () => {
      switch (editable) {
        // case 'input':

        //     return(

        // )
        //   break;
        case 'select':
          return (
            <Form.Item style={{ margin: 0 }} className={styles.editableForm}>
              {form.getFieldDecorator(dataIndex, {
                rules: [
                  {
                    required: true,
                    message: `${title} is required.`,
                  },
                ],
                initialValue: record[dataIndex],
              })(
                <Select
                  mode={this.props.selectMode || ' '}
                  onPressEnter={this.save}
                  onBlur={this.save}
                >
                  {this.props.selectContent.map((item, key) => {
                    return <Option value={item}>{item}</Option>;
                  })}
                </Select>,
              )}
            </Form.Item>
          );

          break;

        case 'timePicker':
          return (
            <Form.Item style={{ margin: 0 }} className={styles.editableForm}>
              {form.getFieldDecorator(dataIndex, {
                rules: [
                  {
                    required: true,
                    message: `${title} is required.`,
                  },
                ],
                // initialValue: moment(record[dataIndex]),
              })(
                <TimePicker
                  ef={node => (this.input = node)}
                  onPressEnter={this.save}
                  onBlur={this.save}
                />,
              )}
            </Form.Item>
          );
          break;
        default:
          return (
            <Form.Item style={{ margin: 0 }} className={styles.editableForm}>
              {form.getFieldDecorator(dataIndex, {
                rules: [
                  {
                    required: true,
                    message: `${title} is required.`,
                  },
                ],
                initialValue: record[dataIndex],
              })(
                <Input
                  ref={node => (this.input = node)}
                  onPressEnter={this.save}
                  onBlur={this.save}
                />,
              )}
            </Form.Item>
          );
      }
    };

    // console.log(ele)
    return editing ? (
      renderForm()
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={() => this.toggleEdit(editable)}
      >
        {children[2] == undefined ? `请输入${this.props.title}` : children}
      </div>
    );
  };

  render() {
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editable ? (
          <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>
        ) : (
          children
        )}
      </td>
    );
  }
}

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '货品代码',
        dataIndex: 'productCode',
        key: 'productCode',
        editable: 'timePicker',
        width: 200,
        // fixed:'left',
      },
      {
        title: '货品名称',
        dataIndex: 'productName',
        key: 'productName',
        editable: 'select',
        selectMode: 'multiple',
        selectContent: ['select1', 'select2', 'select3'],
        width: 200,
      },
      {
        title: '数量',
        dataIndex: 'quantity',
        key: 'quantity',
        editable: 'select',
        selectContent: ['select1', 'select2', 'select3'],
        width: 200,
      },
      {
        title: '单位',
        dataIndex: 'unit',
        key: 'unit',
        width: 200,
      },
      {
        title: '长度',
        dataIndex: 'length',
        key: 'length',
        width: 200,
      },
      {
        title: '长度单位',
        dataIndex: 'lengthUnit',
        key: 'lengthUnit',
        width: 200,
      },
      {
        title: '宽度',
        dataIndex: 'width',
        key: 'width',
        width: 200,
      },
      {
        title: '宽度单位',
        dataIndex: 'widthUnit',
        key: 'widthUnit',
        width: 200,
      },
      {
        title: '高度',
        dataIndex: 'height',
        key: 'height',
        width: 200,
      },
      {
        title: '高度单位',
        dataIndex: 'heightUnit',
        key: 'heightUnit',
        width: 200,
      },
      {
        title: '重量',
        dataIndex: 'weight',
        key: 'weight',
        width: 200,
      },
      {
        title: '重量单位',
        dataIndex: 'weightUnit',
        key: 'weightUnit',
        width: 200,
      },
      {
        title: '体积',
        dataIndex: 'volume',
        key: 'volume',
        width: 200,
      },
      {
        title: '体积单位',
        dataIndex: 'volumeUnit',
        key: 'volumeUnit',
        width: 200,
      },
      {
        title: '温度要求',
        dataIndex: 'temperatureRequirement',
        key: 'temperatureRequirement',
        width: 200,
      },
      {
        title: '危险品',
        dataIndex: 'isDangerous',
        key: 'isDangerous',
        width: 200,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) =>
          this.state.dataSource.length >= 1 ? (
            <span>
              <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)}>
                <a>
                  <Icon type="delete" />
                  删除
                </a>
              </Popconfirm>
              <Divider type="vertical" />
              <a onClick={() => this.handleAdd(record)}>
                {' '}
                <Icon type="plus" />
                添加行
              </a>
            </span>
          ) : null,
        fixed: 'right',
        width: 200,
      },
    ];

    this.state = {
      dataSource: [
        {
          key: '0',
          productCode: '10:00:00',
          quantity: '32',
          productName: 'London, Park Lane no. 0',
        },
        {
          key: '1',
          productCode: '123123131Ijask',
          quantity: '32',
          productName: 'London, Park Lane no. 1',
        },
      ],
      count: 2,
    };
  }

  handleDelete = key => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  };

  handleAdd = record => {
    const { count, dataSource } = this.state;
    // console.log(record);
    const _cash = this.columns[record.key];
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };

    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  };

  handleSave = row => {
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };
  tableheight = () => {
    const screenHeight = document.getElementById('root').offsetHeight;
    const contentHeight = screenHeight - 280;
    return contentHeight;
  };
  render() {
    const { dataSource } = this.state;
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        {/* <div className={styles.buttonContainer}>
              <div></div>
              <div>
              <Button onClick={this.handleAdd} className={styles.secondButton} style={{ marginBottom: 16 }}>
         添加行
        </Button>
              </div>
       
          </div> */}

        <Table
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          pagination={false}
          dataSource={this.props.data}
          columns={columns}
          scroll={{ y: this.tableheight(), x: 'max-content' }}
        />
      </div>
    );
  }
}
