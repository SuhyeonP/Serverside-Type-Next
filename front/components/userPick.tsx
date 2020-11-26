import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import MenuTable from './menuTable';
import { menuPart1 } from '../pages/shop/[shopId]';
import MenuT from './menuT';

const PickMenu = ({ master }) => {
  const [basket, setBasket] = useState(false);
  const [userMenuBag, setBag] = useState<string[]>([]);
  const [userPriceBag, setPrice] = useState<number[]>([]);
  const { menus, menuPart } = useSelector((state) => state.shop);

  const EmptyBasket = useCallback(() => {
    document.getElementById('userBag').innerHTML = null;
    setBag([]);
    setPrice([]);
    setBasket(false);
  }, []);

  const gotoOrder = useCallback(() => {
    if (userPriceBag.length === 0) {
      alert('아무것도 선택하지 않으셨습니다.');
      return;
    }
    let menu = userMenuBag.join(',');
    if (menu.length > 13) {
      menu = `${menu.slice(0, 12)},,,`;
    }
    const money: number = userPriceBag.reduce((sum, value) => sum + value);
    console.log(`${menu},${money}원 입니다.`);
    const lastCheck = confirm(`${menu},${money}원 입니다.`);
    if (lastCheck) {
      console.log('send to info');
      setBag([]);
      setPrice([]);
    } else {
      alert('취소되었습니다.');
      setBag([]);
      setPrice([]);
      setBasket(false);
      document.getElementById('userBag').innerHTML = null;
    }
  }, [userMenuBag, userPriceBag]);

  return (
    <>
      {!master && <button type="button" className="order-togo" onClick={gotoOrder}>주문하기</button>}
      <div className="userBag">
        <div id="userBag">

        </div>
        {basket && <p className="empty-mybag" onClick={EmptyBasket}>비우기</p>}
      </div>
      <table>
        <tr>
          <td>Menu</td>
          <td>Price</td>
          <td>Part</td>
          <td>GoGo</td>
        </tr>
        {menus.map((x) => (
          menuPart.map((ele) => {
            if (ele === x.MenuPart.partName) {
              return <MenuT master={master} setBasket={setBasket} setPrice={setPrice} setBag={setBag} menu={x} part={ele} userMenuBag={userMenuBag} userPriceBag={userPriceBag} />;
            }
            return null;
          })
        ))}
      </table>
    </>
  );
};
export default PickMenu;
