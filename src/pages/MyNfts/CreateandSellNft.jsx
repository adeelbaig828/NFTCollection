import React, { useState } from 'react';
import InstructionCard from '../../components/presentational/InstructionCard/InstructionCard';
import SETUP_WALLET from '../../images/setup_wallet.svg';
import CREATE_COLLECTION from '../../images/create_collection.svg';
import ADD_NFT from '../../images/add_nft.svg';
import LIST_NFT from '../../images/list_nft.svg';

import './CreateandSellNft.scss';

const CreateandSellNft = () => {
  const Instruction = [
    {
      id: 1,
      title: 'Set up your wallet',
      description:
        'Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the',
      changeDirection: false,
      imageUrl: SETUP_WALLET,
    },
    {
      id: 2,
      title: 'Create your collection',
      description:
        'Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.',
      changeDirection: true,
      imageUrl: CREATE_COLLECTION,
    },
    {
      id: 3,
      title: 'Add your NFTs',
      description:
        'Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content.',
      changeDirection: false,
      imageUrl: ADD_NFT,
    },
    {
      id: 4,
      title: 'List them for sale',
      description:
        'Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!',
      changeDirection: true,
      imageUrl: LIST_NFT,
    },
  ];

  const [currentAccount, setcurrentAccount] = useState('');
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return console.log('install metamask ');

      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setcurrentAccount(accounts[0]);
    } catch (error) {
      console.log('error while connecting to the wallet');
    }
  };

  return (
    <div className='instructionSection main_page_width'>
      <div className='headingText'>Create and sell your NFTs</div>
      <div>
        <div>
          <div onClick={connectWallet}>
            <InstructionCard
              title='Set up your wallet'
              description='Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the'
              changeDirection={false}
              imageUrl={SETUP_WALLET}
            />
          </div>
          <div>
            <InstructionCard
              url='/createCollection'
              title='Create your collection'
              description='Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.'
              changeDirection={true}
              imageUrl={CREATE_COLLECTION}
            />
          </div>
          <div>
            <InstructionCard
              url='/create-nft-form'
              title='Add your NFTs'
              description='Upload your work (image, video, audio, or 3D art), add a title and description, and customize your NFTs with properties, stats, and unlockable content.'
              changeDirection={false}
              imageUrl={ADD_NFT}
            />
          </div>
          <div>
            <InstructionCard
              title='List them for sale'
              description='Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them!'
              changeDirection={true}
              imageUrl={LIST_NFT}
            />
          </div>
        </div>
        {/* {Instruction.map((item, index) => (
          <InstructionCard
            title={item?.title}
            description={item?.description}
            changeDirection={item?.changeDirection}
            imageUrl={item?.imageUrl}
            key={index}
          />
        ))} */}
      </div>
    </div>
  );
};

export default CreateandSellNft;
