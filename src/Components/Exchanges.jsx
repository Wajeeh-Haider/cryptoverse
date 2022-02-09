import React , {useState , useEffect} from 'react';
import { useGetCurrunciesQuery } from '../services/cryptoApi';
import Loader from './Loader';
import {Row , Col , Card , Input} from 'antd'


const Exchanges = () => {
  const {data , isFetching} = useGetCurrunciesQuery();
  const [SearchCoin, setSearchCoin] = useState('');
  const [Menu, setMenu] = useState();
  const demoImg = 'https://cdn.coinranking.com/Mn61ZjrQr/south-african-rand.svg';

  useEffect(() => {
    const filterData = data?.data?.currencies.filter((coin)=>coin.name.toLowerCase().includes(SearchCoin.toLowerCase()));
    setMenu(filterData);
  }, [SearchCoin]);

  if(isFetching) return <Loader/>

  return(
        <>
        <div className='search-crypto'>
        <Input  placeholder='Search Currencies' onChange={(e)=>setSearchCoin(e.target.value)} />
      </div>
        <Row gutter={[32,32]} className='crypto-card-container'>
        {Menu?.map((currency)=>(
        <Col xs={24} sm={12} lg={8}  xl={6} key={`${currency.uuid}`}>
          <Card className='crypto-card'
          title={`${currency.name}`}
          hoverable 
          extra={<img src={`${currency.iconUrl || demoImg}`} alt='img' className='crypto-image' />}> 
          <p>Sign: {`${currency.sign == null ? ' No Sign ' :  currency.sign}`} </p>
          <p>Symbol: {`${currency.symbol}`} </p>
          </Card>
        </Col>
        ))}
      </Row>
        </>
       );
};

export default Exchanges;
