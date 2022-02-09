import React from 'react';
import millify from 'millify';
import { Typography , Row , Col , Statistic } from 'antd';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';
import { CryptoCurruncies , News } from '../Components';
import Loader from './Loader';

const HomePage = () => {
  const {Title} = Typography;
  const {data , isFetching} = useGetCryptosQuery(10);
  const globalstatus = data?.data?.stats;

  if(isFetching) return <Loader/>;
  return (
    <>
       <Title level={2} className="heading" >
        Global Crypto Statistics
       </Title>
      
      <Row>
        <Col span={12}><Statistic title="Total Crypto Currunices" value={globalstatus.total}></Statistic></Col>
        <Col span={12}><Statistic title="Total Coins" value={millify(globalstatus.totalCoins)}></Statistic></Col>
        <Col span={12}><Statistic title="Total Exchange" value={millify(globalstatus.totalExchanges)}></Statistic></Col>
        <Col span={12}><Statistic title="Total Market Cap" value={millify(globalstatus.totalMarketCap)}></Statistic></Col>
        <Col span={12}><Statistic title="Total 24th Volume" value={millify(globalstatus.total24hVolume)}></Statistic></Col>
        <Col span={12}><Statistic title="Total Markets" value={millify(globalstatus.totalMarkets)}></Statistic></Col>
      </Row>

      <div className="home-heading-container">
        <Title level={2} className='home-title' >Top 10 Crypto Curruncies in the World</Title>
        <Title level={3} className='show-more'><Link to='/cryptocurruncies'>Show More</Link></Title>
      </div>

      <CryptoCurruncies simplified/>
      <div className="home-heading-container">
        <Title level={2} className='home-title' >Latest Crypto News</Title>
        <Title level={3} className='show-more'><Link to='/news'>Show More</Link></Title>
      </div>
      
      <News simplified/>

    </>
);
};

export default HomePage;
