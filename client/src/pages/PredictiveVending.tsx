import React from 'react'
import { ArrowRight, Box, Gauge, Package2, ShieldCheck, TrendingUp, Warehouse, Zap } from 'lucide-react'

export function PredictiveVending() {
  const items = [
    { name: 'Product A', stock: 240, demand: 320, risk: 'Low', velocity: '3.2x' },
    { name: 'Product B', stock: 120, demand: 260, risk: 'Medium', velocity: '2.4x' },
    { name: 'Product C', stock: 80, demand: 140, risk: 'High', velocity: '1.8x' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.25em] text-slate-400">Predictive Vending</p>
        <h1 className="text-4xl font-black">Inventory intelligence</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Products', value: '128', icon: Package2 },
          { label: 'Stockout risk', value: '11%', icon: ShieldCheck },
          { label: 'Demand forecast', value: '+18.4%', icon: TrendingUp },
        ].map(({ label, value, icon: Icon }) => (
          <div key={label} className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-slate-400 text-sm">{label}</span>
              <Icon className="w-4 h-4 text-lime-400" />
            </div>
            <p className="text-3xl font-black">{value}</p>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="text-2xl font-bold mb-5">Inventory overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] text-left">
            <thead>
              <tr className="border-b border-slate-700 text-sm uppercase tracking-[0.15em] text-slate-400">
                <th className="py-3 pr-4">Product</th>
                <th className="py-3 pr-4">Stock</th>
                <th className="py-3 pr-4">Demand</th>
                <th className="py-3 pr-4">Sales velocity</th>
                <th className="py-3 pr-4">Risk level</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.name} className="border-b border-slate-800">
                  <td className="py-3 pr-4 font-medium">{item.name}</td>
                  <td className="py-3 pr-4">{item.stock}</td>
                  <td className="py-3 pr-4">{item.demand}</td>
                  <td className="py-3 pr-4">{item.velocity}</td>
                  <td className="py-3 pr-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${item.risk === 'Low' ? 'bg-lime-500/15 text-lime-300' : item.risk === 'Medium' ? 'bg-amber-500/15 text-amber-300' : 'bg-rose-500/15 text-rose-300'}`}>
                      {item.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
