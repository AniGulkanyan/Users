import React from 'react';
import {ListItem} from "../ListItem";
import {IUser} from "../../../user/types";

interface ListProps {
    data: IUser[] | [],
    handleToggleDelete: any,
    editable?: boolean;
    handleToggleEdit?: any;
    handleSaveItem?: any;
    handleOnChange?: any;
    handleOpenListItem?: any;
}

const List = ({
  data,
  handleToggleDelete,
  editable,
  handleToggleEdit,
  handleSaveItem,
  handleOnChange,
  handleOpenListItem = () => {},
} : ListProps) => {
    return (
        <>
            {data.map((item) => (
                <ListItem
                  data={item}
                  handleToggleDelete={handleToggleDelete}
                  editable={editable}
                  handleToggleEdit={handleToggleEdit}
                  handleSaveItem={handleSaveItem}
                  key={item._id}
                  checked={item.checked}
                  handleOnChange={handleOnChange}
                  handleOpenListItem={handleOpenListItem}
                />
        ))}
        </>
    )
}

export default List;