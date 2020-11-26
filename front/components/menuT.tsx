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
      <>
        <tr>
          <td>{menu.menuName}</td>
          <td>{menu.price}</td>
          <td>{part}</td>
        {master
          ? (
            <td>
              <p>
                <DeleteOutlined onClick={() => deleteMenu(part, menu.price)} />
                <EditOutlined onClick={() => changeMenu(part, menu.price)} />
              </p>
            </td>
          )
          : (
            <td>
              <p>
                <CheckSquareOutlined onClick={() => pushMyBag(menu.menuName, menu.price)} />
              </p>
            </td>
          )}
        </tr>
      </>
    </>
  );
};
export default MenuT;
