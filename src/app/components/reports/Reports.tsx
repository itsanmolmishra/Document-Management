import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Download, Calendar, Filter } from 'lucide-react';
import { 
    BarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer, 
    LineChart, 
    Line, 
    PieChart, 
    Pie, 
    Cell 
} from 'recharts';

const storageData = [
    { name: 'Finance', value: 400 },
    { name: 'HR', value: 300 },
    { name: 'Legal', value: 300 },
    { name: 'Engineering', value: 200 },
    { name: 'Admin', value: 100 },
];

const activityData = [
    { name: 'Mon', uploads: 40, approvals: 24, archives: 10 },
    { name: 'Tue', uploads: 30, approvals: 13, archives: 22 },
    { name: 'Wed', uploads: 20, approvals: 58, archives: 5 },
    { name: 'Thu', uploads: 27, approvals: 39, archives: 20 },
    { name: 'Fri', uploads: 18, approvals: 48, archives: 21 },
    { name: 'Sat', uploads: 5, approvals: 2, archives: 0 },
    { name: 'Sun', uploads: 2, approvals: 1, archives: 0 },
];

const complianceData = [
    { month: 'Jan', score: 98 },
    { month: 'Feb', score: 97 },
    { month: 'Mar', score: 99 },
    { month: 'Apr', score: 96 },
    { month: 'May', score: 98 },
    { month: 'Jun', score: 100 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const Reports = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">System Reports</h1>
                    <p className="text-slate-500 text-sm">Analytics and insights on system usage and compliance.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2">
                        <Calendar className="h-4 w-4" /> Last 30 Days
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" /> Filter
                    </Button>
                    <Button className="bg-blue-900 gap-2">
                        <Download className="h-4 w-4" /> Export PDF
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Weekly Activity</CardTitle>
                        <CardDescription>Document operations over the last 7 days</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={activityData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Legend />
                                <Bar dataKey="uploads" fill="#1e3a8a" radius={[4, 4, 0, 0]} name="Uploads" />
                                <Bar dataKey="approvals" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Approvals" />
                                <Bar dataKey="archives" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Archives" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Storage Distribution</CardTitle>
                        <CardDescription>Data usage by department (GB)</CardDescription>
                    </CardHeader>
                    <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={storageData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                >
                                    {storageData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-2">
                    <CardHeader>
                        <CardTitle>Compliance Score Trend</CardTitle>
                        <CardDescription>System-wide adherence to regulatory standards</CardDescription>
                    </CardHeader>
                    <CardContent className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={complianceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="month" />
                                <YAxis domain={[90, 100]} />
                                <Tooltip />
                                <Line type="monotone" dataKey="score" stroke="#16a34a" strokeWidth={3} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
