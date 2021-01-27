import React from 'react';
import { Button, Row, Table, Popconfirm, Icon, Divider } from 'antd';
import ProductEditModal from './ProductEditModal';

const ProductItemList = ({ data, addItem, deleteItem, dispatch, allowEdit }) => {
  const tableHeight = document.getElementById('root').offsetHeight - 280;

  const columns = [
    {
      title: '货品代码',
      dataIndex: 'productCode',
      key: 'productCode',
      width: 100,
    },
    {
      title: '货品名称',
      dataIndex: 'productName',
      key: 'productName',
      width: 100,
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
      width: 100,
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
      width: 100,
    },
    {
      title: '长度',
      dataIndex: 'length',
      key: 'length',
      width: 100,
    },
    {
      title: '长度单位',
      dataIndex: 'lengthUnit',
      key: 'lengthUnit',
      width: 100,
    },
    {
      title: '宽度',
      dataIndex: 'width',
      key: 'width',
      width: 100,
    },
    {
      title: '宽度单位',
      dataIndex: 'widthUnit',
      key: 'widthUnit',
      width: 100,
    },
    {
      title: '高度',
      dataIndex: 'height',
      key: 'height',
      width: 100,
    },
    {
      title: '高度单位',
      dataIndex: 'heightUnit',
      key: 'heightUnit',
      width: 100,
    },
    {
      title: '重量',
      dataIndex: 'weight',
      key: 'weight',
      width: 100,
    },
    {
      title: '重量单位',
      dataIndex: 'weightUnit',
      key: 'weightUnit',
    },
    {
      title: '体积',
      dataIndex: 'volume',
      key: 'volume',
      width: 100,
    },
    {
      title: '体积单位',
      dataIndex: 'volumeUnit',
      key: 'volumeUnit',
      width: 100,
    },
    {
      title: '温度要求',
      dataIndex: 'temperatureRequirement',
      key: 'temperatureRequirement',
      width: 100,
    },
    {
      title: '危险品',
      dataIndex: 'isDangerous',
      key: 'isDangerous',
      width: 100,
    },
    {
      title: '操作',
      render: (text, record) => (
        <span>
          <Popconfirm title="确认删除?" onConfirm={() => deleteItem(record)}>
            <a href="/#">
              <Icon type="delete" />
              删除
            </a>
          </Popconfirm>
          <Divider type="vertical" />
          <a href="/#" onClick={() => console.log(record)}>
            <Icon type="edit" />
            编辑
          </a>
        </span>
      ),
      fixed: 'right',
      width: 100,
    },
  ];

  const handleSave = values => {
    console.log(values);
    addItem(values);
  };

  return (
    <Row style={{ marginTop: 12 }}>
      <ProductEditModal
        onSave={handleSave}
        trigger={
          <Button disabled={!allowEdit} type="primary" style={{ marginBottom: 16 }}>
            添加新行
          </Button>
        }
      />

      <Table
        rowClassName={() => 'editable-row'}
        bordered
        dataSource={data.items}
        columns={columns}
        scroll={{ y: tableHeight, x: 'max-content' }}
      />
    </Row>
  );
};

export default ProductItemList;
