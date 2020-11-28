import Link from 'next/link';
import React, { ReactElement, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HomeOutlined } from '@ant-design/icons';
import { LOG_IN_REQUEST, LOG_IN_SHOP_REQUEST } from '../reducers/user';
import LogOut from './logout';
import { headerList, user, shop } from '../css/newLayout';

interface Props {
  children: ReactElement;
}

const AppLayout:React.FunctionComponent<Props> = ({ children }) => {
  const { me } = useSelector((state:any) => state.user);
  const dispatch = useDispatch();
  const LoginDummy = useCallback((userId) => {
    dispatch({ type: LOG_IN_REQUEST,
      data: { userId, password: 'test' },
    });
  }, []);
  const LoginShopDummy = useCallback((userId, shopId) => {
    dispatch({ type: LOG_IN_SHOP_REQUEST,
      data: { userId, password: 'test', shopId },
    });
  }, []);
  return (
    <>
      <div css={headerList}>
        {me ? <LogOut /> : (
          <>
            <div className="dummy-login">
              {user.map((ele) => <p onClick={() => LoginDummy(ele)}>{ele}</p>)}
              {shop.map((element, ind) => <p onClick={() => LoginShopDummy(element, ind + 1)} className="shop">{element}</p>)}
              <p><Link href="/admin/signup"><a>SignUp</a></Link></p>
            </div>
          </>
        )}
        <Link href="/">
          <a className="goto-home">
            <HomeOutlined />
            <p>home</p>
          </a>
        </Link>
        <h2 className="main-title">
          이용자들은 주문을 할 수 있고,
          <br />
          {' '}
          가게는 주문을 받을 수 있어요!!
        </h2>
        <div>
          {children}
        </div>
      </div>
    </>
  );
};

export default AppLayout;
