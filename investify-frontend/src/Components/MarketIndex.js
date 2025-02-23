import React from 'react';
import IndexCard from '../Components/IndexCard';
import "../App.css";
import { Link } from 'react-router-dom';
import SectionShares from '../Views/SectionShares'; 

export default function MarketIndex(props) {
  return (
    <div className='primary-flex mar-main-extra'>
        <div className='float-10'></div>
        <div className='primary-flex flex-col float-55 overflow-x-scroll'>
          <div>
            <p className='text-enlarge whiten font-roboto'>{props.marketType}</p>
            <div className='primary-flex overflow-x-scroll mar-top-card-index'>
              <IndexCard logo={null} index="SENSEX" price="83,186.56" profit="137.98" percent="(0.15%)"/>
              <IndexCard logo={null} index="NIFTY 50" price="25,424.80" profit="41.56" percent="(0.16%)"/>
              <IndexCard logo={null} index="BANK NIFTY" price="52,250.90" profit="95.20" percent="(0.18%)"/>
              <IndexCard logo={null} index="FINNIFTY" price="24,010.15" profit="23.60" percent="(0.10%)"/>
              <IndexCard logo={null} index="MIDCPNIFTY" price="13,295.30" profit="18.35" percent="(0.13%)"/>
            </div>
          </div>
          <div>
            <SectionShares marketType="Most Bought On Investify" noOfSharesStart="0" noOfSharesEnd="5"></SectionShares>
            <SectionShares marketType="Top Intraday" noOfSharesStart="5" noOfSharesEnd="10"></SectionShares>
            <SectionShares marketType="Highest By Volume" noOfSharesStart="10" noOfSharesEnd="15"></SectionShares>
          </div>
        </div>
        <div className='primary-flex flex-col align-center justify-start float-35'>
          <div className='primary-grid card-full'>
            <div className='primary-flex'>
              <p className='font-roboto whiten float-50 font-light'>Your Investments</p>
              <div className='primary-flex justify-end float-50'>
                <Link to='/' className='green-link'>Dashboard</Link>
              </div>
            </div>
            <div className='primary-flex mar-top-card-index'>
              <div className='float-50'>
                <div className='primary-grid'>
                  <p className='text-enlarge whiten mar-top-card-index font-playfair'>$0</p>
                  <p className='text-card-display whiten font-playfair'>Total Returns</p>
                </div>
              </div>
              <div className='float-50 primary-flex justify-end'>
                <div className='primary-flex flex-col width-max'>
                <p className='text-enlarge whiten mar-top-card-index font-playfair primary-flex justify-end'>$0</p>
                <p className='text-card-display whiten font-playfair'>Total Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}