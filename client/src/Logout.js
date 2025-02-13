import { signedUserOut } from './redux/actions/userInfoAction';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function Logout() {
    const dispatch = useDispatch();
    const userInfo = useSelector((state) => state.userInfo);

    useEffect(() => {
        if (!userInfo || !userInfo?.signedIn) {
            return;
        }

        axios
            .post(
                '/api/logout',
                {},
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                dispatch(signedUserOut(response));
            });
    }, [userInfo?.signedIn]);

    return null;
}

export default Logout;
