const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "UPDATE": {
      newState = state.filter((item) => item.id !== action.data.id);
      newState.push({...action.data})
      break;
    }
    case "CREATE": {
      newState = [...state, action.data];
      break;
    }
    case "DELETE": {
      newState = state.filter((it) => it.id !== action.targetId);
      break;
    }
    default:
      return state;
  }

  return newState;
};

export default reducer;
