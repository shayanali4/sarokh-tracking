import React, { useState, useEffect } from 'react';
import Container from '../../../components/Containers/ListingContainer';
import { useTransition, animated } from 'react-spring';
import { useHistory } from 'react-router-dom';
import Loading from '../../../components/Loading/Loading';
import { toast } from 'react-toastify';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { getCityListApi, getShipperDeliveryChargesApi } from '../../../Api/dealerApi';

export default function DealerDashboard(props) {

	const user = JSON.parse(localStorage.getItem("user"));

	const hist = useHistory();
	const [response, setresponse] = useState({ loading: false });
	const [secondForm, setSecondForm] = useState(false);
	const [firstFormValues, setFirstFormValues] = useState({});
	const [cities, setCities] = useState([]);
	const [shipperDeliveryCharges, setShipperDeliveryCharges] = useState({});
	const [giftPackaging, setGiftPackaging] = useState(false);
	const [insuranceCharges, setInsuranceCharges] = useState(false);

	useEffect(async () => {
		await getCityListApi().then(res => {
			res && setCities(res);
		})
		await getShipperDeliveryChargesApi().then(res => {
			console.log("Shipper DileveryCharges", res);
			res && setShipperDeliveryCharges(res);
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

	const initialValues1 = {
		codAmount: 0,
		dealerId: user.dealerId,
		deliveryCharges: 0,
		deliverySarokhPointId: 0,
		deliveryType: "",
		giftPackaging: true,
		insurance: true,
		locationLatitude: "",
		locationLongitude: "",
		normalPackaging: true,
		paymentMethod: "",
		receiverAddress: "",
		receiverCity: "",
		receiverContact: "",
		receiverName: "",
		receiverType: "",
		senderAddress: "",
		senderContact: "",
		senderIdFile: "",
		senderIdNumber: "",
		senderName: "",
		serviceCharges: 0,
		shipmentContent: "",
		shipmentType: "",
		shipmentValue: 0,
		shipmentWeight: "",
		totalAmount: 0
	  };

	  const initialValues2 = {
		deliveryType: "",
	  };

	const firstFormSchema = Yup.object().shape({
		senderName: Yup.string().required("* Required"),
		senderContact: Yup.string().required("* Required").matches(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, `Invalid! try like "966512345678"`),
		senderIdNumber: Yup.string().required("* Required").matches(/\b[12]\d{9}\b/, "Invalid, Please use correct ID Number or Iqama Number"),
		senderIdFile: Yup.mixed(),
		senderAddress: Yup.string().required("* Required"),
		receiverName: Yup.string().required("* Required"),
		receiverContact: Yup.string().required("* Required").matches(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, `Invalid! try like "966512345678"`),
		receiverCity: Yup.string().required("* Required"),
		shipmentType: Yup.string().required('Required'),
		shipmentWeight: Yup.string().required('Required'),
		shipmentContent: Yup.string().required("* Required"),
		shipmentValue: Yup.string().required("* Required"),
		deliveryType: Yup.string().required('Required'),
	});

	const secondFormSchema = Yup.object().shape({
		deliveryType: Yup.string().required('Required'),
	})

	const onSubmitFirstForm = async (values) => {
		setFirstFormValues(values);
		setSecondForm(true);
		await getShipperDeliveryChargesApi().then(res => {
			console.log("Shipper DileveryCharges");
		})
	}

	const onSubmitSecondForm = (values) => {

	}

	return response.loading ? (
		<Loading />
	) : (
			transitions.map(
				({ item, props, key }) =>
					item && (
						<animated.div key={key} style={props}>
							<Container>
								{ !secondForm ? (
									<>
									<div className="card-header">
									<h2 className="float-left"> Create Shipment - Shipment Detail</h2>
									</div>
									<div className="card-body">
										<Formik
											initialValues={initialValues1}
											validationSchema={firstFormSchema}
											onSubmit={(values) => {
													onSubmitFirstForm(values);
											}}														>
											{(formik) => {
												const { errors, touched, isValid, dirty } = formik;
													return (
														<Form>
															<div className="form-row mb-3">
																<div className="col">
																	<label for="fullname">Sender Name</label>
																	<Field
																		name="senderName" 
																		type="text" 
																		placeholder="Enter Sender Name"
																		className={errors.senderName && touched.senderName ? 
																		"input-error form-control" : "form-control"}
																	/>
																	<ErrorMessage style={{color: 'red'}} name="senderName" component="span" className="error" />
																</div>
																<div className="col">
																	<label for="email">Sender Contact Number</label>
																	<Field
																		name="senderContact" 
																		type="text" 
																		placeholder="Enter Sender Number"
																		className={errors.senderContact && touched.senderContact ? 
																		"input-error form-control" : "form-control"}
																	/>
																	<ErrorMessage style={{color: 'red'}} name="senderContact" component="span" className="error" />
																</div>
															</div>				

															<div className="form-row mb-3">
																<div className="col">
																	<label>National ID or Iqama Number</label>
																	<Field
																		name="senderIdNumber" 
																		type="text" 
																		placeholder="Enter Iqama or National ID Number"
																		className={errors.senderIdNumber && touched.senderIdNumber ? 
																		"input-error form-control" : "form-control"}
																	/>
																	<ErrorMessage style={{color: 'red'}} name="senderIdNumber" component="span" className="error" />
																</div>
																<div className="col">
																	<label htmlFor="email">Upload ID or Iqama</label>
																	<Field
																		name="senderIdFile" 
																		type="file" 
																		placeholder="Enter Iqama or National ID Number"
																		className={errors.senderIdFile && touched.senderIdFile ? 
																		"input-error form-control" : "form-control"}
																	/>
																	<ErrorMessage style={{color: 'red'}} name="senderIdFile" component="span" className="error" />
																</div>
															</div>
															<div className="form-row mb-3">
																<div className="col">
																	<label>Sender Address</label>
																	<Field
																		name="senderAddress" 
																		type="text" 
																		placeholder="Enter complete Address Here"
																		className={errors.senderAddress && touched.senderAddress ? 
																		"input-error form-control" : "form-control"}
																	/>
																	<ErrorMessage style={{color: 'red'}} name="senderAddress" component="span" className="error" />
																</div>
															</div>
															<div className="form-row mb-3">
																<div className="col">
																	<label>Receiver Name</label>
																	<Field
																		name="receiverName" 
																		type="text" 
																		placeholder="Enter Reciever Name"
																		className={errors.receiverName && touched.receiverName ? 
																		"input-error form-control" : "form-control"}
																	/>
																	<ErrorMessage style={{color: 'red'}} name="receiverName" component="span" className="error" />
																</div>
																<div className="col">
																	<label htmlFor="email">Receiver Contact</label>
																	<Field
																		name="receiverContact" 
																		type="text" 
																		placeholder="Enter Reciever Contact"
																		className={errors.receiverContact && touched.receiverContact ? 
																		"input-error form-control" : "form-control"}
																	/>
																	<ErrorMessage style={{color: 'red'}} name="receiverContact" component="span" className="error" />
																</div>
															</div>
															<div className="form-row mb-3">
																<div className="col">
																	<label>Receiver City</label>
																	<Field
																		name="receiverCity" 
																		as="select"  
																		className={errors.receiverCity && touched.receiverCity ? 
																		"input-error form-control" : "form-control"}
																	>
																		<option value="">--- Select Reciever City ---</option>
																		{ cities.map(item => (
																			<option value={item}>{item}</option>
																		)) }	
																	</Field>
																	<ErrorMessage style={{color: 'red'}} name="receiverCity" component="span" className="error" />
																</div>
																<div className="col">
																	<label>Shipment Type</label>
																	<Field
																		name="shipmentType" 
																		as="select" 
																		className={errors.shipmentType && touched.shipmentType ? 
																		"input-error form-control" : "form-control"}
																	>
																		<option value="">--- Select Shipment Type ---</option>
																		<option value="Electronics">Electronics</option>
																		<option value="General Goods">General Goods</option>
																		<option value="Apparel">Apparel</option>
																		<option value="Others">Others</option>
																	</Field>
																	<ErrorMessage style={{color: 'red'}} name="shipmentType" component="span" className="error" />
																</div>
															</div>
															<div className="form-row mb-3">
																<div className="col">
																	<label htmlFor="email">Shipment Weight</label>
																	<Field
																		name="shipmentWeight" 
																		as="select" 
																		className={errors.shipmentWeight && touched.shipmentWeight ? 
																		"input-error form-control" : "form-control"}
																	>
																		<option value="">--- Select Shipment Weight ---</option>
																		<option value="Upto 5 kg">Upto 5 kg</option>
																		<option value="5 kg to 10 kg">5 kg to 10 kg</option>
																		<option value="Above 15 kg">Above 15 kg</option>
																	</Field>
																	<ErrorMessage style={{color: 'red'}} name="shipmentWeight" component="span" className="error" />
																</div>
																<div className="col">
																	<label>Shipment Content</label>
																	<Field
																		name="shipmentContent" 
																		type="text" 
																		placeholder="Enter Shipment Content"
																		className={errors.shipmentContent && touched.shipmentContent ? 
																		"input-error form-control" : "form-control"}
																	/>
																	<ErrorMessage style={{color: 'red'}} name="shipmentContent" component="span" className="error" />
																</div>
															</div>
															<div className="form-row mb-3">
																<div className="col">
																	<label htmlFor="email">Shipment Value</label>
																	<Field
																		name="shipmentValue" 
																		type="text" 
																		placeholder="Enter Shipment Value"
																		className={errors.shipmentValue && touched.shipmentValue ? 
																		"input-error form-control" : "form-control"}
																	/>
																	<ErrorMessage style={{color: 'red'}} name="shipmentValue" component="span" className="error" />
																</div>
																<div className="col">
																	<label htmlFor="email">Delivery Type</label>
																	<Field
																		name="deliveryType" 
																		as="select"
																		className={errors.deliveryType && touched.deliveryType ? 
																		"input-error form-control" : "form-control"}
																	>
																		<option value="">--- Select Delivery Type ---</option>
																		<option value="Customer Address">Customer Address</option>
																		<option value="Sarokh point">Sarokh point</option>
																    </Field>

																	<ErrorMessage style={{color: 'red'}} name="deliveryType" component="span" className="error" />
																</div>
															</div>
										
															<button
																type="submit"
																className={!(dirty && isValid) ? "disabled-btn btn btn-info float-right btnbrown mt-2" : "btn btn-info float-right btnbrown mt-2"}
																disabled={!(dirty && isValid)}
															>
																Next
															</button>
														</Form>
															);
														}}
										</Formik>
									</div>
									</>
								): (
									<>
										<div className="card-header">
									<h2 className="float-left"> Create Shipment - Shipment Payment</h2>
									</div>
									<div className="card-body">
										<Formik
											initialValues={initialValues2}
											validationSchema={secondFormSchema}
											onSubmit={(values) => {
													onSubmitSecondForm(values);
											}}														
										>
											{(formik) => {
												const { errors, touched, isValid, dirty, values } = formik;
													return (
														<Form>
															<div className="form-row">
																<div className="col-md-6">
																	<label htmlFor="email">Delivery Type</label>
																	<Field
																		name="deliveryType" 
																		as="select"
																		className={errors.deliveryType && touched.deliveryType ? 
																		"input-error form-control" : "form-control"}
																	>
																		<option value="">--- Select Delivery Type ---</option>
																		<option value="Customer Address">Customer Address</option>
																		<option value="Sarokh point">Sarokh point</option>
																    </Field>
																	<br/>
																	<h5 style={{color: '#fa1c25'}}>Shipper Bill</h5>
																	<p>Additional Services</p>
																		<table className="table">
																			<tr>
																				<td className="bordertop font14" align="left">
																					<input
																						key={756}
																						type="checkbox"
																						// checked={nopackaging}
																						// onClick={(e) =>
																						// 	addCharges('noPackaging', e.target.checked)
																						// }
																					/>
																					Shipper Packaging
																				</td>
																				<td className="bordertop font14" align="right">
																					SAR {0}/-
																				</td>
																			</tr>
																			<tr>
																				<td className="bordertop font14" align="left">
																					<input
																						key={756}
																						type="checkbox"
																						name="normalPackaging"
																						// checked={data.normalPackaging}
																						// onClick={(e) =>
																						// 	addCharges('normalPackaging', e.target.checked)
																						// }
																						// ref={register()}
																					/>
																					Sarokh Packaging
																				</td>
																				<td className="bordertop font14" align="right">
																					SAR {0}/-
																				</td>
																			</tr>
																			<tr>
																				<td className="font14" align="left">
																					<input
																						key={556}
																						type="checkbox"
																						name="giftPackaging"
																						checked={giftPackaging}
																						onClick={(e) => {
																							setGiftPackaging(e.target.checked);
																						}}
																					/>
																					Gift Packaging
																				</td>
																				<td className="font14" align="right">
																					SAR {Object.keys(shipperDeliveryCharges).length > 0 && shipperDeliveryCharges.giftPackaging}/-
																				</td>
																			</tr>
																			<tr>
																				<td className="font14" align="left">
																					<input
																						key={65}
																						type="checkbox"
																						name="insurance"
																						checked={insuranceCharges}
																						onClick={(e) => {
																							setInsuranceCharges(e.target.checked);
																						}}
																					/>
																					Insurance ({shipperDeliveryCharges.insurance} % of Shipment
																					Value)
																				</td>
																				<td className="font14" align="right">
																					SAR {100 * shipperDeliveryCharges.insurance / firstFormValues.shipmentValue }
																					/-
																				</td>
																			</tr>
																		</table>
																	<table className="table">
																		<tr>
																			<td className="bordertop" align="left">
																				Additional Services Total:
																			</td>
																			<td className="bordertop" align="right">
																				SAR { 
																					(giftPackaging ? parseFloat(shipperDeliveryCharges.giftPackaging) : parseFloat(0)) + 
																					(insuranceCharges ? parseFloat(100 * shipperDeliveryCharges.insurance / firstFormValues.shipmentValue) : parseFloat(0) ) +
																					parseFloat(firstFormValues.shipmentValue) 
																				}/-
																			</td>
																		</tr>
																		<tr>
																			<td>Delivery Charges:</td>
																			<td align="right">SAR {
																				firstFormValues.shipmentWeight === "Upto 5 kg" ? shipperDeliveryCharges.weightUptoFiveKg :
																				firstFormValues.shipmentWeight === "5 kg to 10 kg" ? shipperDeliveryCharges.weightFiveToTen :
																				firstFormValues.shipmentWeight === "Above 15 kg" ? shipperDeliveryCharges.weightTenToFifteen : 0
																			}/-</td>
																		</tr>
																		<tr>
																			<td>Receiver Address Surcharge:</td>
																			<td align="right">
																				SAR {
																					values.deliveryType === "Customer Address" ? shipperDeliveryCharges.lastMile : 0
																				}
																				/-
																			</td>
																		</tr>
																	</table>
																	<table className="table">
																		<tr>
																			<td className="bordertop" align="left">
																				Sub Total:
																			</td>
																			<td className="bordertop" align="right">
																				SAR{' '}
																				/-
																			</td>
																		</tr>
																		<tr>
																			<td align="left">VAT: (15%)</td>
																			<td align="right">
																				SAR{' '}
																				/-
																			</td>{' '}
																			{/* calculation of 15% of the total of all charges */}
																		</tr>
																	</table>
																	<table className="table">
																		<tr>
																			<td className="font18" align="left">
																				Total: (VAT Inclusive)
																			</td>
																			<td className="font18" align="right">
																				SAR{' '}
																				/-
																			</td>{' '}
																			{/* this is the total including the tax of 15% */}
																		</tr>
																	</table>
																</div>
															</div>
														</Form>
													);
												}}
										</Formik>
									</div>
									</>
								)}
							</Container>
						</animated.div>
					)
			)
		);
}
