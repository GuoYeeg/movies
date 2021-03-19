import React, { Component  } from 'react'
import { Layout, Menu, } from 'antd';
import '../css/index.css'
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { Link, Redirect, Route, Switch } from 'react-router-dom';
import MovieMain from './MovieMain';
const { SubMenu } = Menu;
const { Content,  Sider } = Layout;  
export default class Movies extends Component  {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    let {pathname} = this.props.location
    let arr=pathname.split('/')
    // console.log(arr);
    return <Layout className="site-layout-background" >
    <Sider className="site-layout-background" width={200}>
      <Menu
        mode="inline"
        // defaultSelectedKeys={['/in_theaters']}
        // defaultOpenKeys={['/in_theaters']}
        selectedKeys={['/'+arr[2]]}   //要从location里面获得当前的路由link 不然每次刷新都是默认的key
        style={{ height: '100%' }}
      >
        <Menu.Item key="/in_theaters"><Link to='/movie/in_theaters/1'>最新上映</Link></Menu.Item>
        <Menu.Item key="/coming_soon"><Link to='/movie/coming_soon/1'>即将上映</Link></Menu.Item>
        <Menu.Item key="/top250"><Link to='/movie/top250/1'>TOP250</Link></Menu.Item>
      </Menu>
    </Sider>
    <Content style={{ padding: '0 24px', minHeight: 280 }}>
      <Switch>
        <Route path='/movie/:type/:pages' component={MovieMain}></Route>
        <Redirect to='/movie/in_theaters/1'></Redirect>  
        {/* 跳转到movie的link是movie 不匹配上面的任何一个 所以这部分会空白 要重定向一下 */}
      </Switch>
      
    </Content>
  </Layout>
  }
}