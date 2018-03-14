
import React from 'react';
import {Row, Col} from 'antd';
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

class MobileHeader extends React.Component {
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
  setModalVisible(value)
	{
		this.setState({modalVisible: value});
	};

  handleClick(e){
      if(e.key="register"){
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

  login(){
    this.setModalVisible(true);
  };

  callback(key) {
		if (key == 1) {
			this.setState({action: 'login'});
		} else if (key == 2) {
			this.setState({action: 'register'});
		}
	};

  render(){
		let {getFieldProps} = this.props.form;
		const userShow = this.state.hasLogined ?
		<Router>
			<Link to={`/usercenter`}>
				<Icon type="inbox"/>
			</Link>
		</Router>
		:
		<Icon type="setting" onClick={this.login.bind(this)}/>


    return(
      <div id="mobileheader">
        <header>
          <img src="./src/images/logo.png" alt="logo"/>
          <span>ReactNews</span>
          {userShow}
        </header>

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

      </div>
    );
  };
}

export default MobileHeader = Form.create({})(MobileHeader);
