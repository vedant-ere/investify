import React from 'react';
import { Link } from 'react-router-dom';

export default function ShareCard(props) {
  return (
    <div className="primary-grid card mar-right">
      <img src={props.logo} alt="" className='logo-img-stk'></img>
      <div className='text-card-display whiten font-roboto font-light'>
        <Link to={`/invest/equity/${props.code}`} className='whiten no-deco font-roboto font-light primary-flex width-max'>{props.index}</Link>
      </div>
      <div className='primary-flex whiten font-roboto font-light mar-top-card-index'>
        <div className='mar-right-card-index'>{props.price}</div>
        <div className='primary-flex mar-right'>
            <div className='active'>{props.profit}</div>
            <div className='active'>{props.percent}</div>
        </div>
      </div>
    </div>
  )
}