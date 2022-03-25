const initialstate = {
    user: [],   

}

const userReducer = (state = initialstate, action) => {
    switch (action.type) {
        case "SHOW_DATA": {
            return {
                ...state,
                user: action.payload,
            }
        }
        case "LOAD_DATA": {
            return {
                ...state,
                user: action.payload,
            } 
        }
        default:
            return state;
    }
}
export default userReducer