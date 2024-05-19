import React from 'react';
import styles from './mypage.module.scss';
import Info from './Info';
import InfoDetail from './InfoDetail';

import ReviewBox from './ReviewBox';
import { UserCarousel } from '../Home/Carousel/UserCarousel';

const MyPage = () => {
  return (
    <section className={styles.wrap}>
      <Info />
      {/* <InfoDetail /> */}
      <article className={styles.carousel}>
        <p className={styles.textWrap}>
          <span className={styles.text}>좋아하는 컨텐츠</span>
        </p>
        {/* <UserCarousel name="myLike" /> */}
      </article>
      <article className={styles.carousel}>
        <p className={styles.textWrap}>
          <span className={styles.text}>북마크 한 컨텐츠</span>
        </p>
        {/* <UserCarousel name="myMark" /> */}
      </article>
      <article className={styles.carousel}>
        <p className={styles.textWrap}>
          <span className={styles.text}>작성한 리뷰</span>
        </p>
        {/* <ReviewBox /> */}
      </article>
    </section>
  );
};
export default MyPage;
