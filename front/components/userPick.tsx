import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { SmileOutlined } from '@ant-design/icons';
import MenuT from './menuT';
import { ORDER_USER_REQUEST } from '../reducers/user';
import { LOAD_SHOP_REQUEST } from '../reducers/shop';

const PickMenu = ({ master, me }) => {
  const [basket, setBasket] = useState(false);
  const [userMenuBag, setBag] = useState<string[]>([]);
  const [userPriceBag, setPrice] = useState<number[]>([]);
  const { menus, menuPart, hasMoreMenu } = useSelector((state:any) => state.shop);
  const router = useRouter();
  const { shopId } = router.query;
  const dispatch = useDispatch();
  const countRef = useRef([]);const EmptyBasket = useCallback(() => {
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
    const order = userMenuBag.join(' ');
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

  const goMore = useCallback(() => {
    const lastId = menus[menus.length - 1]?.id;
    console.log(lastId);
    dispatch({
      type: LOAD_SHOP_REQUEST,
      data: { shopId, lastId },
    });
    countRef.current.push(lastId);
  }, [hasMoreMenu, menus.length]);

  return (
    <>
      {!master && (
      <button type="button" className="order-togo" onClick={gotoOrder}>
        <SmileOutlined />
        <p>주문하기</p>
      </button>
      )}
      <div className="userBag">
        <div id="userBag" />
        {basket && <div className="empty-mybag"><p onClick={EmptyBasket}>비우기</p></div>}
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
            return <MenuT master={master} setBasket={setBasket} setPrice={setPrice} setBag={setBag} menu={x} part={ele} userMenuBag={userMenuBag} userPriceBag={userPriceBag} />;
          })
        ))}
        <div onClick={goMore}>more</div>
      </table>
    </>
  );
};
export default PickMenu;
