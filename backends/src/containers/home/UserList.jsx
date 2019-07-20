import React, { Component } from 'react';
import { Table, Divider, Tag, Modal, Form, Input, Select, message, Popconfirm} from 'antd';
import { userList, updateData, deleteData } from '@/api/login'
const { Option } = Select;

@Form.create({
  name: 'adduserFrom', mapPropsToFields(props) {
    return {
      ID: Form.createFormField({
        ...props.uid,
        value: null,
      }),
      username: Form.createFormField({
        ...props.username,
        value: null,
      }),
      password: Form.createFormField({
        ...props.password,
        value: null,
      }),
      type: Form.createFormField({
        ...props.type,
        value: null,
      }),
    };
  },
})
class UserList extends Component {
  state = {
    list: [],
    columns: [
      {
        title: '用户名',
        dataIndex: 'username',
        key: 'username',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: '密码',
        dataIndex: 'password',
        key: 'possword',
      },
      {
        title: '身份',
        key: 'type',
        dataIndex: 'type',
        render: type => {
          let color = type === 0 ? 'geekblue' : 'green';
          return <span>
            <Tag color={color} key={type}>
              {type === 0 ? '游客' : '管理员'}
            </Tag>
          </span>
        },
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javascript:;" onClick={
              () => { this.updata(record) }
            }>更新{record.name}</a>
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={this.confirm}
              onCancel={this.cancel}
              okText="Yes"
              cancelText="No"
            >
            <span onClick={()=>{
              this.delete(record)
            }}>删除</span>
            </Popconfirm>
          </span>
        ),
      },
    ],
    ModalData: {},
    visible: false,
  }
  componentDidMount() {
    this.userList();
  }
  confirm(e) {
    console.log(e);
    message.success('Click on Yes');
  }
   cancel(e) {
    console.log(e);
    message.error('Click on No');
  }
  formatData(dataSource) {
    const temp = [];
    dataSource.forEach((itm, ind) => {
      temp.push({
        key: itm.uid,
        ...itm
      })
    })
    this.setState({
      list: temp
    })
  }
  async userList() {
    const results = await userList();
    this.formatData(results.data.result)
  }
  updata(rowData) {
    this.setState({
      ModalData: rowData
    }, (state) => {
      console.log(this.state.ModalData)
      const { uid, username, password, type } = this.state.ModalData;
      this.showModal();
      this.props.form.setFieldsValue({
        uid,
        username,
        password,
        type
      })
    })
  }
  delete(rowData) {
    const shc = deleteData(rowData);
    this.userList();
  }
  showModal = () => {
    this.setState({
      visible: true,
    })
  }
  handleOk = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        updateData(values).then(res => {
          console.log(res.data)
          message.success(res.data.msg);
          this.userList();
        })
        this.setState({
          visible: false,
        })

      }
    })

  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { list, columns, visible } = this.state;
    const { getFieldDecorator } = this.props.form;
    // console.log(list)
    return (
      <div>
        <Table columns={columns} dataSource={list} key={'list'} />
        <Modal
          title="更改数据"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 6 }} onSubmit={this.handleSubmit}>
            <Form.Item label="ID">
              {getFieldDecorator('uid', {
                rules: [{ required: true, message: 'Please input your ID!' }],
              })(<Input disabled />)}
            </Form.Item>
            <Form.Item label="用户名">
              {getFieldDecorator('username', {
                rules: [{ required: true, message: 'Please input your username!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="密码">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: 'Please input your password!' }],
              })(<Input />)}
            </Form.Item>
            <Form.Item label="身份">
              {
                getFieldDecorator('type', {
                  rules: [{ required: true, message: 'Please input your acount!' }],
                })(<Select>
                  <Option value={0}>游客</Option>
                  <Option value={1}>管理员</Option>
                </Select>)}
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default UserList;