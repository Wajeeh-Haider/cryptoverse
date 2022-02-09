import React , {useState} from "react";
import { Select, Typography, Row, Col, Avatar, Card } from "antd";
import { useGetCryptosNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import moment from 'moment';
import Loader from "./Loader";


const { Text, Title } = Typography;
const { Option } = Select;


const News = ({ simplified }) => {
  const [newsCategory, setnewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews , isFetching } = useGetCryptosNewsQuery({newsCategory,count: simplified ? 6 :12});
  const {data}  = useGetCryptosQuery(100);
  const demoImage =
    "https://images.unsplash.com/photo-1621504450181-5d356f61d307?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80";
    const globalNews = cryptoNews?.value;
    if(isFetching) return <Loader/>
  return (
<>
{!simplified && (
  <div>
    <h1 style={{textAlign:'center' , fontSize:'3rem'}}>All News</h1>
    <Col span={24} style={{margin : '10px 10px'}}>  
    <Select
    showSearch
    placeholder="Select a Currency"
    optionFilterProp="children"
    className="select-news"
    onChange={(val)=>setnewsCategory(val)}
    filterOption={(input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()>=0)}
    >
      <Option value='CryptoCurrency'>Crypto Currency</Option>
      {data?.data?.coins.map((val , i)=>(<Option key={i} value={val.name}>{val.name}</Option>))}
    </Select>
    </Col>
  </div>

)}
    <Row gutter={[24, 24]}>
      {globalNews?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={`${i}`}>
          <Card className="news-card" hoverable>
            <div className="news-image-container">
              <a href={news.url} target="_blank" rel="noreferrer">
                <Title className="news-title" level={3}>
                  {news.name}
                </Title>
                <img
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  className="img"
                  alt="news-image"
                />
              </a>
            </div>
            <p>{news.description > 100 ? news.description.substring(0,100):news.description }</p>
            <div className="provider-container">
            <div>
            <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl || demoImage}/>
            <Text className="provider-name">{news?.provider[0]?.name}</Text>
            </div>
            <Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Text>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
</>
  );
};

export default News;
