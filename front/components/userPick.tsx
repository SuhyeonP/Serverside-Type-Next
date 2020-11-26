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
    const menu = userMenuBag.join(',');
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
      <div id="userBag" className="userBag" />
      {basket && <button type="button" onClick={EmptyBasket}>비우기</button>}
      {!master && <p onClick={gotoOrder}>주문하기</p>}
      {menus.map((x) => (
        menuPart.map((ele) => {
          if (ele === x.MenuPart.partName) {
            return <MenuT master={master} setBasket={setBasket} setPrice={setPrice} setBag={setBag} menu={x} part={ele} userMenuBag={userMenuBag} userPriceBag={userPriceBag} />;
          }
          return null;
        })
      ))}
    </>
  );
};
export default PickMenu;
