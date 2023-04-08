const updateData = (id,item) => {

}
const createData = (value) => {}
const deleteData = (id) => {}

const reducer = (state,action)=>{
    let newState = [];
    switch (action.type) {
      case "INIT": {
        return action.data;
      }
      case "CHANGE":{
        const snapList = state.filter(item=>item.id!==action.data.id)
        const changeState = state.filter(item=>item.id===action.data.id)
        changeState[0].isCompleted=action.data.check
        return [...snapList,...changeState]
      }
      case "CREATE": {
        newState = [action.data, ...state];
        break;
      }
      case "DELETE": {
        newState = state.filter((it) => it.id !== action.targetId);
        break;
      }
      case "EDIT": {
        newState = state.map((it) => (it.id === action.data.id ? { ...action.data } : it));
        break;
      }
      default:
        return state;
    }
  
    return newState;
}



export default reducer