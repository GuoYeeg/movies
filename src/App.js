import React, { Component  } from 'react'
import { Layout, Menu, } from 'antd';
import './css/index.css'
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Movies from './pages/Movies';
import About from './pages/About';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;  
export default class App extends Component  {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let {pathname} = this.props.location
    let arr=pathname.split('/')
    // console.log(arr);
    return   <Layout>
    <Header className="header">
      <div className="logo" style={{height:'100%'}}/>
      <Menu  mode="horizontal" defaultSelectedKeys={['/home']} selectedKeys={['/'+arr[1]]}>
        <Menu.Item key="/home"><Link to={'/home'}>首页</Link></Menu.Item>
        <Menu.Item key="/movie"><Link to={'/movie'}>电影</Link></Menu.Item>
        <Menu.Item key="/about"><Link to={'/about'}>关于</Link></Menu.Item>
      </Menu>
    </Header>
    <Content >
      <Switch>
        <Route path='/home' component={Home}></Route>
        <Route path='/movie' component={Movies}></Route>
        <Route path='/about' component={About}></Route>
 
        <Redirect to='/home'></Redirect>
      </Switch>
    </Content>
    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
  </Layout>;
  }
}