import React from 'react'

const StatisticCard = ({title, amount, img}) => {
    return (
        <div className="card-item p-2 rounded-lg bg-gradient-to-r category-item border-collapse">
            <div className="flex gap-x-3.5">
                <div className="rounded-full bg-slate-300 w-16 h-16 p-3">
                    <img src={img} alt="" />
                </div>
                <div className="text-white">
                    <p className="mb-2 text-lg font-bold text-gray-100">{title}</p>
                    <p className="text-xl font-semibold text-gray-100">{amount}</p>
                </div>
            </div>
        </div>
    )
}

export default StatisticCard