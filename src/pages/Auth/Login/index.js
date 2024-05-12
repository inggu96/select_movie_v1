import React, { useState } from 'react';
import styles from './login.module.scss';
import { useLocation } from 'react-router-dom';
import Input from '../../../components/Common/Input';
import { useNavigate } from 'react-router-dom';
import { login } from '../../../api/Auth';
import { isValidateEmail } from '../../../utils';
import { useSetRecoilState } from 'recoil';
import { isLoginAtom } from '../../../state';
import { Button } from '../../../components';

const Login = () => {
  const setIsLogin = useSetRecoilState(isLoginAtom);
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({
    userId: '',
    password: '',
  });

  const [err, setErr] = useState({
    userId: '',
    password: '',
  });

  const onChange = (e) => {
    const { name, value } = e.currentTarget;
    setForm({ ...form, [name]: value });
  };

  const onClick = (path) => navigate(`/${path}`);

  const onSubmit = async (e) => {
    e.preventDefault();
    const { userId, password } = form;

    if (!form.userId) {
      return setErr({ ...err, userId: '이메일을 입력해주세요' });
    }
    if (!isValidateEmail(form.userId)) {
      return setErr({ ...err, userId: '이메일 양식이 틀립니다' });
    }
    if (!form.password) {
      return setErr({
        ...err,
        userId: '',
        password: '비밀번호를 입력해주세요',
      });
    }

    try {
      const response = await login({
        email: userId,
        password,
      });
      console.log('Login response:', response.data); // 로그인 응답 로그 출력

      const { access_token: accessToken, refresh_token: refreshToken } =
        response.data;
      console.log('Access Token:', accessToken);
      console.log('Refresh Token:', refreshToken);
      if (accessToken && refreshToken) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('refresh_token', refreshToken);
        setIsLogin(true);
        navigate(location.state?.prev ?? '/');
      } else {
        console.error('No tokens received');
      }
    } catch (error) {
      console.error('Login Error:', error.response?.data);
      setErr({
        ...err,
        global: error.response?.data?.message || '로그인에 실패했습니다.',
      });
    }
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.login}>
        <h1>로그인</h1>
        <form id="loginForm" className={styles.loginForm} onSubmit={onSubmit}>
          <Input
            className={styles.inputWrap}
            label="이메일"
            errorText={!!err.userId && err.userId}
            onChange={onChange}
            placeholder="이메일을 입력해주세요."
            name="userId"
            value={form.userId}
          />
          <Input
            className={styles.inputWrap}
            label="비밀번호"
            errorText={!!err.password && err.password}
            type="password"
            placeholder="비밀번호를 입력해주세요."
            name="password"
            value={form.password}
            onChange={onChange}
          />
          <Button className={styles.button} type="submit" form="loginForm">
            로그인
          </Button>
          <Button
            className={styles.button}
            type="button"
            onClick={() => onClick('auth/admin')}
          >
            관리자 로그인 페이지로 이동
          </Button>
          <Button
            className={styles.button}
            type="button"
            onClick={() => onClick('auth/register')}
          >
            회원가입 페이지로 이동
          </Button>
        </form>
      </section>
    </main>
  );
};

export default Login;
