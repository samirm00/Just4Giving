//  const initialState = {
//     goods:[] ,

//  }


 export const goodsInfoReducer = (state = [] , action) => {
    switch (action.type){
        case 'CREATE_GOODS':
            return{ ...state.goods ,...action.payload} ;

        case 'UPDATE_GOODS':
            return{...state.goods, ...action.payload} ;

        case 'DELETE_GOODS':
            return {...state.goods,...action.payload} ;
        default:
            return  state ;
    }

 }

