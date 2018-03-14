import React from 'react';
import {Row, Col} from 'antd';
import 'whatwg-fetch';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	CheckBox,
	Modal
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

class PCHeader extends React.Component {
  constructor(){
    super();
    this.state={
      current: 'top',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userid: 0
    };
  };

  componentWillMount(){
    if(localStorage.userid!=''){
      this.setState({hasLogined: true});
      this.setState({userNickName:localStorage.userNickName,userid:localStorage.userid});
    }
  };

  setModalVisible(value)
	{
		this.setState({modalVisible: value});
	};

  handleClick(e){
      if(e.key=="register"){
        this.setState({current:'register'});
        this.setModalVisible(true);
      } else {
        {
          this.setState({current:e.key});
        }
      }
  };

  handleSubmit(e){
    e.preventDefault();
    var myFetchOptions ={
      method: 'GET'
    };
    var formData = this.props.form.getFieldsValue();
    console.log(formData);
    fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=" + this.state.action
		+ "&username="+formData.userName+"&password="+formData.password
		+"&r_userName=" + formData.r_userName + "&r_password="
		+ formData.r_password + "&r_confirmPassword="
		+ formData.r_confirmPassword, myFetchOptions)
		.then(response => response.json())
		.then(json => {
			this.setState({userNickName: json.NickUserName, userid: json.UserId});
			localStorage.userid= json.UserId;
			localStorage.userNickName = json.NickUserName;
		});
    if (this.state.action=="login") {
			this.setState({hasLogined:true});
		}
    message.success("Request successfully");
    this.setModalVisible(false);
  };

  callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	};

  logout(){
    localStorage.userid = '';
    localStorage.userNickName = '';
    this.setState({hasLogined: false});
  };

  render(){
    let{getFieldProps} = this.props.form;
    const userShow = this.state.hasLogined
			? <Menu.Item key="logout" class="register">
					<Button type="primary" htmlType="button">{this.state.userNickName}</Button>
					&nbsp;&nbsp;
					<Router>
						<Link target="_blank" to={`usercenter`}>
							<Button type="dashed" htmlType="button">My profile</Button>
						</Link>		
					</Router>
					&nbsp;&nbsp;
					<Button type="ghost" htmlType="button" onClick={this.logout.bind(this)}>Logout</Button>
				</Menu.Item>
			: <Menu.Item key="register" class="register">
				<Icon type="appstore"/>Sign up/Login
			</Menu.Item>;


    return(
        <header>
          <Row>
            <Col span={2}></Col>
            <Col span={4}>
                <a href="/" class="logo">
                  <img src="/src/images/logo.png" alt="logo"/>
                  <span>ReactNews</span>
                </a>
            </Col>
            <Col span={16}>
              <Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[this.state.current]}>
                <Menu.Item key="top">
                  <Icon type="appstore"/>Headline
                </Menu.Item>
                <Menu.Item key="shehui">
                  <Icon type="appstore"/>Social
                </Menu.Item>
                <Menu.Item key="guonei">
                  <Icon type="appstore"/>National
                </Menu.Item>
                <Menu.Item key="guoji">
                  <Icon type="appstore"/>International
                </Menu.Item>
                <Menu.Item key="yule">
                  <Icon type="appstore"/>Entertainment
                </Menu.Item>
                <Menu.Item key="tiyu">
                  <Icon type="appstore"/>Sports
                </Menu.Item>
                <Menu.Item key="keji">
                  <Icon type="appstore"/>Technology
                </Menu.Item>
                <Menu.Item key="shishang">
                  <Icon type="appstore"/>Fashion
                </Menu.Item>
                {userShow}
              </Menu>
              <Modal title="My Profile" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
              onCancel = {()=>this.setModalVisible(false)}
              onOk={()=>this.setModalVisible(false)}
              okText="close">
                <Tabs type="card" onChange={this.callback.bind(this)}>

                  <TabPane tab="Login" key="1">
      							<Form horizontal onSubmit={this.handleSubmit.bind(this)}>
      								<FormItem label="Account">
      									<Input placeholder="Please input your account." {...getFieldProps('userName')}/>
      								</FormItem>
      								<FormItem label="Password">
      									<Input type="password" placeholder="Please input your password." {...getFieldProps('password')}/>
      								</FormItem>
      								<Button type="primary" htmlType="submit">Login</Button>
      							</Form>
      						</TabPane>

                  <TabPane tab="Sign up" key="2">
                    <Form horizontal onSubmit={this.handleSubmit.bind(this)}>
                      <FormItem label="Account">
                        <Input placeholder="Please input your account."{...getFieldProps('r_userName')}/>
                      </FormItem>
                      <FormItem label="Password">
                        <Input type="password" placeholder="Please input your password."{...getFieldProps('r_password')}/>
                      </FormItem>
                      <FormItem label="Confirm">
                        <Input type="password" placeholder="Please input your password again."{...getFieldProps('r_confirmPassword')}/>
                      </FormItem>
                      <Button type="primary" htmlType="submit">Sign up</Button>
                    </Form>
                  </TabPane>
                </Tabs>
              </Modal>
            </Col>
            <Col span={2}></Col>
          </Row>
        </header>
    );
  };
}
export default PCHeader = Form.create({})(PCHeader);
