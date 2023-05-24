import React, { useState } from 'react';
import HEADER_LOGO from '../../../images/headerLogo.svg';
import BELL_ICON from '../../../images/bell_icon.svg';
import PROFILE_ICON from '../../../images/profile_icon.svg';
import SEARCH_ICON from '../../../images/search_icon.svg';
import TOGGLE_ICON from '../../../images/toggle_icon.png';

import { Link } from 'react-router-dom';
import { AutoComplete, Drawer, Tooltip, Dropdown, Menu, Button } from 'antd';
import { searchApi } from '../../../services/searchServices';
import useWindowSize from '../../../helpers/hooks';
import './Header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Logout } from '../../../store/auth/authActions';
import { useHistory } from 'react-router-dom';
import { Web3Connector } from '../../Smart/Web3/Web3Wrapper';
import { StringParam, useQueryParams } from 'use-query-params';
import Spin from '../../presentational/Spin';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = AutoComplete;

const AppHeader = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [browserWidth] = useWindowSize();
  const searchValue = new URLSearchParams(window?.location?.search);
  const [visible, setVisible] = useState(false);
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state?.auth?.isAuthenticated);
  const dispatch = useDispatch();
  const [query, setQuery] = useQueryParams({
    SearchCollection: StringParam,
  });
  const [searchedValue, setSearchedValue] = useState(searchValue?.get('SearchCollection'));

  const handleSearch = async (value) => {
    setLoading(true);
    try {
      setSearchedValue(value);
      if (value) {
        let collections = await searchApi(value);
        setCollections(collections?.data?.body);
      }
      setLoading(false);
    } catch (e) {
      console.log('e', e);
    }
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const onClose = () => {
    setVisible(false);
  };

  const menu = isAuthenticated ? (
    <Menu
      items={[
        {
          key: '1',
          label: <Link to={'/profile'}>My Profile</Link>,
        },
        {
          key: '2',
          label: <Link to={'/settings'}>Settings</Link>,
        },
        {
          key: '3',
          label: <span onClick={() => dispatch(Logout())}>Logout</span>,
        },
      ]}
    />
  ) : (
    <Menu
      items={[
        {
          key: '1',
          label: <Link to={'/auth/login'}>Login</Link>,
        },
      ]}
    />
  );

  const handleClick = (e, id) => {
    e.stopPropagation();
    history.push(`/collectionView/${id}`);
  };

  const searchCollection = (e) => {
    if (e.keyCode == 13 && searchedValue !== '') {
      setQuery({ SelectedCategory: null });
      history.push(`/explore?SearchCollection=${searchedValue}`);
    }
  };

  return (
    <div className='editpf header main_page_width'>
      <div className='dFlex'>
        <div className='logo'>
          <Link to='/'>
            <img src={HEADER_LOGO} alt={'HEADER_LOGO'} />
          </Link>
        </div>

        {isAuthenticated && (
          <div className='searchBar'>
            <AutoComplete
              className='searchBarAutoComplete'
              style={{
                width: 300,
              }}
              onSelect={(e) => onSelect(e)}
              onSearch={handleSearch}
              placeholder={
                <div className='searchPlaceHolder'>
                  <SearchOutlined />
                  <span>Search Here</span>
                </div>
              }
              // placeholder='Search Heree'
              onInputKeyDown={(e) => searchCollection(e)}
              defaultValue={searchValue?.get('SearchCollection')}
              allowClear
            >
              {collections?.length ? (
                collections?.map((location) => (
                  <Option key={location.guid} value={location.store_name}>
                    <div onClick={(e) => handleClick(e, location?.guid)}>{location.store_name}</div>
                  </Option>
                ))
              ) : loading ? (
                <Option key={111} value={'loading'} disabled>
                  <div style={{ textAlign: 'center' }}>
                    <Spin />
                  </div>
                </Option>
              ) : (
                searchedValue && (
                  <Option key={1} value={'No Collections Found'} disabled>
                    No Collections Found
                  </Option>
                )
              )}
            </AutoComplete>
          </div>
        )}
      </div>
      <div className='tabs'>
        {isAuthenticated && (
          <div className='centerTabs'>
            <a href='/explore' target={'_self'}>
              <h3>Explore</h3>
            </a>
            <Link to='/profile'>
              <h3>My Nfts</h3>
            </Link>
            <Link to={'/createCollection'}>
              <h3>Create</h3>
            </Link>
          </div>
        )}
        <div className='icons'>
          <div className='connectButton'>
            <Web3Connector />
          </div>

          {browserWidth < 821 && (
            <span className='toggleIcon' onClick={() => setVisible((prev) => !prev)}>
              <img src={TOGGLE_ICON} alt={'PROFILE_ICON'} />
            </span>
          )}
          <Tooltip
            placement={'bottomLeft'}
            color={'transparent'}
            trigger={'click'}
            title={
              <AutoComplete
                style={{
                  width: 200,
                }}
                onSelect={(e) => onSelect(e)}
                onSearch={handleSearch}
                placeholder={
                  <div className='searchPlaceHolder'>
                    <SearchOutlined />
                    <span>Search Here</span>
                  </div>
                }
                onInputKeyDown={(e) => searchCollection(e)}
                defaultValue={searchValue?.get('SearchCollection')}
                allowClear
              >
                {collections?.length ? (
                  collections?.map((location) => (
                    <Option key={location.guid} value={location.store_name}>
                      <div onClick={() => handleClick(location?.guid)}>{location.store_name}</div>
                    </Option>
                  ))
                ) : loading ? (
                  <Option key={111} value={'loading'} disabled>
                    <div style={{ textAlign: 'center' }}>
                      <Spin />
                    </div>
                  </Option>
                ) : (
                  searchedValue && (
                    <Option key={1} value={'No Collections Found'} disabled>
                      No Collections Found
                    </Option>
                  )
                )}
              </AutoComplete>
            }
          >
            {isAuthenticated && browserWidth < 821 && (
              <span className='headerIcons'>
                <img src={SEARCH_ICON} alt={'SEARCH_ICON'} />
              </span>
            )}
          </Tooltip>
          <span className='headerIcons'>
            <img src={BELL_ICON} alt={'BELL_ICON'} />
          </span>
          <Dropdown overlay={menu} placement='bottomLeft' arrow>
            <span className='headerIcons'>
              <img src={PROFILE_ICON} alt={'PROFILE_ICON'} />
            </span>
          </Dropdown>
        </div>
      </div>
      <Drawer
        title={
          <div onClick={onClose}>
            <Link to='/'>
              <img src={HEADER_LOGO} alt={'HEADER_LOGO'} />
            </Link>
          </div>
        }
        placement={'right'}
        closable={false}
        onClose={onClose}
        visible={visible}
        key={'right'}
      >
        <div className='mobileConnectButton'>
          <Web3Connector />
        </div>
        {isAuthenticated && (
          <>
            <Link to={'/explore'}>
              <h2 onClick={onClose}>Explore</h2>
            </Link>
            <Link to={'/createCollection'}>
              <h2 onClick={onClose}>Create</h2>
            </Link>
          </>
        )}
      </Drawer>
    </div>
  );
};

export default AppHeader;
