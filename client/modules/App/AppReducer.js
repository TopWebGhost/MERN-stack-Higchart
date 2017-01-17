// Import Actions
import { TOGGLE_ADD_POST, REFRESH_CHART_DATA } from './AppActions';

// Initial State
const initialState = {
  showAddPost: false,
  chartData: {},
  isChartDataLoaded: false,
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_ADD_POST:
      return {
        showAddPost: !state.showAddPost,
      };
    case REFRESH_CHART_DATA:
      return {
        chartData: action.data,
        isChartDataLoaded: true,
      };
    default:
      return state;
  }
};

/* Selectors */

// Get showAddPost
export const getShowAddPost = state => state.app.showAddPost;

// Export Reducer
export default AppReducer;
