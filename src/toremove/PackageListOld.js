import React from 'react';
import { Button, Row, Table } from 'antd';
import PackageEdit from './PackageEdit';

const PackageList = ({ data, addItem, allowEdit }) => {
  function createHandler(values) {
    addItem(values);
  }

  const columns = [
    {
      title: '包装描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '重量',
      dataIndex: 'weight',
      key: 'weight',
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
    },
    {
      title: '体积单位',
      dataIndex: 'volumeUnit',
      key: 'volumeUnit',
    },
  ];

  return (
    <Row style={{ marginTop: 12 }}>
      <PackageEdit item={{}} onOk={createHandler}>
        <Button disabled={!allowEdit} type="primary" style={{ marginBottom: 16 }}>
          添加新行
        </Button>
      </PackageEdit>
      <Table dataSource={data.packages} columns={columns} />
    </Row>
  );
};

export default PackageList;
