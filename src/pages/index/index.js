import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import Ajax from '../../utils/ajax';
import Require from '../../utils/require';

import "./index.scss";


const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataStructures: [],
      difficults: [],
      algorithms: [],
      problems: [],
      dataStructure: 'linear',
      difficult: '0',
      content: ''
    }
  }
  componentDidMount() {
    this.getDataStructures();
    this.getDifficults();
    // this.getAlgorithm();
    this.getProblems();
  }
  getProblems() {
    Ajax({
      api: 'getProblems',
      data: {}
    }, (res) => {
      this.setState({
        problems: res
      });
    });
  }
  getDataStructures() {
    Ajax({
      api: 'getDataStructures',
      data: {}
    }, (res) => {
      this.setState({
        dataStructures: res
      });
    });
  }
  getDifficults() {
    Ajax({
      api: 'getDifficults',
      data: {}
    }, (res) => {
      this.setState({
        difficults: res
      });
    });
  }
  getAlgorithm() {
    Ajax({
      api: 'getAlgorithm',
      data: {}
    }, (res) => {
      this.setState({
        algorithms: res
      });
    });
  }
  clickAlgorithmItem = (e) => {
    import(`../../data/${e.key}`).then((res) => {
      const fun = res.default;
      console.log(fun(105));
    });
    Require(e.key, (res) => {
      this.setState({
        content: res
      })
    }, () => {});
  }
  render() {
    const {problems, difficults, algorithms, dataStructure, difficult, content} = this.state;
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
          >
            {
              difficults.length > 0 && difficults.map((item) => (
                <Menu.Item key={item.value}>{item.label}</Menu.Item>
              ))
            }
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              style={{ height: '100%', borderRight: 0 }}
            >
              {
                problems.length > 0 && problems.map((item,i) => {
                  if(item.list && item.list.length > 0){
                    return (
                      <SubMenu key={item.value} title={item.label}>
                        {
                          item.list.map((li) => (
                            <Menu.Item key={li.value} onClick={this.clickAlgorithmItem}>
                              {li.label}
                            </Menu.Item>
                          ))
                        }
                      </SubMenu>
                    );
                  } else {
                    return (
                      <Menu.Item key={item.value} onClick={this.clickAlgorithmItem}>
                        {item.label}
                      </Menu.Item>
                    );
                  }
                })
              }
            </Menu>
          </Sider>
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb>
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <pre>
                {content}
              </pre>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}


ReactDOM.render(<App/>, document.getElementById('container'));