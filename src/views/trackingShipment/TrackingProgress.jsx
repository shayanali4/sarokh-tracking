import React, { useEffect, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { trackingOrderDetail } from './state';
import { useRecoilState } from 'recoil';
import { isEmpty } from 'underscore';
import Loading from '../../components/Loading/Loading';
import './styles.css';


export default function TrackingProgress(props) {
	const hist = useHistory();
	const [data, setData] = useRecoilState(trackingOrderDetail);
	console.log("my data",data);

	useEffect(() => {
		if (isEmpty(data)) {
			// hist.push('/tracking/input');
		}
	}, []);

	return isEmpty(data) ? (
		<Loading />
	) : (
		<Fragment>
			    <div>
					<h2 className="shipment">Shipment Details</h2>
					<div className="main0">
						<div className="main1">
							<div className="main2">
								<div>Tracking No:</div>
								<div>{data.order.orderId}</div>
							</div>
							{data.order.deliveryLocation === "To Sarokh Point" ?
								(
							<div>
								<Link to="/tracking/addarea">
									<button className="button1">Select Delivery Location</button>
								</Link>
							</div>								
								) :data.order.deliveryLocation === "Last Mile" ? (
							<div>
								<Link to="/tracking/addaddress">
									<button className="button1">Select Delivery Location</button>
								</Link>
							</div>									
							):<></>}

						</div>
						<div className="main3">Delivery Status</div>
						<br/>
						<div className="main4">
							<div className="progress">
							<div className="progress-bar"
								role="progressbar"
								style={{ width: '20%' }}
							>Pending
						</div>
					</div>
						</div>
						<br/>
					</div>
					<div className="main00">
						<div className="main11">
							<p>Shipment Details</p>
							<div className="shipment"> 
								<div className="shipmenttitle">Shipment Tite:</div>
								<div className="shipmentanswer" >{data.shipperName}</div>
							</div>
							<div className="shipment"> 
								<div className="shipmenttitle">Delivery Type :</div>
								<div className="shipmentanswer" >{data.order.deliveryLocation}</div>
							</div>
							{data.order.deliveryLocation === "Sarokh Point" ?
							(<div className="shipment"> 
								<div className="shipmenttitle">Point Name:</div>
									<div className="shipmentanswer" >{data.order.deliveryLocationDetail}</div>
							</div>):(<></>)
							}
							{data.order.shipmentOrderItems[0].address ? (
							<div className="shipment"> 
								<div className="shipmenttitle" > Delivery Address: </div>
								<div className="shipmentanswer" >{data.order.shipmentOrderItems[0].address}</div>
							</div>								
							) : (
							<div className="shipment"> 
								<div className="shipmenttitle" > Delivery Address: </div>
								<div className="shipmentanswer" >N/A</div>
							</div>									
							)}
			
						</div>
						<div className="main22">
							<p>.</p>
							<div className="shipment"> 
								<div className="shipmenttitle" >Creation Date:</div>
								<div className="shipmentanswer" >{data.order.createdDatetime}</div>
							</div>	
							{data.order.shippedDatetime ? (
							<div className="shipment"> 
								<div className="shipmenttitle" >Shipped Date: </div>
								<div className="shipmentanswer" >{data.order.shippedDatetime}</div>
							</div>								
							) : (
							<div className="shipment"> 
								<div className="shipmenttitle" >Shipped Date: </div>
								<div className="shipmentanswer" >N/A</div>
							</div>									
							)}

							<div className="shipment"> 						
								<div className="shipmenttitle" >Delivered:</div>
								<div className="shipmentanswer" >{data.order.shipmentOrderItems[0].deliveryStatus}</div>
							</div>
						</div>
					</div>
				</div>
		</Fragment>
	);
}
