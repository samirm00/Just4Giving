import axios from "axios";
import {Button, Card} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import moment from 'moment' ;

// component
import ItemView from "./ItemView";

// Redux
import {createGoods } from '../../redux/actions/goodsInfoAction' ;

export default function Goods() {
    const [goods , setGoods] = useState([]) ;


    // dispatch an action
    const dispatch = useDispatch() ;

    // access the state
    const user_id = useSelector(state => state.userInfo.user_id) ;
    const createdAt = useSelector(state => state.goods.createdAt) ;
    console.log(user_id) ;
    const url = `http://localhost:5000/api/user/goods/${user_id}` ;

    const FetchGoods = async () => {
        const response = await axios.get(url) ;
        const goods = response.data.goods ;

        // fire an action
        dispatch(createGoods(goods)) ;
        console.log(response) ;
        setGoods(goods) } ;



    useEffect( () => {
        FetchGoods() ;
    },[user_id]) ;


    return (
        <div>
            {goods.map(good => (
                <Card key={good.goods_id} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src="holder.js/100px180" />
                    <Card.Body>
                        <Card.Text>  {moment.utc(good.createdAt).local(false).startOf('seconds').fromNow()

                        } </Card.Text>


                        <Card.Title>{good.item_name}</Card.Title>
                        <Card.Text>
                            {good.category}
                        </Card.Text>
                        <Button onClick={ItemDetails} variant="primary">Details</Button>
                    </Card.Body>
                </Card>
                ))}

        </div>
    )

} ;
