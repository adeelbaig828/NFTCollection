import { Button, Input, Select } from 'antd';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Spin from '../../../components/presentational/Spin';
import { openNotification } from '../../../components/Smart/Notification';
import { VerifyUser } from '../../../services/authServices';
import { codesAPI } from '../../../services/createCollectionServices';
import { updateQuestionsAPI } from '../../../services/userServices';
import { setProfile } from '../../../store/auth/authActions';
import './index.scss';

const Security = () => {
  const [loading, setLoading] = useState(false);
  const [securityQuestions, setSecurityQuestions] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.auth?.user);
  const [answer1, setAnswer1] = useState(user?.answer1);
  const [answer2, setAnswer2] = useState(user?.answer2);
  const [answer3, setAnswer3] = useState(user?.answer3);
  const [answer4, setAnswer4] = useState(user?.answer4);
  const [question1, setQuestion1] = useState(user?.question1);
  const [question2, setQuestion2] = useState(user?.question2);
  const [question3, setQuestion3] = useState(user?.question3);
  const [question4, setQuestion4] = useState(user?.question4);

  const onFinish = async () => {
    if (answer1?.length && answer2?.length && answer3?.length && answer4?.length) {
      setLoading(true);
      const data = {
        question1: question1,
        question2: question2,
        question3: question3,
        question4: question4,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
        answer4: answer4,
        has_questions: 1,
      };
      try {
        const res = await updateQuestionsAPI(data);
        const user = await VerifyUser();
        dispatch(setProfile(user));
        setLoading(false);
        openNotification('Success', 'Questions Updated Successfully');
      } catch (error) {
        setLoading(false);
        console.log('error', error);
        // openNotification("Error",error)
      }
    } else {
      openNotification('Warning', 'Kindly Answer all Questions');
    }
  };

  function getKeyByValue(object, value) {
    return Object.keys(object).find((key) => object[key] === value);
  }

  useEffect(() => {
    const getQuestionsCode = async () => {
      const res = await codesAPI('Security Questions');
      setSecurityQuestions(res?.data?.body);
    };
    getQuestionsCode();
  }, []);

  const handleFormFilling = (value, index) => {
    const filterArray = securityQuestions?.slice(0, 4)?.filter((item) => item?.code !== value);
    setSecurityQuestions([...filterArray]);
    const Questionkey = getKeyByValue(user, value);
    const answerIndex = Questionkey?.match(/\d+/);
    if (index == 1) {
      setAnswer1(user?.[`answer${answerIndex}`]);
    } else if (index == 2) {
      setAnswer2(user?.[`answer${answerIndex}`]);
    } else if (index == 3) {
      setAnswer3(user?.[`answer${answerIndex}`]);
    } else if (index == 4) {
      setAnswer4(user?.[`answer${answerIndex}`]);
    } else {
      return null;
    }
  };

  const handleQuestion1Change = (value) => {
    setQuestion1(value);
    handleFormFilling(value, 1);
  };
  const handleQuestion2Change = (value) => {
    setQuestion2(value);
    handleFormFilling(value, 2);
  };
  const handleQuestion3Change = (value) => {
    setQuestion3(value);
    handleFormFilling(value, 3);
  };
  const handleQuestion4Change = (value) => {
    setQuestion4(value);
    handleFormFilling(value, 4);
  };

  return (
    <div className='securityWrapper'>
      <div className='heading'>Security Questions</div>
      <div className='form'>
        <Select
          placeholder='Select Your Question'
          onChange={handleQuestion1Change}
          defaultValue={question1}
          disabled={user?.question1}
        >
          {securityQuestions?.slice(0, 4)?.map((item, index) => {
            return (
              <Select.Option value={item?.code} key={item?.code}>
                {item?.description}
              </Select.Option>
            );
          })}
        </Select>

        <Input
          value={answer1}
          onChange={(e) => setAnswer1(e.target.value)}
          placeholder='Type Your Answer Here'
        />

        <Select
          placeholder='Select Your Question'
          onChange={handleQuestion2Change}
          defaultValue={question2}
          disabled={user?.question2}
        >
          {securityQuestions?.slice(0, 4)?.map((item, index) => {
            return (
              <Select.Option value={item?.code} key={item?.code}>
                {item?.description}
              </Select.Option>
            );
          })}
        </Select>

        <Input
          value={answer2}
          onChange={(e) => setAnswer2(e.target.value)}
          placeholder='Type Your Answer Here'
        />

        <Select
          placeholder='Select Your Question'
          onChange={handleQuestion3Change}
          defaultValue={question3}
          disabled={user?.question3}
        >
          {securityQuestions?.slice(0, 4)?.map((item, index) => {
            return (
              <Select.Option value={item?.code} key={item?.code}>
                {item?.description}
              </Select.Option>
            );
          })}
        </Select>

        <Input
          value={answer3}
          onChange={(e) => setAnswer3(e.target.value)}
          placeholder='Type Your Answer Here'
        />

        <Select
          placeholder='Select Your Question'
          onChange={handleQuestion4Change}
          defaultValue={question4}
          disabled={user?.question4}
        >
          {securityQuestions?.slice(0, 4)?.map((item, index) => {
            return (
              <Select.Option value={item?.code} key={item?.code}>
                {item?.description}
              </Select.Option>
            );
          })}
        </Select>

        <Input
          value={answer4}
          onChange={(e) => setAnswer4(e.target.value)}
          placeholder='Type Your Answer Here'
        />

        <Button type='primary' onClick={onFinish}>
          {loading ? <Spin /> : 'Submit'}
        </Button>
      </div>
    </div>
  );
};

export default Security;
