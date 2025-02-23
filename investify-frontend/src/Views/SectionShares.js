import React,{ useEffect,useState } from 'react';
import ShareCard from '../Components/ShareCard';
import axios from 'axios';
import SkeletonShareCard from '../Components/SkeletonShareCard';

export default function SectionShares(props) {
  const [data,setData] = useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const response = await axios.get('/api/invest/equity');
        setData(response.data);
        console.log(data);
        return data;
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[data])
  return (
    <div className='primary-flex flex-col overflow-x-scroll mar-top-sml'>
        <p className='text-enlarge whiten font-roboto'>{props.marketType}</p>
        <div className='primary-flex overflow-x-scroll mar-top-card-index'>
            {
              data.length > 0 ? (
                data.slice(props.noOfSharesStart,props.noOfSharesEnd).map((items)=>(
                  <ShareCard logo={items.logo} code={items.CODE} index={items.Name} price={items.Price} profit={items.Change} percent={`(${(items.Change/(items.Price-items.Change)).toFixed(2)})`}/>
                ))
              ):(
                <div className='primary-flex'>
                  <SkeletonShareCard/>
                  <SkeletonShareCard/>
                  <SkeletonShareCard/>
                  <SkeletonShareCard/>
                </div>
            )}
        </div>
    </div>
  )
}
