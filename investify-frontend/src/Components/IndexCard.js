import React from 'react'
import "../App.css"

export default function IndexCard(props) {
  return (
    <div className="primary-grid card mar-right">
      <div className='text-card-display whiten font-roboto font-light'>{props.index}</div>
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
