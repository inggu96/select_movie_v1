import React, { useEffect, useState } from 'react';
import styles from './accordion.module.scss';
import { ChevronUp } from '../../../assets/icon';
import cx from 'classnames';
import dayjs from 'dayjs';
import Input from '../../../components/Common/Input';
import useMe from '../../../hooks/useMe';
import { isLoginAtom } from '../../../state';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { createReviewComment } from '../../../api/Reviews';
import { Comment, Review } from '../../../components/Comment';

const Accordion = ({ review, fetchReviews }) => {
  const { me } = useMe();
  const isLogin = useRecoilValue(isLoginAtom);
  const navigate = useNavigate();

  const [isClicked, setIsClicked] = useState(false);
  const [reviewComments, setReviewComments] = useState([]);
  const [newReviewComment, setNewReviewComment] = useState({
    content: '',
  });

  const onClickLogin = () => navigate('/auth/login');
  const onClickCommentAccordion = () => setIsClicked(!isClicked);

  const onChangeInput = (e) =>
    setNewReviewComment({ content: e.currentTarget.value });

  const setUserName = (user) => {
    return user.nickname ?? user.name ?? '닉네임없음';
  };

  // 리뷰의 '댓글' 등록 버튼 클릭 이벤트
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!newReviewComment.content) {
      return alert('댓글을 입력해주세요.');
    }
    await createReviewComment(review.id, newReviewComment);
    await fetchReviews();
    setNewReviewComment({ content: '' });
    setReviewComments(review.comments);
  };

  useEffect(() => {
    setReviewComments(review.comments);
  }, [review.comments]);

  // jsx
  return (
    <li className={cx(styles.accordionWrap)}>
      {/* 리뷰 */}
      <Review
        userName={setUserName(review.user)}
        comment={review.content}
        date={dayjs(review.createdAt).format('YYYY.MM.DD')}
        rating={review.score}
        reviewId={review.id}
        written={review.user.id}
        fetchReviews={fetchReviews}
      />

      {/* 로그인 상태의 댓글 input */}
      {isLogin && (
        <form className={styles.commentInputWrap} onSubmit={onSubmit}>
          <p className={styles.userName}>{me && setUserName(me)}</p>
          <Input
            className={styles.input}
            placeholder="바르고 고운말~ㅇ.<"
            value={newReviewComment.content}
            onChange={onChangeInput}
          />
          <button type="button" onClick={onSubmit}>
            등록
          </button>
        </form>
      )}

      {/* 로그아웃 상태의 댓글 input */}
      {isLogin || (
        <div className={styles.logout} onClick={onClickLogin}>
          ✨ 로그인 후 댓글 작성 가능합니다.
        </div>
      )}

      {/* 댓글 accordion */}
      {/* {reviewComments.length === 0 || ( */}
      <>
        {/* <button
            className={cx(styles.showCommentsButton, {
              [styles.isShow]: isClicked,
            })}
            onClick={onClickCommentAccordion}
          >
            댓글 {reviewComments.length}
            <ChevronUp />
          </button> */}

        <article className={styles.commentWrap}>
          {reviewComments?.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment.content}
                userName={setUserName(comment.user)}
                date={dayjs(comment.createdAt).format('YYYY.MM.DD')}
                commentId={comment.id}
                written={comment.user.id}
                fetchReviews={fetchReviews}
              />
            );
          })}
        </article>
      </>
      {/* )} */}
    </li>
  );
};

export default Accordion;
