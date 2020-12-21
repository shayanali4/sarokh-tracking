import React from 'react';
import { FaInstagram } from 'react-icons/fa';
import { GrTwitter } from 'react-icons/gr'
import { BiMobile } from 'react-icons/bi'
import { HiOutlineChatAlt } from 'react-icons/hi'
import './styles.css';

function TopNav(props) {
	return (
		<div>
		 	<div className="right">
				<div className="middle">
					<div>  &ensp;&ensp;    Bringing e-commerce to you</div>
					<div  className="fonts1"> &ensp;  <GrTwitter/> &ensp;  <FaInstagram /> <br/> </div>
				</div>
				<div className="contact">Call Us Today : 920033995</div>
			</div>
			<div className="logo1">
				<div>
					<img src="/logo.png" className="logopng" alt="" />
				</div>
				<div></div>
				<div></div>
				<div></div>
				<div className="first1">
					<div className="circle"><BiMobile style={{fontSize:"20px"}} /></div>
						<div className="callus">
							اتصل بنا 
							<p>920033995</p>
							</div>
				</div>
				<div className="second1">
					<div className="circle">
						<HiOutlineChatAlt style={{ fontSize: "20px" }} />
					</div>
					<div className="callus">
						تواصل معنا
						<p>inf0@yahoo.com</p>
					</div>
				</div>
			</div>
			<div className="content-wrapper tracking-nav ">{props.children}</div>
		</div>
	);
}

export default TopNav;
