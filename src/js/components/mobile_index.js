import React from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import {Tabs, Carousel} from 'antd';
import MobileList from "./mobile_list";
const TabPane = Tabs.TabPane;
export default class MobileIndex extends React.Component {
	render() {
		const settings = {
			dots: true,
			infinite: true,
			speed: 500,
			slidesToShow: 1,
			autoplay: true
		};
		return (
			<div>
				<MobileHeader></MobileHeader>
				<Tabs>
					<TabPane tab="Headline" key="1">
						<div class="carousel">
							<Carousel {...settings}>
								<div><img src="./src/images/carousel_1.jpg"/></div>
								<div><img src="./src/images/carousel_2.jpg"/></div>
								<div><img src="./src/images/carousel_3.jpg"/></div>
								<div><img src="./src/images/carousel_4.jpg"/></div>
							</Carousel>
						</div>
						<MobileList count={20} type = "top"></MobileList>
					</TabPane>
					<TabPane tab="Social" key="2">
						<MobileList count={20} type = "shehui"></MobileList>
					</TabPane>
					<TabPane tab="National" key="3">
						<MobileList count={20} type = "guonei"></MobileList>
					</TabPane>
					<TabPane tab="International" key="4">
						<MobileList count={20} type = "guoji"></MobileList>
					</TabPane>
					<TabPane tab="Entertainment" key="5">
						<MobileList count={20} type = "yule"></MobileList>
					</TabPane>
				</Tabs>
				<MobileFooter></MobileFooter>
			</div>
		);
	};
}
