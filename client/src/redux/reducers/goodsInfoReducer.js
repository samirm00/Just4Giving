 const initialState = {
    goods:[] ,

 }


 export const goodsInfoReducer = (state = initialState , action) => {
    switch (action.type){
        case 'CREATE_GOODS':            
            return Object.assign({},action.payload) ;

        case 'UPDATE_GOODS':
            return Object.assign({},action.payload);

        case 'DELETE_GOODS':
            return Object.assign({},action.payload);
        default:
            return  state ;
    }

 }

