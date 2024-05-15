import { useEffect, useState } from 'react';
import { getUserMe } from '../api/Users';

const useMe = (isLogin) => {
  const [me, setMe] = useState(null);

  const onGetMe = async () => {
    const me = await getUserMe();
    if (me.data) {
      setMe(me.data);
    }
  };

  useEffect(() => {
    if (isLogin) {
      onGetMe();
    }
  }, [isLogin]);

  return { me, onGetMe };
};

export default useMe;
