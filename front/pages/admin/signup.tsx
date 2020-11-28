import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { END } from 'redux-saga';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import LogIn from '../../components/login';
import SingUpComponent from '../../components/signUp';
import wrapper from '../../store/configureStore';
import { LOAD_USER_REQUEST, LOG_OUT_REQUEST } from '../../reducers/user';
import ShopSingUp from '../../components/shopSignup';

const Signup = () => {
  const { me, isSignedUp, isShopSignedUp } = useSelector((state:any) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    if (me) {
      document.getElementById('admin-logout').style.display = 'block';
    }
  }, [me]);
  useEffect(() => {
    if (isShopSignedUp) {
      alert('상점등록 성공');
      dispatch({
        type: LOG_OUT_REQUEST,
      });
      router.push('/');
    }
  }, [isShopSignedUp]);

  return (
    <>
      {me !== null
        ? <ShopSingUp dispatch={dispatch} />
        : (
          <div>
            <LogIn dispatch={dispatch} />
            {!isSignedUp && <SingUpComponent dispatch={dispatch} />}
          </div>
        )}
    </>
  );
};
export const getServerSideProps:GetServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default Signup;
