import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from 'antd';
import { addBid } from '../../pinata';

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

export default function BasicModal({ nftData }) {
  const [open, setOpen] = React.useState(false);
  const [bid, setBid] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleBid = async () => {
    await addBid(nftData?.token_id, bid);
    window.location.reload();
  };

  return (
    <div>
      <Button className='makeOffer' onClick={handleOpen}>
        Make Offer
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Make an Offer.
          </Typography>
          <Input placeholder='Bid Price' value={bid} onChange={(e) => setBid(e.target.value)} />
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <div
              onClick={handleBid}
              style={{
                padding: '2% 5%',
                border: '1px solid #f37342',
                borderRadius: '10px',
                marginTop: '3%',
              }}
            >
              BID
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
