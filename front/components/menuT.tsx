import React, { useCallback, useState } from 'react';
import { CheckSquareOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

const MenuT = ({ master, menu, part, setBag, setPrice, setBasket, userMenuBag, userPriceBag }) => {
  const [modifyMode, setModify] = useState(false);
  const pushMyBag = useCallback((mn: string, mp: number) => {
    setBag((prev) => {
      prev.push(mn);
      const put = document.createElement('p');
      put.textContent = mn;
      document.getElementById('userBag').append(put);
      return prev;
    });
    setPrice((prev) => {
      prev.push(mp);
      return prev;
    });
    setBasket(true);
  }, [userMenuBag, userPriceBag]);
  const changeMenu = useCallback((mn, mp) => {
    setModify(true);
    console.log(mn, mp, 'change');
  }, []);
  const deleteMenu = useCallback((mn, mp) => {
    console.log(mn, mp, 'delete');
  }, []);
  return (
    <>
      <div className="paging-menu">
        <p>{menu.menuName}</p>
        <p>{menu.price}</p>
        <p>{part}</p>
        {master
          ? (
            <>
              <p>
                <DeleteOutlined onClick={() => deleteMenu(part, menu.price)} />
                <EditOutlined onClick={() => changeMenu(part, menu.price)} />
              </p>
            </>
          )
          : (
            <>
              <p>
                <CheckSquareOutlined onClick={() => pushMyBag(part, menu.price)} />
              </p>
            </>
          )}
      </div>
    </>
  );
};
export default MenuT;
