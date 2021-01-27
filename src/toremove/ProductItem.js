import { Component } from 'react';
import { Modal, Form, Input, Select, Row, Col, Switch } from 'antd';

const { Option } = Select;
class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModalHandler = e => {
    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };

  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const item = this.props.item;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModalHandler}>{children}</span>
        <Modal
          width={1024}
          title="货品行"
          visible={this.props.visible}
          onOk={this.okHandler}
          onCancel={this.hideModelHandler}
        >
          <Row>
            <Form onSubmit={this.okHandler}>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="货品代码">
                  {getFieldDecorator('productCode', {
                    initialValue: item.productCode,
                    rules: [{ required: true, message: '请输入货品代码！' }],
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item {...formItemLayout} label="数量">
                  {getFieldDecorator('quantity', {
                    initialValue: item.quantity,
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item {...formItemLayout} label="">
                  {getFieldDecorator('unit', {
                    initialValue: this.props.unit ? this.props.unit.toString() : '个',
                  })(
                    <Select>
                      <Option value="个">个</Option>
                      <Option value="箱">箱</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item {...formItemLayout} label="长度">
                  {getFieldDecorator('length', {
                    initialValue: item.length,
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item {...formItemLayout} label="">
                  {getFieldDecorator('lengthUnit', {
                    initialValue: this.props.lengthUnit ? this.props.lengthUnit.toString() : '米',
                  })(
                    <Select>
                      <Option value="米">米</Option>
                      <Option value="厘米">厘米</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item {...formItemLayout} label="宽度">
                  {getFieldDecorator('width', {
                    initialValue: item.width,
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item {...formItemLayout} label="">
                  {getFieldDecorator('widthUnit', {
                    initialValue: this.props.widthUnit ? this.props.widthUnit.toString() : '米',
                  })(
                    <Select>
                      <Option value="米">米</Option>
                      <Option value="厘米">厘米</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item {...formItemLayout} label="高度">
                  {getFieldDecorator('height', {
                    initialValue: item.height,
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item {...formItemLayout} label="">
                  {getFieldDecorator('heightUnit', {
                    initialValue: this.props.heightUnit ? this.props.heightUnit.toString() : '米',
                  })(
                    <Select>
                      <Option value="米">米</Option>
                      <Option value="厘米">厘米</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item {...formItemLayout} label="重量">
                  {getFieldDecorator('weight', {
                    initialValue: item.weight,
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item {...formItemLayout} label="">
                  {getFieldDecorator('weightUnit', {
                    initialValue: this.props.weightUnit ? this.props.weightUnit.toString() : '千克',
                  })(
                    <Select>
                      <Option value="千克">千克</Option>
                      <Option value="吨">吨</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={5}>
                <Form.Item {...formItemLayout} label="体积">
                  {getFieldDecorator('volume', {
                    initialValue: item.volume,
                  })(<Input />)}
                </Form.Item>
              </Col>
              <Col span={3}>
                <Form.Item {...formItemLayout} label="">
                  {getFieldDecorator('volumeUnit', {
                    initialValue: this.props.volumeUnit
                      ? this.props.volumeUnit.toString()
                      : '立方米',
                  })(
                    <Select>
                      <Option value="立方米">立方米</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="温度要求">
                  {getFieldDecorator('temperatureRequirement', {
                    initialValue: this.props.temperatureRequirement
                      ? this.props.temperatureRequirement.toString()
                      : '常温',
                  })(
                    <Select>
                      <Option value="常温">常温</Option>
                      <Option value="冷藏">冷藏</Option>
                      <Option value="冷冻">冷冻</Option>
                    </Select>,
                  )}
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item {...formItemLayout} label="危险品">
                  {getFieldDecorator('isDangerous', {
                    valuePropName: 'checked',
                    initialValue: item.isDangerous,
                  })(<Switch />)}
                </Form.Item>
              </Col>
            </Form>
          </Row>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ProductItem);
