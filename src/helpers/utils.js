import { Tooltip } from 'antd';

export const apiConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': `${window.location.origin}/`,
    'Access-Control-Allow-Headers':
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
  },
};

export const restrictedConfig = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    'Access-Control-Allow-Origin': `${window.location.origin}/`,
    'Access-Control-Allow-Headers':
      'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization',
  },
};

export const truncate = (text = '', h = 25) => {
  const head = text.slice(0, h);
  // const tail = text.slice(-1 * t, text.length)
  return text.length > h ? (
    <div>
      {head}
      <Tooltip title={text} color={'#303549'} placement='bottomRight'>
        <span>...</span>
      </Tooltip>
    </div>
  ) : (
    text
  );
};

export const truncateTitle = (text = '', h = 25) => {
  const head = text.slice(0, h);
  // const tail = text.slice(-1 * t, text.length)
  return text.length > h ? (
    <div>
      {head}
      <Tooltip title={text} color={'#303549'} placement='bottomRight'>
        <span>...</span>
      </Tooltip>
    </div>
  ) : (
    text
  );
};

export const truncateAddress = (address) => {
  if (!address) return 'No Account';
  const match = address.match(/^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = (num) => {
  const val = Number(num);
  return '0x' + val.toString(16);
};

export const formateIpfsImageUrl = (imageUrl) => {
  // console.log('image url---->', imageUrl)
  return imageUrl.replace('ipfs://', 'https://ipfs.io/ipfs/');
};
