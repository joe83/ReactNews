import React from 'react';
import {Row, Col, Card} from 'antd';
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
	Modal,
  notification
} from 'antd';
const FormItem = Form.Item;
const SubMenu = Menu.SubMenu;
const TabPane = Tabs.TabPane;
const MenuItemGroup = Menu.ItemGroup;
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';

export default class MobileUserCenter extends React.Component {
	constructor() {
		super();
		this.state = {
			usercollection: '',
			usercomments: '',
			previewImage: '',
			previewVisible: false
		};
	};
	componentDidMount() {
		var myFetchOptions = {
			method: 'GET'
		};
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercollection:json});
		});
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" + localStorage.userid, myFetchOptions)
		.then(response=>response.json())
		.then(json=>{
			this.setState({usercomments:json});
		});
	};
  render (){
		const {usercollection, usercomments} = this.state;
		const usercollectionList = usercollection.length ?
		usercollection.map((uc,index)=>(
				<Card key={index} title={uc.uniquekey} extra={<a href={`/#/details/${uc.uniquekey}`}>Details</a>}>
					<p>{uc.Title}</p>
				</Card>
		))
		:
    'You did not collect any news';

		const usercommentsList = usercomments.length ?
		usercomments.map((comment,index)=>(
				<Card key={index} title={`by ${comment.datetime} wrote ${comment.uniquekey}`} extra={<a href={`/#/details/${comment.uniquekey}`}>Details</a>}>
					<p>{comment.Comments}</p>
				</Card>
		))
		:
		'You did not submit any comments';

    return(
      <div>
        <MobileHeader></MobileHeader>
        <Row>
          <Col span={20}>
            <Tabs>
              <TabPane tab="My Favorite" key="1">
                  <Row>
                    <Col span={24}>
                      {usercollectionList}
                    </Col>
                  </Row>
              </TabPane>
              <TabPane tab="My Comments" key="2">

              </TabPane>
              <TabPane tab="My Icon" key="3">

              </TabPane>
            </Tabs>
          </Col>
        </Row>

        <MobileFooter></MobileFooter>
      </div>
    );
  };
}
