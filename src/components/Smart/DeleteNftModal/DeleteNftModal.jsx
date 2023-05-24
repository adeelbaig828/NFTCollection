import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { deleteNftApi } from '../../../services/nftServices';
import axios from 'axios';
import { DeleteOutlined } from '@ant-design/icons';

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

export default function DeleteNftModal({ data }) {
  console.log('DeleteNftModal', data);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDelete = async () => {
    const res = await deleteNftApi(data?.guid)
      .then((res) => {
        console.log('DeleteNftModal then', res);
      })
      .catch((error) => {
        console.log('DeleteNftModal error', error);
      });
    console.log('DeleteNftModal', res);
    handleClose();
    // window.location.reload();
  };

  return (
    <div>
      <div className='edit' disableRipple={true} onClick={handleOpen}>
        <DeleteOutlined style={{ fontSize: '18px' }} />
        <span>Delete</span>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Are you sure you want to delete?
          </Typography>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              variant='contained'
              sx={{ color: '#ffffff', background: '#f37342', marginTop: '5%' }}
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
