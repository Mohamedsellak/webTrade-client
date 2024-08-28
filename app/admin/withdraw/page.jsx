import React from 'react';

const page = () => {
    // Sample deposit data for each status
    const pendingDeposits = [
        {
            username: 'Hans Burger',
            email: 'hans.burger@example.com',
            amount: '$ 500.00',
        },
        {
            username: 'Jolina Angelie',
            email: 'jolina.angelie@example.com',
            amount: '$ 200.00',
        },
        // Add more pending deposits as needed
    ];

    const approvedDeposits = [
        {
            username: 'Mark Smith',
            email: 'mark.smith@example.com',
            amount: '$ 1,000.00',
        },
        {
            username: 'Emily Johnson',
            email: 'emily.johnson@example.com',
            amount: '$ 750.00',
        },
        // Add more approved deposits as needed
    ];

    const rejectedDeposits = [
        {
            username: 'Alice Brown',
            email: 'alice.brown@example.com',
            amount: '$ 300.00',
        },
        {
            username: 'James Wilson',
            email: 'james.wilson@example.com',
            amount: '$ 150.00',
        },
        // Add more rejected deposits as needed
    ];

    const renderTable = (title, data) => (
        <div>
            <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
            <div className="w-full overflow-x-auto">
                <table className="w-full border border-zinc-700 text-center">
                    <thead>
                        <tr className="text-xs font-semibold tracking-wide uppercase text-white" style={{ backgroundColor: "#212325" }}>
                            <th className="px-4 py-3">Username</th>
                            <th className="px-4 py-3">Email</th>
                            <th className="px-4 py-3">Amount</th>
                            <th className="px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-transparent">
                        {data.map((deposit, index) => (
                            <tr key={index} className="text-gray-400">
                                <td className="px-4 py-3">{deposit.username}</td>
                                <td className="px-4 py-3">{deposit.email}</td>
                                <td className="px-4 py-3">{deposit.amount}</td>
                                <td className="px-4 py-3">
                                    <div className="flex items-center justify-center space-x-4">
                                        <button className="px-4 py-2 text-sm font-medium leading-5 bg-blue-700 text-blue-100 rounded-full hover:bg-blue-800 transition">
                                            open
                                        </button>
                                        <button className="px-4 py-2 text-sm font-medium leading-5 bg-red-700 text-red-100 rounded-full hover:bg-red-800 transition">
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    return (
        <div className="bg-background text-foreground p-6 rounded-lg shadow-lg lg:p-20">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-4xl font-bold mb-6 text-blue-500">Withdraw History</h2>
                <div>
                    <button className="text-base px-5 py-3 bg-transparent text-blue-500 border-2 border-blue-500 rounded-full hover:bg-blue-500 hover:text-black">
                        Refresh
                    </button>
                </div>
            </div>

            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-4 mb-4" style={{ backgroundColor: "#151617" }}>
                {/* Render the Pending Deposits Table */}
                {renderTable('Pending Deposits', pendingDeposits)}
            </div>

            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-4 mb-4" style={{ backgroundColor: "#151617" }}>
                {/* Render the Approved Deposits Table */}
                {renderTable('Approved Deposits', approvedDeposits)}
            </div>

            <div className="w-full overflow-hidden shadow-xs bg-card border rounded-2xl border-zinc-700 p-4 mb-4" style={{ backgroundColor: "#151617" }}>
                {/* Render the Rejected Deposits Table */}
                {renderTable('Rejected Deposits', rejectedDeposits)}
            </div>

        </div>
    );
};

export default page;
