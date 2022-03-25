const initialState1 = [
    {
        id: 0,
        name: "dixita thummar",
        password : 214
    },
    {
        id: 1,
        name: "ami gajera",
        password: 123
    },
    {
        id: 3,
        name: "meera buha",
        password: 321
    }

];

const contactReducer = (state1 = initialState1, action) => {
    switch (action.type) {
        case "ADD_CONTACT":
            state1 = [...state1, action.payload];
            return state1;
        default:
            return state1;
    }
}
export default contactReducer