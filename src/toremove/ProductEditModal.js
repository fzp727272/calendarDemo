import { Component } from 'react';
import { Button } from 'antd';

import EditModal from './EditModal';
export default class ProductEditModal extends Component {
  getFields = () => {
    const numberLayout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
    const unitLayout = { labelCol: { span: 8 }, wrapperCol: { span: 12 } };
    return [
      {
        label: '货品代码',
        name: 'productCode',
        required: true,
        layout: { labelCol: { span: 4 }, wrapperCol: { span: 10 } },
      },
      {
        formType: 'group',
        column: 2,
        items: [
          { label: '数量', name: 'quantity', formType: 'number', layout: numberLayout },
          {
            label: '单位',
            name: 'unit',
            formType: 'select',
            selectItems: ['个', '箱'],
            layout: unitLayout,
          },
        ],
      },
      {
        formType: 'group',
        column: 2,
        items: [
          { label: '长度', name: 'length', formType: 'number', layout: numberLayout },
          {
            label: '单位',
            name: 'lengthUnit',
            formType: 'select',
            selectItems: ['米', '厘米'],
            layout: unitLayout,
          },
        ],
      },
      {
        formType: 'group',
        column: 2,
        items: [
          { label: '宽度', name: 'width', formType: 'number', layout: numberLayout },
          {
            label: '单位',
            name: 'widthUnit',
            formType: 'select',
            selectItems: ['米', '厘米'],
            layout: unitLayout,
          },
        ],
      },
      {
        formType: 'group',
        column: 2,
        items: [
          { label: '高度', name: 'height', formType: 'number', layout: numberLayout },
          {
            label: '单位',
            name: 'heightUnit',
            formType: 'select',
            selectItems: ['米', '厘米'],
            layout: unitLayout,
          },
        ],
      },
      {
        formType: 'group',
        column: 2,
        items: [
          { label: '重量', name: 'weight', formType: 'number', layout: numberLayout },
          {
            label: '单位',
            name: 'weightUnit',
            formType: 'select',
            selectItems: ['千克', '吨'],
            layout: unitLayout,
          },
        ],
      },
      {
        formType: 'group',
        column: 2,
        items: [
          { label: '体积', name: 'volume', formType: 'number', layout: numberLayout },
          {
            label: '单位',
            name: 'volumeUnit',
            formType: 'select',
            selectItems: ['立方米'],
            layout: unitLayout,
          },
        ],
      },
      {
        label: '温度要求',
        layout: { labelCol: { span: 4 }, wrapperCol: { span: 16 } },
        name: 'temperatureRequirement',
        formType: 'radio',
        selectItems: ['常温', '冷藏', '冷冻'],
      },
      {
        label: '危险品',
        layout: { labelCol: { span: 4 }, wrapperCol: { span: 8 } },
        name: 'isDangerous',
        formType: 'bool',
      },
    ];
  };

  render() {
    return (
      <EditModal
        title="货品行"
        fields={this.getFields()}
        trigger={this.props.trigger || <Button>添加货品</Button>}
        onSave={this.props.onSave}
        data={this.props.data}
      />
    );
  }
}
