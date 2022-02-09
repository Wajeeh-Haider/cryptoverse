import React, { useState } from "react";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
import { Typography, Row, Col, Select } from "antd";
import { useParams } from "react-router-dom";
import { MoneyCollectOutlined, DollarCircleOutlined, FundOutlined, ExclamationCircleOutlined, StopOutlined,TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import LineChart from './LineChart';
import { useGetCryptoDetailsQuery } from "../services/cryptoApi";
import { useGetCryptoHistoryQuery } from "../services/cryptoApi";
import Loader from "./Loader";


const { Text, Title } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinID } = useParams();
  const [timePeriod, settimePeriod] = useState('24h');
  const { data, isFetching } = useGetCryptoDetailsQuery(coinID);
  const { data: coinHistory} = useGetCryptoHistoryQuery( {coinID , timePeriod});
  const cryptoDetails = data?.data?.coin;
  
  if (isFetching) return <Loader/>;
  
  const time = [ "3h" ,"24h", "7d", "30d", "3m", "1y", "3y","5y"];
  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "Price At",
      value: `$ ${cryptoDetails?.priceAt && millify(cryptoDetails?.priceAt)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];
  return (
    <>
      <Col className="coin-detail-container">
        <Col className="coin-heading-container">
          <Title level={2} className="coin-name">
            {cryptoDetails.name}({cryptoDetails.symbol})
          </Title>
          <p>
            {cryptoDetails.name} live price in US Dollar (USD). View value
            statistics, market cap and supply.
          </p>
        </Col>
        <Select
          defaultValue="3h"
          placeholder="Select Time Period"
          optionFilterProp="children"
          className="select-timeperiod" 
          onChange={(val) => settimePeriod(val)}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase() >= 0)
          }
        >
          {time.map((val) => (  
            <Option key={val}>{val}</Option>
          ))}
        </Select>
        <LineChart coinHistory={ coinHistory } coinName={cryptoDetails.name} currentPrice={millify(cryptoDetails.price)}/>
        <Col className="stats-container">
          <Col className="coin-value-statistics">
            <Col className="coin-value=statistics-heading">
              <Title level={3} className="coin-details-heading">
                {cryptoDetails.name} Value Statistics
              </Title>
              <p>An overview showing the stats of {cryptoDetails.name}</p>
            </Col>
              {stats.map(({ icon, title, value }, i) => (
                <Col className="coin-stats" key={i}>
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              ))}
          </Col>
          <Col className="other-stats-info">
            <Col className="coin-value-statistics-heading">
              <Title level={3} className="coin-details-heading">
                {cryptoDetails.name} Other Statistics
              </Title>
              <p>An overview showing the stats of all Crypto Curruncies</p>
              {genericStats.map(({ icon, title, value }, i) => (
                <Col className="coin-stats" key={i}>
                  <Col className="coin-stats-name">
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                  </Col>
                  <Text className="stats">{value}</Text>
                </Col>
              ))}
            </Col>
          </Col>
        </Col>
        <Row>
        <Col sm={24} lg={12} className="coin-desk-link">
        <Title level={3} className='coin-details-heading'>
                What is {cryptoDetails.name}?
              </Title>
          {HTMLReactParser((cryptoDetails.description))}
        </Col>
        <Col sm={24} lg={12} className="coin-links" style={{width:'100%'}}> 
          <Title level={3} className="coin-details-heading">{cryptoDetails.name} Links</Title>
          {cryptoDetails.links?.map((link) => (
            <Row className="coin-link" key={link.name}>
              <Title level={5} className="link-name">{link.type}</Title>
              <a href={link.url} target="_blank" rel="noreferrer">{link.name}</a>
          </Row>
          ))} 
        </Col>
        </Row>
      </Col>
    </>
  );
};

export default CryptoDetails;
