import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";


export const fetchPostsAndUsers=()=>async (dispatch,getState)=>{
    await dispatch(fetchPosts());

    // const userIds= _.uniq(_.map(getState().posts, "userId"))
    
    // userIds.forEach(id=>dispatch(fetchUser(id)))

    //Kodları inceliyorsan aşağıdakinin dökümantasyonunu da bir yokla
    _.chain(getState().posts)
    .map("userId")//chainlenen ilk fonksiyon alttakinin ilk argümanı oluyor, içine yazılan da ikinci argümanı 
    .uniq()
    .forEach(id=>dispatch(fetchUser(id)))
    .value() // veya .execute() ile yukarıdaki işlemleri uygulamaya döküyor
}

export const fetchPosts =()=>async dispatch=>{
    
    const response =await jsonPlaceholder.get("/posts");

    dispatch({type:"FETCH_POSTS",payload:response.data})
}


export const fetchUser = id => async dispatch => {
    const response = await jsonPlaceholder.get(`/users/${id}`);
    dispatch({type:"FETCH_USER", payload:response.data})
}






//Loadash npm must be installed and This one below will not allow us to update a user cause it only allows one time fetching
// const _fetchUser= _.memoize(async (id,dispatch)=> {
//     const response = await jsonPlaceholder.get(`/users/${id}`);
//     dispatch({type:"FETCH_USER", payload:response.data})
// })


// export const fetchPosts=()=>{
//     return async function(dispatch, getState){
//        
//  const response=await jsonPlaceholder.get("/posts");
        
//         dispatch({type:"FETCH_POST", payload:response})
//     }
// }
