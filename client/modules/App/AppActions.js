import callChartApi from './chartApis';

// Export Constants
export const TOGGLE_ADD_POST = 'TOGGLE_ADD_POST';

// Export Actions
export function toggleAddPost() {
  return {
    type: TOGGLE_ADD_POST,
  };
}

export const REFRESH_CHART_DATA = 'REFRESH_CHART_DATA';

// Export Actions
export function refreshChartData(data) {
  return {
    type: REFRESH_CHART_DATA,
    data,
  };
}

export function fetchChartData() {
  return (dispatch) => {
    return callChartApi('opportunities').then(res => {
      dispatch(refreshChartData(res));
    });
  };
}
