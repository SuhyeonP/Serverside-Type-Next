import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { Form } from 'antd';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import useInput from '../exporthing/useInput';
import { signup } from '../css/newLayout';
import { SIGN_UP_REQUEST } from '../reducers/user';

const SingUpComponent = ({ dispatch }) => {
  const [userId, onChangeId] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePw] = useInput('');

  const [pwCheck, setPwCheck] = useState('');
  const [pwError, setPwError] = useState(false);
  const { logOutDone, isSignedUp, me, signUpError } = useSelector((state:any) => state.user);

  useEffect(() => {
    if (isSignedUp) {
    }
  }, [isSignedUp]);
  useEffect(() => {
    if (signUpError !== '') {
      alert(signUpError);
      Router.reload();
    }
  }, [signUpError]);
  useEffect(() => {
    if (logOutDone) {
    }
  }, [logOutDone]);

  const onChangePwCheck = useCallback((e) => {
    setPwError(e.target.value !== password);
    setPwCheck(e.target.value);
  }, [password]);

  const JoinUs = useCallback((e) => {
    if (password !== pwCheck) {
      return setPwError(true);
    }
    const shopMaster = 0;
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: { userId, nick, password, shopMaster },
    });
  }, [userId, nick, password, pwCheck]);

  return (
    <>
      <div css={signup}>
        <Form onFinish={JoinUs}>
          <div>
            <label htmlFor="nick">닉네임&nbsp;:&nbsp;</label>
            <input required name="nick" value={nick} onChange={onChangeNick} />
          </div>
          <div>
            <label htmlFor="uid">ID&nbsp;:&nbsp;</label>
            <input required name="uid" value={userId} onChange={onChangeId} />
          </div>
          <div>
            <label htmlFor="pw">PW&nbsp;:&nbsp;</label>
            <input type="password" required name="pw" value={password} onChange={onChangePw} />
          </div>
          <div>
            <label htmlFor="pwc">PWCheck&nbsp;:&nbsp;</label>
            <input type="password" required name="pwc" value={pwCheck} onChange={onChangePwCheck} />
          </div>
          {pwError && <div className="pw-error">비밀번호가 일치하지 않습니다.</div>}
          <button type="submit" className="joinBtn">가입하기</button>
        </Form>
      </div>
    </>
  );
};
export default SingUpComponent;
