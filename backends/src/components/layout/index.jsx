import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { sliderBar } from '@/config/sliderbar'
import {NavLink} from 'dva/router'
import 'antd/dist/antd.css'
import "./index.css"

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

class Wraper extends Component {
    state = {
        sliderBar,
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        return <Layout className="wraper">
            <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                <div className="pt15 pb15">
                    <h1 className="text-white pl15" style={{color:'#f6f6f6'}}>转转后台管理</h1>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">

                    {
                        this.state.sliderBar.map(slider => {
                            return slider.children === undefined || slider.children.length < 1 ?
                                <Menu.Item key={slider.id}>
                                    <Icon type={slider.icon} />
                                    <span><NavLink to={slider.path}>{slider.name}</NavLink></span>
                                </Menu.Item>
                                : <SubMenu
                                    key={slider.id}
                                    title={
                                        <div>
                                            <Icon type={slider.icon} />
                                            <span><NavLink to={slider.path}>{slider.name}</NavLink></span>
                                        </div>
                                    }
                                >
                                    {
                                        slider.children && slider.children.map(children => {
                                            return <Menu.Item key={children.id}>
                                            <Icon type={children.icon} />
                                            <span><NavLink to={children.path}>{children.name}</NavLink></span>
                                            </Menu.Item>
                                        })
                                    }
                                </SubMenu>
                        })

                    }
                </Menu>
            </Sider>
            <Layout>
                <Header style={{ background: '#fff', padding: 0 }}>
                    <Icon
                        className="pl15"
                        type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                        onClick={this.toggle}
                    />
                </Header>
                <Content className="m15 p15 bg-white">
                    {this.props.children}
                </Content>
            </Layout>
        </Layout>
    }
}

export default Wraper;