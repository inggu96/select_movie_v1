import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getUserMe } from '../api/Users';
import { isLoginAtom } from '../state';

const useMe = () => {
  const [me, setMe] = useState(null);
  const [isLogin, setIsLogin] = useRecoilState(isLoginAtom);
  const onGetMe = async () => {
    if (!localStorage.getItem('access_token')) {
      setIsLogin(false);
      return;
    }

    try {
      const response = await getUserMe();
      if (response.data) {
        setMe(response.data);
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      setIsLogin(false);
      setMe(null);
    }
  };

  useEffect(() => {
    onGetMe();
    console.log('isLogin', isLogin);
  }, [isLogin]);

  return { me, onGetMe };
};

export default useMe;
