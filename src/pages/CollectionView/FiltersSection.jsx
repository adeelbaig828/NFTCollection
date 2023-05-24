import { Checkbox, Collapse } from 'antd';
import React from 'react';
import { useState, useEffect } from 'react';
import { openNotification } from '../../components/Smart/Notification';
import { getCollectionTraitsFilter } from '../../services/collectionServices';
import { getCollectionNft } from '../../services/collectionServices';

const { Panel } = Collapse;

const FiltersSection = ({
  collectionid,
  setTraitType,
  traitType,
  setShowFiltersBar,
  setExtraData,
}) => {
  const [collectionTraitsFilter, setCollectionTraitFilter] = useState(null);
  const [selectedTraitsFilter, setSelectedTraitsFilter] = useState(traitType);
  const parseFilters = (data) => {
    const tempArray = [];
    for (let i = 0; i < data?.length; i++) {
      const findItem = tempArray.find((item) => item.trait_type == data[i].trait_type);
      if (findItem) {
        findItem.value.push(data[i].value);
      } else {
        tempArray.push({
          trait_type: data[i].trait_type,
          value: [data[i].value],
        });
      }
    }
    return tempArray;
  };

  const handleCheck = ({ value, type }) => {
    const index = selectedTraitsFilter.indexOf(value);
    if (index > -1) {
      const newArray = [...selectedTraitsFilter];
      newArray.splice(index, 1);
      setSelectedTraitsFilter(newArray);
    } else {
      setSelectedTraitsFilter([...selectedTraitsFilter, type + '=' + value]);
    }
  };

  const handleIfIsChecked = ({ value, type }) => {
    console.log('i am called');
    const findItem = selectedTraitsFilter.find((item) => item == `${value}`);
    return findItem?.length ? true : false;
  };

  useEffect(async () => {
    try {
      const resp = await getCollectionTraitsFilter(collectionid);
      const result = parseFilters(resp?.data?.body?.data);
      setCollectionTraitFilter(result);
    } catch (error) {
      openNotification('Oops', error?.response?.data?.message);
    }
  }, [collectionid]);
  console.log('collectionTraitsFilter', collectionTraitsFilter);

  const handleApply = () => {
    if (selectedTraitsFilter.length > 0) {
      setTraitType(selectedTraitsFilter);
      setExtraData({
        next_page: 1,
      });
      setShowFiltersBar(false);
    }
    return;
  };

  const handleReset = () => {
    if (selectedTraitsFilter.length > 0) {
      setTraitType([]);
      setShowFiltersBar(false);
    }
    return;
  };
  return (
    <>
      {collectionTraitsFilter?.length && (
        <div className='filtersSection'>
          <Collapse defaultActiveKey={[]} bordered={false} expandIconPosition='end'>
            <div
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                gap: '2%',
              }}
            >
              <p
                style={{
                  color: '#ffffff',
                  background: '#f37342',
                  padding: '2%',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  marginTop: '5%',
                }}
                onClick={handleApply}
              >
                {' '}
                Apply Filter
              </p>
              <p
                style={{
                  color: '#ffffff',
                  background: '#f37342',
                  padding: '2%',
                  cursor: 'pointer',
                  borderRadius: '5px',
                  marginTop: '5%',
                }}
                onClick={handleReset}
              >
                {' '}
                Reset
              </p>
            </div>

            {collectionTraitsFilter?.map((item, index) => {
              return (
                <Panel
                  header={<span className='filtersHeader'>{item.trait_type}</span>}
                  key={index}
                >
                  {item?.value?.map((itemValue) => (
                    <p key={'item' + itemValue}>
                      <Checkbox
                        // checked={selectedTraitsFilter.includes(item)}
                        onClick={() => handleCheck({ value: itemValue, type: item.trait_type })}
                        defaultChecked={traitType.includes(item.trait_type + '=' + itemValue)}
                      >
                        {itemValue}
                      </Checkbox>
                    </p>
                  ))}
                </Panel>
              );
            })}
          </Collapse>
        </div>
      )}
    </>
  );
};

export default FiltersSection;
