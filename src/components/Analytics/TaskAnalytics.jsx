import React, { useContext, useMemo } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { AuthContext } from '../../context/AuthProvider'

const chartColors = {
  New: '#fbbf24',
  Active: '#3b82f6',
  Completed: '#22c55e',
  Failed: '#ef4444',
}

const TaskAnalytics = () => {
  const { employees } = useContext(AuthContext)

  const chartData = useMemo(() => {
    const totals = { newTask: 0, active: 0, completed: 0, failed: 0 }

    ;(employees ?? []).forEach((emp) => {
      const counts = emp.taskCounts ?? {}
      totals.newTask += counts.newTask ?? 0
      totals.active += counts.active ?? 0
      totals.completed += counts.completed ?? 0
      totals.failed += counts.failed ?? 0
    })

    return [
      { name: 'New', count: totals.newTask, fill: chartColors.New },
      { name: 'Active', count: totals.active, fill: chartColors.Active },
      { name: 'Completed', count: totals.completed, fill: chartColors.Completed },
      { name: 'Failed', count: totals.failed, fill: chartColors.Failed },
    ]
  }, [employees])

  const totalTasks = chartData.reduce((sum, item) => sum + item.count, 0)

  return (
    <div className="mt-6 rounded-xl border border-emerald-900/50 bg-[#1c1c1c] p-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-emerald-400">Task Analytics</h2>
          <p className="mt-1 text-sm text-gray-400">
            Overview of all task statuses across your team
          </p>
        </div>
        <div className="rounded-lg border border-gray-700 bg-black/40 px-4 py-2 text-center">
          <p className="text-xs uppercase tracking-wide text-gray-500">Total Tasks</p>
          <p className="text-2xl font-bold text-white">{totalTasks}</p>
        </div>
      </div>

      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#4b5563' }}
              tickLine={{ stroke: '#4b5563' }}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              axisLine={{ stroke: '#4b5563' }}
              tickLine={{ stroke: '#4b5563' }}
            />
            <Tooltip
              cursor={{ fill: 'rgba(16, 185, 129, 0.08)' }}
              contentStyle={{
                backgroundColor: '#111',
                border: '1px solid #374151',
                borderRadius: '8px',
                color: '#fff',
              }}
              labelStyle={{ color: '#9ca3af' }}
            />
            <Bar dataKey="count" radius={[8, 8, 0, 0]} maxBarSize={72}>
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-6">
        {chartData.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.fill }}
            />
            <span className="text-gray-400">{item.name}</span>
            <span className="font-semibold text-white">{item.count}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TaskAnalytics
