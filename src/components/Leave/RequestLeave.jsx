import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const statusStyles = {
  Pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
  Approved: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
  Rejected: 'bg-red-500/20 text-red-400 border-red-500/40',
}

const RequestLeave = ({ data }) => {
  const { employees, admin, setUserData } = useContext(AuthContext)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState('')

  const leaves = data?.leaves ?? []

  const persistEmployees = (updatedEmployees) => {
    setUserData({ employees: updatedEmployees, admin })
    localStorage.setItem('employees', JSON.stringify(updatedEmployees))

    const loggedIn = JSON.parse(localStorage.getItem('loggedInUser'))
    if (loggedIn?.role === 'employee') {
      const fresh = updatedEmployees.find((e) => e.email === loggedIn.data.email)
      if (fresh) {
        localStorage.setItem(
          'loggedInUser',
          JSON.stringify({ role: 'employee', data: fresh })
        )
      }
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (new Date(endDate) < new Date(startDate)) {
      alert('End date cannot be before start date.')
      return
    }

    const newLeave = {
      id: Date.now(),
      startDate,
      endDate,
      reason,
      status: 'Pending',
    }

    const updatedEmployees = employees.map((emp) => {
      if (emp.email !== data.email) return emp
      return {
        ...emp,
        leaves: [...(emp.leaves ?? []), newLeave],
      }
    })

    persistEmployees(updatedEmployees)
    setStartDate('')
    setEndDate('')
    setReason('')
  }

  return (
    <div className="rounded-xl border border-emerald-900/50 bg-[#111] p-5">
      <h2 className="text-lg font-semibold text-emerald-400">Leave Management</h2>
      <p className="mt-1 text-sm text-gray-400">Request time off and track approval status.</p>

      <form
        onSubmit={submitHandler}
        className="mt-5 space-y-4"
      >
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-400">
            Start Date
          </label>
          <input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            type="date"
            className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-400">
            End Date
          </label>
          <input
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            type="date"
            className="w-full rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-gray-400">
            Reason
          </label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            rows={3}
            placeholder="Brief reason for leave..."
            className="w-full resize-none rounded-lg border border-gray-600 bg-transparent px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-emerald-600 py-2.5 text-sm font-semibold transition hover:bg-emerald-500"
        >
          Request Leave
        </button>
      </form>

      <div className="mt-6 border-t border-gray-800 pt-5">
        <h3 className="text-sm font-semibold text-gray-300">My Leave Requests</h3>
        {leaves.length === 0 ? (
          <p className="mt-3 text-sm text-gray-500">No leave requests yet.</p>
        ) : (
          <ul className="mt-3 max-h-48 space-y-3 overflow-y-auto pr-1">
            {[...leaves].reverse().map((leave) => (
              <li
                key={leave.id}
                className="rounded-lg border border-gray-700 bg-black/40 p-3 text-sm"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-gray-300">
                    {leave.startDate} → {leave.endDate}
                  </span>
                  <span
                    className={`shrink-0 rounded-full border px-2 py-0.5 text-xs font-medium ${statusStyles[leave.status] ?? statusStyles.Pending}`}
                  >
                    {leave.status}
                  </span>
                </div>
                <p className="mt-2 text-gray-400">{leave.reason}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default RequestLeave
