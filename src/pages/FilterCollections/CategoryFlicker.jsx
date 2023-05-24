import React, { useEffect, useRef, useState } from 'react';
import Flicking from '@egjs/react-flicking';
import LEFT_ARROW from '../../images/left_icon_gray.svg';
import RIGHT_ARROW from '../../images/right_icon_gray.svg';
import '@egjs/react-flicking/dist/flicking.css';
import './CategoryFlicker.scss';
import { codesAPI } from '../../services/createCollectionServices';
import { openNotification } from '../../components/Smart/Notification';
import { StringParam, useQueryParams } from 'use-query-params';
import { trendingCollection } from '../../pinata';

const CategoryFlicker = ({ category, setCategory, reloadOnChange }) => {
  const flickinfRef = useRef();
  const [categories, setCategories] = useState([]);
  // const [trending, setTrending] = useState([]);
  console.log('categories', categories);
  const onClickLeft = () => {
    flickinfRef.current.prev();
  };

  const onClickRight = () => {
    flickinfRef.current.next();
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await codesAPI('categoryCode');
        setCategories(res?.data?.body);
      } catch (error) {
        openNotification('Oops', error?.response?.data?.message);
      }
    };

    getCategories();
  }, []);
  // useEffect(() => {
  //   const gettrendingCollection = async () => {
  //     try {
  //       const res = await trendingCollection();
  //       setTrending(res);
  //     } catch (error) {
  //       openNotification('Oops', error?.response?.data?.message);
  //     }
  //   };
  //   gettrendingCollection();
  // }, []);

  const [query, setQuery] = useQueryParams({
    SelectedCategory: StringParam,
  });

  const handleCategory = (code) => {
    console.log('code', typeof code);
    if (reloadOnChange) {
      setCategory(code);
      setQuery({ SelectedCategory: code });
      window.location.reload();
    } else {
      setCategory(code);
      setQuery({ SelectedCategory: code });
    }
    // window.location.reload();
  };

  const handleReset = () => {
    setCategory('');
    setQuery({ SelectedCategory: null });
    reloadOnChange && window.location.reload();
  };

  const getQuery = new URLSearchParams(window?.location?.search);

  // useEffect(()=>{
  //   const query=new URLSearchParams(window?.location?.search);
  //   if(query?.get('SelectedCategory')){
  //     setCategory(query.get('SelectedCategory'));
  //   }
  // },[])

  return (
    <>
      <div className='CategoryFlickerWrapper main_page_width padding_add '>
        <div onClick={onClickLeft} className='arrow leftArrow'>
          <img src={LEFT_ARROW} alt={'LEFT_ARROW'} />
        </div>
        <Flicking
          horizontal
          bound
          viewportTag={'div'}
          defaultIndex={0}
          align={'prev'}
          circular
          ref={flickinfRef}
        >
          {categories?.map((item, index) => {
            return (
              <div key={index} onClick={() => handleCategory(item.code)} className='changeCursor'>
                <div
                  className={
                    item?.code == category || item?.code === getQuery?.get('SelectedCategory')
                      ? 'active'
                      : 'notActive'
                  }
                >
                  {item?.code}
                </div>
              </div>
            );
          })}
        </Flicking>
        <div onClick={onClickRight} className='arrow rightArrow'>
          <img src={RIGHT_ARROW} alt={'RIGHT_ARROW'} />
        </div>
      </div>
      <div className='resetWrapper main_page_width padding_add'>
        <div className='resetFilters' onClick={handleReset}>
          Reset Filters
        </div>
      </div>
    </>
  );
};

export default CategoryFlicker;
