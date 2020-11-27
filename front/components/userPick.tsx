import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import MenuT from './menuT';
import { ORDER_USER_REQUEST } from '../reducers/user';

const PickMenu = ({ master, me }) => {
  const [basket, setBasket] = useState(false);
  const [userMenuBag, setBag] = useState<string[]>([]);
  const [userPriceBag, setPrice] = useState<number[]>([]);
  const { menus, menuPart } = useSelector((state) => state.shop);
  const router = useRouter();
  const { shopId } = router.query;
  const dispatch = useDispatch();

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
    const order = userMenuBag.join('');
    const money: number = userPriceBag.reduce((sum, value) => sum + value);
    const userId = me.id;
    const lastCheck = confirm(`${menu},${money}원 입니다.`);
    if (lastCheck) {
      dispatch({
        type: ORDER_USER_REQUEST,
        data: { order, money, shopId, userId },
      });
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
        <div id="userBag" />
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
