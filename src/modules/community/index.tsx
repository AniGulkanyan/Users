import React, {lazy, Suspense} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {deleteUserById, getUsers, editUser, checkUser} from "../redux/features/userSlice/userSlice";
import {IUser} from "../user/types";
const List = lazy(() => import('../global/components/List'));

export const Community = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const users = useAppSelector(getUsers)

    function handleToggleDelete(id: string) {
        dispatch(deleteUserById(id))
    }

    function handleSaveItem(user: IUser) {
        dispatch(editUser(user));
    }

    function handleChangeChecked(_id: string, checked: boolean) {
        dispatch(checkUser({_id, checked}))
    }

    const goBack = () => navigate('/');

    const communityUsers = users.filter((user) => user.checked === true);

    return (
        <>
            <button onClick={goBack}>Go back</button>
                <div className="listContainer">
                    <Suspense fallback={<div>Loading...</div>}>
                        <List
                            data={communityUsers}
                            handleToggleDelete={handleToggleDelete}
                            handleSaveItem={handleSaveItem}
                            handleOnChange={handleChangeChecked}
                        />
                    </Suspense>
                </div>
        </>
    )
}
