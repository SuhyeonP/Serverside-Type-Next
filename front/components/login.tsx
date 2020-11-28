import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import { Form } from 'antd';
import * as React from 'react';
import useInput from '../exporthing/useInput';
import { LOG_IN_REQUEST } from '../reducers/user';
import { signup } from '../css/newLayout';

const LogIn = ({ dispatch }) => {
  const [userId, onChangeId] = useInput('');
  const [password, onChangePw] = useInput('');

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

  const gotoLogin = useCallback(() => {
    dispatch({
      type: LOG_IN_REQUEST,
      data: { userId, password },
    });
  }, [userId, password]);

  return (
    <div css={signup}>
      <Form onFinish={gotoLogin}>
        <div>
          <label htmlFor="uid">ID&nbsp;:&nbsp;</label>
          <input required name="uid" value={userId} onChange={onChangeId} />
        </div>
        <div>
          <label htmlFor="pw">PW&nbsp;:&nbsp;</label>
          <input type="password" required name="pw" value={password} onChange={onChangePw} />
        </div>
        <button className="joinBtn" type="submit">LogIn</button>
      </Form>
    </div>
  );
};

export default LogIn;
