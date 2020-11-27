import { jsx } from '@emotion/react';
import Link from 'next/link';
import React, { ReactElement, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { headerList, user, shop, attend, mainSection, gotoHome, makeFactory } from '../css/layout';
import { LOG_IN_REQUEST, LOG_IN_SHOP_REQUEST } from '../reducers/user';
import LogOut from './logout';
interface Props {
  children: ReactElement;
}

const AppLayout:React.FunctionComponent<Props> = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const LoginDummy = useCallback((userId) => {
    dispatch({ type: LOG_IN_REQUEST,
      data: { userId, password: 'test' },
    });
  }, []);
  const LoginShopDummy = useCallback((userId, code) => {
    dispatch({ type: LOG_IN_SHOP_REQUEST,
      data: { userId, password: 'test', master: code },
    });
  }, []);
  return (
    <>
      {me ? <LogOut /> : (
        <>
          <ul css={headerList}>
            {user.map((ele) => <li onClick={() => LoginDummy(ele)}>{ele}</li>)}
            <br />
            {shop.map((element, ind) => <li onClick={() => LoginShopDummy(element, ind + 3)} className="shop">{element}</li>)}
          </ul>
        </>
      )}
      <Link href="/">
        <a css={gotoHome}>
          <HomeOutlined />
          <p>home</p>
        </a>
      </Link>
      <h2 css={attend}>이용자들은 주문을 할수있고, 가게는 주문을 할수있어요!!</h2>
      <div css={mainSection}>
        {children}
      </div>
    </>
  );
};

export default AppLayout;
