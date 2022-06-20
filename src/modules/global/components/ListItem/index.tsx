import React, {useState} from 'react';
import './style.css';
import {IUser} from "../../../user/types";

type Props<T = IUser> = {
    data: T,
    handleToggleDelete?: (id: string) => void,
    editable?: boolean;
    handleToggleEdit?: (_id: string) => void,
    handleSaveItem?: (user: IUser) => void,
    checked?: boolean,
    handleOnChange?: (_id: string, checked: boolean) => void,
    handleOpenListItem?: (data: any) => void,
}

export const ListItem = ({
     data,
     handleToggleDelete,
     handleSaveItem,
     checked: defaultChecked,
     handleOnChange,
     handleOpenListItem = () => {}
}: Props) => {
    const [editable, setEditable] = useState(false);
    const [updatedData, setUpdatedData] = useState(data);
    const [checked, setChecked] = useState(!!defaultChecked);


    function handleToggleEdit() {
        setEditable(!editable);
    }

    function onChangeHandler(event: any, key: string) {
        setUpdatedData({
            ...updatedData,
            [key]: event.target.value
        })
    }

    return (
        <>
            <div className="mainContainer">
                {handleOnChange ? <input type="checkbox" id={data._id} checked={checked} onChange={() => {
                    handleOnChange(data._id as string, !checked);
                    setChecked(!checked);
                }}/> : null}
                <div onClick={() => handleOpenListItem(data)}>
                    {!editable ? (
                            <div className="labelItemContainer">
                                <label className="labelItem" onClick={handleToggleEdit}>{data.name}</label>
                                <label className="labelItem" onClick={handleToggleEdit}>{data.surname}</label>
                                <label className="labelItem" onClick={handleToggleEdit}>{data.email}</label>
                            </div>
                        ) :
                        (
                            <div className="listItem">
                                <input type="text" className = "inputItem" placeholder={data.name} onChange={(event) => {onChangeHandler(event, 'name')}}/>
                                <input type="text" className = "inputItem" placeholder={data.surname} onChange={(event) => {onChangeHandler(event, 'surname')}}/>
                                <input type="text" className = "inputItem" placeholder={data.email} onChange={(event) => {onChangeHandler(event, 'email')}}/>
                            </div>
                        )}
                </div>

                    {handleToggleDelete ? <button onClick={() => {handleToggleDelete(data._id as string)}} className="btnItem">delete</button> : null}
                    {handleSaveItem ? <button onClick={() => {handleSaveItem(updatedData)}} className="btnItem">Save</button> : null}

            </div>
        </>

    )
}



