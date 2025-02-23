import React from 'react'

export default function SkeletonShareCard() {
  return (
    <div className="primary-grid card mar-right">
      <div className='logo-img-stk-skeleton'></div>
      <div>
        <div className='transform-down text-skeleton'></div>
      </div>
      <div className='primary-flex whiten font-roboto font-light mar-top-card-index'>
        <div className='primary-flex mar-right'>
            <div className='text-skeleton'></div>
            <div className='text-skeleton'></div>
        </div>
      </div>
    </div>
  )
}
