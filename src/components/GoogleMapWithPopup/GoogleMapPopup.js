import React, { useState } from 'react';
import {
	withScriptjs,
	withGoogleMap,
	GoogleMap,
	Marker,
	InfoWindow,
} from 'react-google-maps';
import Autocomplete from 'react-google-autocomplete';

export const GoogleMapWithPopup = withScriptjs(
	withGoogleMap((props) => {
		const [state, setstate] = useState(false);

		async function changeLocation(type, data) {
			// eslint-disable-next-line default-case
			switch (type) {
				case 'MarkerDrag':
					props.changeFunction({
						...props.globalState,
						location: [
							{
								latitude: data.latLng.lat(),
								longitude: data.latLng.lng(),
							},
						],
					});
					break;
				case 'AutoComplete':
					props.changeFunction({
						...props.globalState,
						location: [
							{
								label: data.formatted_address,
								latitude: data.geometry.location.lat(),
								longitude: data.geometry.location.lng(),
							},
						],
					});
					break;
			}
		}

		function setClickedMarker(pointId, pointName) {
				props.changeFunction({
					...props.globalState,
					dealerPointId: pointId,
					locationName: pointName,
				});
			setTimeout(() => {
				window.location.reload()
			},3000);
		}
		const [modal, setModal] = useState(false);
		let markerClick = true;
		const [point, setPoint] = useState({ pointId: "", pointName: "" });
		return (
			<div>

			{modal?(

				<div id="myModal" className="my-modal d-block">

				<div className="content">
					<div className="header">
						<h2>Sarokh Point</h2>
						<span onClick={()=>setModal(false)} className="close">&times;</span>
					</div>
					<div className="body p-0 m-0">
						<div className=" p-0 m-0">
							<img className=" p-0 m-0" src="/shop-img.jpg" width="100%" alt="" />
						</div>
						<div className="title">
							<h3>MEED 17</h3>
							<p>Mobile Store</p>
						</div>
						<div className="button">
									<button onClick={() => {
										setModal(false);
										setClickedMarker(point.pointId, point.pointName);

									}}>SELECT THIS LOCATION</button>
						</div>
						<div className="info">
							<table>
								<tr>
									<th>Address</th>
									<th>{point.pointName}</th>
								</tr>
								<tr>
									<td>Saturday to sunday timings</td>
									<td>9:00 AM to 11:00 PM</td>
								</tr>
								<tr>
									<td>FRIDAY TIMING</td>
									<td>03:00 PM TO 11:00 PM</td>
								</tr>
							</table>
						</div>

					</div>
				
				</div>

				</div>

							):(

				<div id="myModal" className="modal d-none">

				<div className="modal-content">
					<div className="modal-header">
					<span onClick={()=>setModal(false)} className="close">&times;</span>
					<h2>Modal Header</h2>
					</div>
					<div className="modal-body">
						
						
					</div>
					<div className="modal-footer">
					<h3>Modal Footer</h3>
					</div>
				</div>

				</div>

			)}
			<GoogleMap
				defaultZoom={props.zoom || 6}
				defaultCenter={
					props.defaultCenter
						? props.defaultCenter
						: {
								lat: 23.8859,
								lng: 39.1925,
						  }
				}
				center={
					props.defaultCenter
						? props.defaultCenter
						: {
								lat: 23.8859,
								lng: 39.1925,
						  }
				}
			>
				{props.isMarkerShown &&
					props.position.map((doc, i) => {
						return (
							<Marker
								key={i}
								position={{
									lat: parseFloat(doc.latitude),
									lng: parseFloat(doc.longitude),
								}}
								icon={{url: "/favicon.ico"}}
								draggable={props.draggable}
								onDragEnd={(e) => changeLocation('MarkerDrag', e)}
								onMouseOver={() => setstate(doc.label)}
								onMouseOut={() => setstate(false)}
								onClick={() => {
									if (
										props.markerClickAllow && markerClick &&
										doc.dealerPointId !== undefined
									) {
										setModal(true);
										setPoint({
											pointId: doc.dealerPointId,
											pointName: doc.label,
										});
									}
								}}
							>
								{((state === doc.label && doc.label !== undefined) ||
									(props.keepMarker && doc.label !== undefined)) && (
									<InfoWindow options={{ disableAutoPan: true }}>
										<p
											style={{
												color: 'red',
												padding: 'unset',
												margin: 'unset',
												fontWeight: 'bold',
											}}
										>
											{doc.label}
										</p>
									</InfoWindow>
								)}
							</Marker>
						);
					})}
				{props.autocompleted ? (
					<Autocomplete
						style={{ width: '100%' }}
						onPlaceSelected={(place) => changeLocation('AutoComplete', place)}
						types={[]}
						componentRestrictions={{ country: 'SA' }}
					/>
				) : null}

				</GoogleMap>
</div>
		);
	})
);
