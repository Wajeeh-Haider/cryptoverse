import React , {useEffect , useState} from 'react';
import {Button , Menu, Typography , Avatar } from 'antd';
import {Link} from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined , BulbOutlined , FundOutlined ,MenuOutlined } from '@ant-design/icons/lib/icons';

const Navbar = () => {
    const [activeMenu, setactiveMenu] = useState(true);
    const [screenSize, setscreenSize] = useState(null);

    useEffect(() => {
        const handleResize = () => setscreenSize(window.innerWidth);
        window.addEventListener('resize' , handleResize);
        handleResize();

        return () => window.removeEventListener('resize' , handleResize)
    }, []);

    useEffect(() => {   
      if(screenSize<768){
        setactiveMenu(false)
      }
      else{
        setactiveMenu(true)
      }
    }, [screenSize]);
    
    


    const {Item} = Menu;
    const {Title} = Typography;
    const icon = 'https://i.ibb.co/Z11pcGG/cryptocurrency.png';
  return(
      <>
        <div className="nav-container">
            <div className="logo-container">
                <Avatar src={icon} size='large'/>
                <Title level={2} className="logo">   
                 <Link to="/" >Crypto Verse</Link>
                </Title>
                <Button  onClick={()=>{setactiveMenu(!activeMenu)}} className='menu-control-container'><MenuOutlined/></Button>
            </div>
            {activeMenu && (
            <Menu theme='dark'>
                <Item icon={<HomeOutlined/>}>
                 <Link to="/" >Home</Link>
                </Item>
                <Item icon={<MoneyCollectOutlined/>}>
                 <Link to="/cryptocurruncies" >Crypto Curruncies</Link>
                </Item>
                <Item icon={<BulbOutlined/>}>
                 <Link to="/exchanges" >All Fiat Curruncies</Link>
                </Item>
                <Item icon={<FundOutlined/>}>
                 <Link to="/news" >News</Link>
                </Item>
            </Menu>
            )}
        </div>
      </>
  )
};

export default Navbar;


