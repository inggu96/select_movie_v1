import { Modal } from '@mui/material';

export const RankingModal2 = ({ open, onClose }) => {
  return (
    <Modal open={open}>
      <div onClick={onClose}>Hello</div>
    </Modal>
  );
};
