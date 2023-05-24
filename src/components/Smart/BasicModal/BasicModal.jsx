import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './BasicModal.scss';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props, { collectionid, setConfirm }) {
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleInvalid = async () => {
    try {
      history.push(`/createNft/${collectionid}`);
    } catch (error) {
      console.log('error', error);
    }
  };
  const handleConfirm = () => {
    setConfirm(true);
    setOpen(false);
  };

  return (
    <div>
      <div onClick={handleOpen}>{props.modalBtn}</div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            {props.modalDesp}
          </Typography>
          <Typography>{props.modalDesp1}</Typography>
          <div className='basicModalBtn' onClick={handleInvalid}>
            {props.btnText}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
