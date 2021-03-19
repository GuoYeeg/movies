import React, { Component  } from 'react'
import Axios from 'axios'

import {Card,Rate, Pagination,Spin  } from 'antd'
const { Meta } = Card;
export default class MovieMain extends Component  {
  constructor(props) {
    super(props);
    this.state = {
      list:[],
      count:12,
      totalPages:0,
      total:0,
      loading:true
    }
  }
  // UNSAFE_componentWillMount(){
  //   Axios.get('https://bird.ioliu.cn/v2?url=https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items?os=windows&start=0&count=20').then(res=>{
  //     // if(err) console.log(err);
  //     console.log(res.data.subject_collection_items);
  //   })
  // }
  /**使用async await */
  async getdata(props){
    this.setState({
      loading:true
    })
    let {type,pages} = props.match.params
    let res = await Axios.get(`https://bird.ioliu.cn/v2?url=https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items?os=windows&start=${(pages-1)*10}&count=${this.state.count}`)
    console.log(res);
    console.log(Math.floor(res.data.total/12));
    this.setState(()=>{
      return{
        list:res.data.subject_collection_items,
        totalPages:Math.floor(res.data.total/12) ,
        total:res.data.total,
        loading:false
      }
    })
    console.log(res.data.subject_collection_items);
  }
  async UNSAFE_componentWillMount(){
    this.getdata(this.props)
  }
  /**pages的值是从props中拿过来的 路由切换的时候虽然link变了 但是props没变 当路由改变时要在这个生命周期里面再请求一次数据 */
  async UNSAFE_componentWillReceiveProps(nextProps,nextContent){

    this.getdata(nextProps) //把最新的props传进去
  }
  getImages(_url){
    if( _url !== undefined ){
        let _u = _url.substring( 7 );
        return 'https://images.weserv.nl/?url=' + _u;
    }
  }
  renderList(){
    return this.state.list.map((item,index)=>{
      return (
      <Card
        hoverable
        key={item.id}
        style={{ width: 240 }}
        cover={<img alt="example" src={this.getImages(item.cover.url)} />}
      >
        <Meta title={<Rate disabled allowHalf defaultValue={item.rating?item.rating.star_count:0} />} 
              description={item.title} />
      </Card>
      )
    })
  }
  changePage(current){
    this.props.history.push(`/movie/in_theaters/${current}`)
  }
  render() {
    let {type,pages} = this.props.match.params
    return <div>
      { this.state.loading && (<div className="example">
        <Spin size="large" />
      </div>)
      }

      { !this.state.loading && (<div className="list">
          {this.renderList()}
          <div style={{minWidth:'100%'}}> 
            <Pagination
              style={{marginTop:20}}
              total={this.state.total}
              current={this.state.pages}
              showQuickJumper
              onChange={this.changePage.bind(this)}
              showTotal={total => `Total ${this.state.total} items`}
            />
          </div>

        </div>)
      }

      </div>
;
  }
}