import { Tooltip } from 'antd';
import React from 'react';
import { truncateAddress } from '../../helpers/utils';
import './DetailSection.scss';
import LineChart from './LineChart';
import { Collapse } from 'antd';
import OffersTable from './OffersTable';
const { Panel } = Collapse;

const DetailSection = ({ nftData }) => {
  console.log('nftData', nftData);

  return (
    <div className='detailSection'>
      <div className='detailselectedCollection'>
        <div className='detailCollectionDetailsSubHeader'>
          <div className='leftSide'>
            <span className='aboutUserDesc'>
              <Collapse expandIconPosition='end' className='headerDesign'>
                <Panel header={<div className='aboutUser'>Traits & Attributes</div>} key='1'>
                  <div className='nftTraitWrpper'>
                    {nftData.nft_data_attributes?.length
                      ? nftData?.nft_data_attributes?.map((item) => {
                          const percentage = item?.rarity;
                          const roundedNum = percentage.toFixed(1);
                          return (
                            <div
                              className='nftTrait'
                              style={{
                                border:
                                  roundedNum >= 50
                                    ? '1px solid #92c4ea'
                                    : roundedNum < 50 && roundedNum >= 30
                                    ? '1px solid #B87333'
                                    : roundedNum < 30 && roundedNum >= 15
                                    ? '1px solid  #C0C0C0'
                                    : roundedNum < 15 && roundedNum >= 5
                                    ? '1px solid #FFD700'
                                    : roundedNum < 5
                                    ? '1px solid #E5E4E2'
                                    : '1px solid #92c4ea',
                              }}
                            >
                              <span
                                className='name'
                                style={{
                                  color:
                                    roundedNum >= 50
                                      ? '#92c4ea'
                                      : roundedNum < 50
                                      ? '#B87333'
                                      : roundedNum < 30
                                      ? '#C0C0C0'
                                      : roundedNum < 15
                                      ? '#FFD700'
                                      : roundedNum < 5
                                      ? '#E5E4E2'
                                      : '#92c4ea',
                                }}
                              >
                                {item?.trait_name}
                              </span>
                              {/* {roundedNum >= 51 && ( */}
                              <span className='percentage'>{roundedNum}%</span>
                              {/* )} */}
                              {/* {roundedNum >= 31 && roundedNum < 51 && (
                                <span style={{ color: '#B87333' }} className='percentage'>
                                  {roundedNum}%
                                </span>
                              )} */}
                              <span className='value'>{item?.value}</span>
                            </div>
                          );
                        })
                      : 'No Such Traits Yet..'}
                  </div>
                </Panel>
              </Collapse>
            </span>
            <span className='aboutUserDesc'>
              <Collapse expandIconPosition='end' className='headerDesign'>
                <Panel header={<div className='aboutUser'>Long Description</div>} key='1'>
                  <div className='aboutUserDesc'>{nftData?.description_long}</div>
                </Panel>
              </Collapse>
            </span>
          </div>
          <div className='details'>
            <span className='heading'>Details</span>
            <span className='flexStyle'>
              <span className='key'>Contract Address</span>
              <span className='value'>
                {nftData?.contract_address && (
                  <a
                    href={`https://etherscan.io/address/${nftData?.contract_address}`}
                    target='_blank'
                    rel='noreferrer'
                  >
                    <Tooltip
                      color={'#303549'}
                      title={nftData?.contract_address}
                      placement={'leftTop'}
                    >
                      {truncateAddress(nftData?.contract_address)}
                    </Tooltip>
                  </a>
                )}
              </span>
            </span>
            <span className='flexStyle'>
              <span className='key'> Token ID</span>
              <span className='value'>
                <span className='dFlex'>{/* <img src={PRICE_ICON} alt={"PRICE_ICON"} /> */}</span>{' '}
                {nftData?.token_id}
              </span>
            </span>
            <span className='flexStyle'>
              <span className='key'> Token Standard</span>
              <span className='value'>ERC-721</span>
            </span>
            <span className='flexStyle unsetBorder'>
              <span className='key'> Blockchain</span>
              <span className='value'>{nftData?.minting_coin}</span>
            </span>
          </div>
        </div>
        <div className='statsSection'>
          <div className='chartContainer'>
            <LineChart />
          </div>
          <div className='offers'>
            <OffersTable nftData={nftData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailSection;
