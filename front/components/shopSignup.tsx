import { Form } from 'antd';
import * as React from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { SIGN_UP_SHOP_REQUEST } from '../reducers/user';
import useInput from '../exporthing/useInput';
import { signup } from '../css/newLayout';

const ShopSingUp = ({ dispatch }) => {
  const [shopName, onChangeSN] = useInput('');
  const [address, onChangeAd] = useInput('');
  const [part, onChangePart] = useInput('');

  const { me } = useSelector((state:any) => state.user);

  const JoinUsShop = useCallback(() => {
    const master = me.id;
    const shopMaster = 1;
    dispatch({
      type: SIGN_UP_SHOP_REQUEST,
      data: { master, shopName, address, shopMaster, part },
    });
  }, [shopName, address]);

  return (
    <div css={signup}>
      <Form onFinish={JoinUsShop}>
        <input hidden id="user-ID" name="master" value={me.id} />
        <div>
          <label htmlFor="shopName">상점 이름&nbsp;:&nbsp;</label>
          <input required name="shopName" value={shopName} onChange={onChangeSN} />
        </div>
        <div>
          <label htmlFor="address">Address&nbsp;:&nbsp;</label>
          <input required name="address" value={address} onChange={onChangeAd} />
        </div>
        <div>
          <label htmlFor="part">Part&nbsp;:&nbsp;</label>
          <input required name="part" value={part} onChange={onChangePart} />
        </div>
        <button className="joinBtn" type="submit">가입하기</button>
      </Form>
    </div>
  );
};
export default ShopSingUp;
