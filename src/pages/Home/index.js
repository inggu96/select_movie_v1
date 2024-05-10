import React from 'react';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { Banner } from './Banner';

import { HomeCarousel } from './Carousel/HomeCarousel';
import { RankingCarousel } from './Carousel/RankingCarousel';
import styles from './home.module.scss';

const Home = () => {
  return (
    <section className={styles.wrapper}>
      <Banner />
      <div>
        <article className={styles.ranking}>
          <RankingCarousel />
        </article>

        <article className={styles.category}>
          <h2 className={styles.genreTitle}>
            화끈한 스릴과 긴장감 넘치는 <span>액션 영화</span>
          </h2>
          <HomeCarousel GenreId={'액션'} />

          <h2 className={styles.genreTitle}>
            달콤한 감성으로 마음을 울리는 <span>로맨틱 영화</span>
          </h2>
          <HomeCarousel GenreId={'로맨스'} />

          <h2 className={styles.genreTitle}>
            묵직한 긴장감과 예측불허한 스릴의 <span>범죄 영화</span>
          </h2>
          <HomeCarousel GenreId={'범죄'} />

          <h2 className={styles.genreTitle}>
            모든 가족 구성원이 함께 즐길 수 있는 <span>가족 영화</span>
          </h2>
          <HomeCarousel GenreId={'가족'} />

          <h2 className={styles.genreTitle}>
            웃음으로 스트레스를 날려버릴 <span>코미디 영화</span>
          </h2>
          <HomeCarousel GenreId={'코미디'} />

          <h2 className={styles.genreTitle}>
            타이트한 긴장감으로 당신을 위협하는 <span>스릴러 영화</span>
          </h2>
          <HomeCarousel GenreId={'스릴러'} />

          <h2 className={styles.genreTitle}>
            당신의 상상력을 자극할 <span>판타지 영화</span>
          </h2>
          <HomeCarousel GenreId={'판타지'} />
        </article>
      </div>
    </section>
  );
};

export default Home;
