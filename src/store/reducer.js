// reducers.js
const initialState = {
    singleObject: null,
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SINGLE_OBJECT':
        return {
          ...state,
          singleObject: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default reducer;