import { BellFilled, BellOutlined } from '@ant-design/icons';
import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ShopBell = () => {
  const [orderR, setOrderR] = useState(false);
  const { shopGotOrder, shopGetOrder } = useSelector((state:any) => state.user);
  const openOrder = useCallback(() => {
    if (orderR) {
      setOrderR(false);
    } else {
      setOrderR(true);
    }
  }, [orderR]);
  const onScrollReceipt = useCallback(() => {
    if (orderR && window.scrollY > 100) {
      setOrderR(false);
    }
  }, [orderR]);

  useEffect(() => {
    window.addEventListener('scroll', onScrollReceipt);
    return () => {
      window.removeEventListener('scroll', onScrollReceipt);
    };
  }, [orderR]);

  if (shopGetOrder.length === 0) {
    return (
      <>
        <BellOutlined onClick={openOrder} />
        {orderR && (
        <div className="order-receipt" id="order-receipt">
          <div>
            <p>아직 주문이 없어요 ;ㅅ;</p>
          </div>
        </div>
        )}
      </>
    );
  }
  return (
    <>
      <BellFilled onClick={openOrder} />
      {orderR && (
      <div className="order-receipt" id="order-receipt">
        <div id="scroll-receipt">
          {shopGetOrder.map((ele) => (
            <>
              <div className="order-one">
                <p>{`메뉴:${ele.menus}`},{`결제 금액:${ele.price}`},{`결제 일자:${ele.createdAt}`}</p>
              </div>
            </>
          ))}
        </div>
      </div>
      )}
    </>
  );
};

export default ShopBell;
