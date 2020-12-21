import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getGiveShipmentDetailsApi, getRecieveShipmentDetailsApi, getSarokhTaskApi, recieveShipmentApi } from '../../../Api/dealerApi';

export default function SarokhTask(props) {

	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });
	const [giveShipmentList, setGiveShipmentList] = useState([]);
	const [recieveShipmentList, setRecieveShipmentList] = useState([]);
	const [driverId, setDriverId] = useState("");
	const [driverName, setDriverName] = useState("");
	const [amountToPay, setAmountToPay] = useState("");

	console.log("User => ", JSON.parse(localStorage.getItem("user")));

	useEffect(async () => {
		await getSarokhTaskApi().then(res => {
			res && setDriverId(res.driverId);
			res && setDriverName(res.driverName);
			res && setAmountToPay(res.payCOD);
		})
		await getGiveShipmentDetailsApi().then(res => {
			console.log("Give => ", res);
			setGiveShipmentList(res);
		})
		await getRecieveShipmentDetailsApi().then(res => {
			console.log("Recieved -> ", res);
			setRecieveShipmentList(res);
		})
	}, []);

	const transitions = useTransition(!response.loading, null, {
		from: { opacity: 0, transform: 'translate3d(-270px,0,0)' },
		enter: {
			opacity: 1,
			transform: 'translate3d(0,0px,0)',
			transition: 'ease-out 0.3s',
		},
		leave: {
			opacity: 0,
			transform: 'translate3d(-270px,0,0)',
			transition: 'ease-out 0.3s',
		},
	});

	const initialValues = {
		trackingNo: ""
	};

	const trackingNoSchema = Yup.object().shape({
		trackingNo: Yup.string().required("* Required"),
	});

	const onSubmitTrackingNo = async (trackingNo) => {
		await recieveShipmentApi(trackingNo).then(res => {
			console.log("Resss =>>>>>> ", res);
		});
	}

	return response.loading ? (
		<Loading />
	) : (
			transitions.map(
				({ item, props, key }) =>
					item && (
						<animated.div key={key} style={props}>
							<Container>
								<div className="card-header">
									<h2 className="float-left">Sarokh Task</h2>
									<button className="btn btn-info float-right btnbrown">Confirm</button>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-md-8">
											<div className="form-row">
												<div className="col-sm-6">
													<label className="col-sm-6 col-6 redcolor"> Driver Name:</label>
													<label className="col-sm-6 col-6">
														<p className=" text-left">{driverName}</p>
													</label>
												</div>
												<div className="col-sm-6">
													<label className="col-sm-6 col-6 redcolor">Driver ID:</label>
													<label className="col-sm-6 col-6">
														<p className=" text-left">{driverId}</p>
													</label>
												</div>
											</div>
											<div className="form-row">
												<div className="col-sm-6">
													<label className="col-sm-6 col-6 redcolor"> Receiver Shipment:</label>
												</div>
												<div className="col-sm-6">
													<label className="col-sm-6 col-6 redcolor">Give Shipment:</label>
												</div>
												<div className="col-md-6">

												</div>
												<div className="col-md-6">

												</div>
											</div>
										</div>
										<div className="col-md-4">
											<div className="sarokh-pay-detail">
												<h3>Amount to Pay : {amountToPay}</h3>
												<div className="col">
													<Formik
														initialValues={initialValues}
														validationSchema={trackingNoSchema}
														onSubmit={(values) => {
															onSubmitTrackingNo(values.trackingNo);
														}}
														>
														{(formik) => {
															const { errors, touched, isValid, dirty } = formik;
															return (
																<Form>
																	<label for="fullname">Enter Traking No:</label>
																	<Field
																		name="trackingNo" 
																		type="text" 
																		placeholder=" Scan or Type Shipment Tracking Number"
																		className={errors.trackingNo && touched.trackingNo ? 
																		"input-error form-control" : "form-control"}
																	/>
																	<ErrorMessage style={{color: 'red'}} name="trackingNo" component="span" className="error" />
										
																<button
																	type="submit"
																	className={!(dirty && isValid) ? "disabled-btn btn btn-info float-right btnbrown mt-2" : "btn btn-info float-right btnbrown mt-2"}
																	disabled={!(dirty && isValid)}
																>
																	Submit
																</button>
																</Form>
															);
														}}
													</Formik>
												</div>
											</div>
										</div>
										<div className="col-md-3">
											<div>
												<div>Recieve Shipment List</div>
												{recieveShipmentList.length > 0 && recieveShipmentList.map(item => (
													<p>{item.trackingNo}</p>
												))}
											</div>
										</div>
										<div className="col-md-3">
											<div>
												<div>Give Shipment List</div>
												{giveShipmentList.length > 0 && giveShipmentList.map(item => (
													<p>{item.trackingNo}</p>
												))}
											</div>
										</div>
									</div>
								</div>
							</Container>
						</animated.div>
					)
			)
		);
}
