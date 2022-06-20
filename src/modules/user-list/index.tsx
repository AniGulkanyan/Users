import './style.css';
import React, {useEffect, lazy, Suspense, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {
    deleteUserById,
    getUsers,
    editUser,
    checkUser,
    loadUser,
    addUser
} from "../redux/features/userSlice/userSlice";
import {IUser} from "../user/types";
import {ListItem} from "../global/components/ListItem";
const List = lazy(() => import('../global/components/List'));

export const UserList = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const users = useAppSelector(getUsers)

    const [addNew, setAddNew] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            dispatch(loadUser());
        }

        fetchData()
            .catch((error) => {
               alert(error?.message)
            })
    }, [dispatch]);

    function handleToggleDelete(id: string) {
       dispatch(deleteUserById(id))
    }

    function handleSaveItem(user: IUser) {
        dispatch(editUser(user));
    }

    function handleChangeChecked(_id: string, checked: boolean) {
        dispatch(checkUser({_id, checked}))
    }

    function handleSave(user: IUser) {
        const emptyField = user.name === '' || user.surname === '' || user.email === '';
        if (emptyField) {
            alert('Please fill the empty area!');
        }
        dispatch(addUser(user));
        setAddNew(false);
    }

    const emptyData = {
        name: '',
        surname: '',
        email: '',
    }

    function handleAdd() {
       setAddNew(true);
    }

    function handleOpenListItem(currentUser: any) {
        navigate('/user', {
            state: currentUser,
        });
    }

    const goBack = () => navigate('/');
    return (
        <>
            <div className="btnsContainer">
                <button onClick={goBack}>Go back</button>
                <button onClick={handleAdd}>Add User</button>
            </div>

            <div className="listContainer">
                <Suspense fallback={<div>Loading...</div>}>
                    <List
                        data={users}
                        handleToggleDelete={handleToggleDelete}
                        handleSaveItem={handleSaveItem}
                        handleOnChange={handleChangeChecked}
                        handleOpenListItem={handleOpenListItem}
                    />
                </Suspense>
                {addNew ? <ListItem
                    data={emptyData}
                    handleSaveItem={handleSave}
                /> : null}
            </div>
        </>
    )
}
