import {useAppDispatch} from "../redux/hooks";
import {useNavigate, useLocation} from "react-router-dom";
import {deleteUserById, editUser} from "../redux/features/userSlice/userSlice";
import React from "react";
import {ListItem} from "../global/components/ListItem";
import './style.css';

export const User = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const data = location.state;

    function handleToggleDelete(id: string) {
        dispatch(deleteUserById(id))
        navigate('/user-list');
    }

    function handleSaveItem(user: any) {
        dispatch(editUser(user));
        navigate('/user-list');
    }

    const goBack = () => navigate('/');

    return (
        <>
            <button onClick={goBack} className="backBtn">Go back</button>
            <div className="listItemWrapper">
                <ListItem
                    data={data as any}
                    handleToggleDelete={handleToggleDelete}
                    handleSaveItem={handleSaveItem}
                />
            </div>
        </>
    )
}
