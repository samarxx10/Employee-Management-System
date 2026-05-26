import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const LeaveRequests = () => {
  const { employees, admin, setUserData } = useContext(AuthContext)

  const pendingRequests = (employees ?? []).flatMap((emp) =>
    (emp.leaves ?? [])
      .filter((leave) => leave.status === 'Pending')
      .map((leave) => ({
        ...leave,
        employeeName: emp.firstName,
        employeeEmail: emp.email,
      }))
  )

  const updateLeaveStatus = (employeeEmail, leaveId, status) => {
    const updatedEmployees = employees.map((emp) => {
      if (emp.email !== employeeEmail) return emp
      return {
        ...emp,
        leaves: (emp.leaves ?? []).map((leave) =>
          leave.id === leaveId ? { ...leave, status } : leave
        ),
      }
    })

    setUserData({ employees: updatedEmployees, admin })
    localStorage.setItem('employees', JSON.stringify(updatedEmployees))
  }

  return (
    <div className="mt-6 rounded-xl border border-emerald-900/50 bg-[#1c1c1c] p-5">
      <h2 className="text-xl font-semibold text-emerald-400">Leave Requests</h2>
      <p className="mt-1 text-sm text-gray-400">
        Review and action pending leave requests from your team.
      </p>

      {pendingRequests.length === 0 ? (
        <p className="mt-6 rounded-lg border border-dashed border-gray-700 py-8 text-center text-sm text-gray-500">
          No pending leave requests.
        </p>
      ) : (
        <div className="mt-5 overflow-x-auto">
          <div className="mb-2 grid min-w-[640px] grid-cols-6 gap-2 rounded-lg bg-emerald-900/30 px-4 py-3 text-sm font-semibold text-emerald-300">
            <span>Employee</span>
            <span>Start</span>
            <span>End</span>
            <span className="col-span-2">Reason</span>
            <span className="text-right">Actions</span>
          </div>
          <div className="space-y-2">
            {pendingRequests.map((request) => (
              <div
                key={`${request.employeeEmail}-${request.id}`}
                className="grid min-w-[640px] grid-cols-6 items-center gap-2 rounded-lg border border-gray-700 bg-black/30 px-4 py-3 text-sm"
              >
                <span className="font-medium">{request.employeeName}</span>
                <span className="text-gray-300">{request.startDate}</span>
                <span className="text-gray-300">{request.endDate}</span>
                <span className="col-span-2 text-gray-400">{request.reason}</span>
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateLeaveStatus(request.employeeEmail, request.id, 'Approved')
                    }
                    className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold transition hover:bg-emerald-500"
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateLeaveStatus(request.employeeEmail, request.id, 'Rejected')
                    }
                    className="rounded-full bg-red-600 px-3 py-1 text-xs font-semibold transition hover:bg-red-500"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default LeaveRequests
