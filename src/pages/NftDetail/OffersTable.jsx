import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import TEST_ICON from '../../images/test_footer.svg';
import { approveBid, getbid } from '../../pinata';
import BigNumber from 'bignumber.js';
import './OffersTable.scss';
import { useSelector } from 'react-redux';

const OffersTable = ({ nftData }) => {
  const [data, setData] = useState([]);
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const user = useSelector((state) => state.auth.user);

  const [currntUsd, setcurrntUsd] = useState();

  const getBidList = async () => {
    const bidList = await getbid(nftData?.token_id);

    const arr1 =
      bidList?.length > 0 &&
      bidList?.[0]?.map((item, ind) => ({
        bidder: item,
        bidPrice: parseInt(bidList?.[1][ind]),
      }));

    setData(arr1);
    console.log('bidPrice->', arr1);
  };
  const currency = 'usd'; // Enter the currency code to get the exchange rate for
  const symbol = 'eth'; // Enter the cryptocurrency symbol to get the exchange rate for
  const exchangeRate = async () => {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd')
      .then((response) => response.json())
      .then((data) => {
        const price = data.ethereum.usd;
        setcurrntUsd(price);
        console.log(`The current price of Ethereum is ${price} USD`);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getBidList();
    exchangeRate();
  }, []);

  const columns = [
    {
      title: 'Bidder',
      dataIndex: 'name',
      key: 'name',
      render: (value, image) => (
        <>
          <img src={image?.image} width={25} height={25} alt={'not found'} />
          {value}
        </>
      ),
    },
    {
      title: 'Bid',
      dataIndex: 'bid',
      key: 'bid',
    },
    {
      title: 'USD Price',
      dataIndex: 'usdPrice',
      key: 'usdPrice',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];
  const handleRadioChange = (event) => {
    const index = parseInt(event.target.value, 10);
    setSelectedItemIndex(index);
  };

  const handleApproveClick = async () => {
    // Call function with selected item data
    await approveBid(data[selectedItemIndex], nftData?.token_id, nftData);
    window.location.reload();
  };

  const isApproveDisabled = selectedItemIndex === null;
  return (
    <div className='offersWrapper'>
      <div className='offersWrapperApproveDiv'>
        <span className='title'>Offers </span>
        {user?.guid === nftData?.user_guid ? (
          <button
            className={isApproveDisabled ? 'OffersTableButtonDisable' : 'OffersTableButtonEnable'}
            disabled={isApproveDisabled}
            onClick={handleApproveClick}
          >
            Approve
          </button>
        ) : (
          ''
        )}
      </div>

      <div>
        <div className='columns'>
          {user?.guid === nftData?.user_guid && <span> </span>}
          <span>Bidder</span>
          <span>Bid</span>
          <span>USD Price</span>
          {/* <span>Date</span> */}
        </div>
        <div style={{ height: '25vh', overflowY: 'scroll', marginTop: '1%' }}>
          {data?.map((item, index) => {
            return (
              <div className='columnData' key={index}>
                {user?.guid === nftData?.user_guid && (
                  <input
                    type='radio'
                    name={selectedItemIndex}
                    value={index}
                    checked={selectedItemIndex === index}
                    onChange={handleRadioChange}
                  />
                )}
                <span>
                  <span>{item?.bidder.slice(1, 10)}</span>
                </span>
                <div className='eth'>{item?.bidPrice} eth</div>
                <span className='usd'>{item.bidPrice * currntUsd}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default OffersTable;
