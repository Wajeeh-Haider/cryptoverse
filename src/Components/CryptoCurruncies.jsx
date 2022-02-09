import React , {useState , useEffect} from 'react';
import millify from 'millify';
import { Link } from 'react-router-dom';
import {Card, Row , Col, Input} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from './Loader';

const CryptoCurruncies = ({simplified}) => {
  const count =  simplified ? 10 :100;
  const {data : cryptoList , isFetching}  = useGetCryptosQuery(count);
  const [coinsData, setcoinsData] = useState(cryptoList?.data?.coins);
  const [SearchCoin, setSearchCoin] = useState('');


  
  useEffect(() => {
    const filterData = cryptoList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(SearchCoin.toLowerCase()));
    setcoinsData(filterData);
    
  }, [SearchCoin,cryptoList]);
  if(isFetching) return <Loader/>;
  return (
      <>  
      {!simplified && (
      <div className='search-crypto'>
        <Input  placeholder='Search Currencies' onChange={(e)=>setSearchCoin(e.target.value)} />
      </div>
      )}
      <Row gutter={[32,32]} className='crypto-card-container'>
        {coinsData?.map((currency)=>(
        <Col xs={24} sm={12} lg={8}  xl={6} key={`${currency.uuid}`}>
          <Link to={`/crypto/${currency.uuid}`}>
          <Card className='crypto-card'
          title={`${currency.rank}. ${currency.name}`} 
          hoverable 
          extra={<img src={`${currency.iconUrl}`} className='crypto-image' />}> 
          <p>Price: {millify(`${currency.price}`)}</p>
          <p>Market Cap: {millify(`${currency.marketCap}`)}</p>
          <p>Daily Change: {millify(`${currency.change}`)}</p>
          </Card>
          </Link>
        </Col>
        ))}
      </Row>



        </>
    
  )
};

export default CryptoCurruncies;
