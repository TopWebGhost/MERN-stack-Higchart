
export const CHART1_ENDPOINT = 'contacts';
export const CHART2_ENDPOINT = 'accounts';
export const CHART3_ENDPOINT = 'opportunities';
export const CHART4_ENDPOINT = 'brokers';
export const CHART5_ENDPOINT = 'projects';
export const CHART6_ENDPOINT = 'cras';
export const CHART7_ENDPOINT = 'contacts';


export const CHART_API_URL = 'https://api-test.prodigymiami.com';

export default function callChartApi(endpoint, method = 'get', body) {
  return fetch(`${CHART_API_URL}/${endpoint}`, {
    headers: { 'content-type': 'application/json' },
    method,
    body: JSON.stringify(body),
  })
    .then(response => response.json().then(json => ({ json, response })))
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    })
    .then(
      response => response,
      error => error
  );
}

export function getChart1Data() {
    return callChartApi(CHART1_ENDPOINT).then(res => {
      return res;
    });
}

export function getChart2Data() {
  return () => {
    return callChartApi(CHART2_ENDPOINT).then(res => {
      return res;
    });
  };
}

export function getChart3Data() {
  return (dispatch) => {
    return callChartApi(CHART3_ENDPOINT).then(res => {
      return res;
    });
  };
}

export function getChart4Data() {
  return (dispatch) => {
    return callChartApi(CHART4_ENDPOINT).then(res => {
      return res;
    });
  };
}

export function getChart5Data() {
  return (dispatch) => {
    return callChartApi(CHART5_ENDPOINT).then(res => {
      return res;
    });
  };
}
