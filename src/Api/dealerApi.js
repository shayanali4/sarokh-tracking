import axios from 'axios';

export async function dealerDashboardApi() {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .post(`${process.env.REACT_APP_API}/dealer-mobile/dashboard/${user.id}`)
        .then((res) => {
            if (res.data.status === 200) {
                return res.data.data;
            } else {
                throw new Error(
                    `something went wrong with status code: ${res.data.status}`
                );
            }
        })
        .catch((err) => {
            throw err;
        });

}

export async function getRecieveShipmentDetailsApi() {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .get(`${process.env.REACT_APP_API}/dealer-mobile/get-give-shipments-detail/${user.id}`)
        .then((res) => {
            if (res.data.status === 200) {
                return res.data.data;
            } else {
                throw new Error(
                    `something went wrong with status code: ${res.data.status}`
                );
            }
        })
        .catch((err) => {
            throw err;
        });
}

export async function getGiveShipmentDetailsApi() {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .get(`${process.env.REACT_APP_API}/dealer-mobile/get-give-shipments-detail/${user.id}`)
        .then((res) => {
            if (res.data.status === 200) {
                return res.data.data;
            } else {
                throw new Error(
                    `something went wrong with status code: ${res.data.status}`
                );
            }
        })
        .catch((err) => {
            throw err;
        });
}

export async function recieveShipmentApi(trackingNo) {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .post(`${process.env.REACT_APP_API}/dealer-mobile/recieve-shipment/`, {
            dealerId: user.id,
            trackingNumber: trackingNo
        })
        .then((res) => {
            if (res.data.status === 200) {
                return res.data.data;
            } else {
                throw new Error(
                    `something went wrong with status code: ${res.data.status}`
                );
            }
        })
        .catch((err) => {
            throw err;
        });
}

export async function requestTaskConfirmationApi() {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .get(`${process.env.REACT_APP_API}/dealer-mobile/request-sarokh-task-confirmation?dealerId=${user.id}`)
        .then((res) => {
            if (res.data.status === 200) {
                return res.data.data;
            } else {
                throw new Error(
                    `something went wrong with status code: ${res.data.status}`
                );
            }
        })
        .catch((err) => {
            throw err;
        });
}

export async function getSarokhTaskApi() {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .get(`${process.env.REACT_APP_API}/dealer-mobile/get-sarokh-task/${user.id}`)
        .then((res) => {
            if (res.data.status === 200) {
                return res.data.data;
            } else {
                throw new Error(
                    `something went wrong with status code: ${res.data.status}`
                );
            }
        })
        .catch((err) => {
            throw err;
        });
}

export async function getCityListApi() {
    const user = await JSON.parse(localStorage.getItem('user'));
    return axios
        .get(`${process.env.REACT_APP_API}/city/get-list`)
        .then((res) => {
            if (res.data.status === 200) {
                return res.data.data;
            } else {
                throw new Error(
                    `something went wrong with status code: ${res.data.status}`
                );
            }
        })
        .catch((err) => {
            throw err;
        });
}

export async function getShipperDeliveryChargesApi() {
    return axios
        .get(`${process.env.REACT_APP_API}/shipper/get-shipper-delivery-charges/${1}`)
        .then((res) => {
            if (res.data.status === 200) {
                return res.data.data;
            } else {
                throw new Error(
                    `something went wrong with status code: ${res.data.status}`
                );
            }
        })
        .catch((err) => {
            throw err;
        });
}

