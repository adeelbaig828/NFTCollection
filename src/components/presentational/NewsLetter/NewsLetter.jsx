import React from 'react'
import { Input } from 'antd';
import WHITE_ARROW from '../../../images/white_right_arrow.svg';
import './NewsLetter.scss';


const NewsLetter = () => {
  return (
    <div className='newsLetterWrapper main_page_width'>
    <div className='newsLetterContainer'>
    <span className='subscribeHeading'>
    Subscribe for Newsletter
    </span>
    <span className='subscribeDesc'>
    Receive early discount offers, updates and 
    </span>
    <span className='subscribeDesc unsetMargin'>
    new products info.
    </span>
    <span className='emailContainer'>
    <Input placeholder='Email' suffix={<span className='arrowContainer'><img src={WHITE_ARROW} alt={'WHITE_ARROW'} /></span>} />
    </span>
    </div>    
    </div>
  )
}

export default NewsLetter