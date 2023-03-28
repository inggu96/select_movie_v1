import styles from "./headerLeft.module.scss";
import cx from "classnames";
import { ShareIcon } from "../../../../assets/icon";

// header > 왼쪽 프로필 공통
const HeaderLeft = ({ className, type, userName, date }) => {
  return (
    <article className={cx(styles.left, styles[type], className)}>
      {/* type: child의 경우, 답글 화살표 아이콘 넣기 */}
      {type === "child" && <ShareIcon className={styles.IShare} />}

      <p className={styles.profileIcon}>🤔</p>
      <div className={styles.profileText}>
        <h2 className={styles.userName}>{userName}</h2>
        <p className={styles.date}>{date}</p>
      </div>
    </article>
  );
};
export default HeaderLeft;