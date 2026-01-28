import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { 
    FileText, 
    Clock, 
    AlertTriangle, 
    CheckCircle, 
    Upload, 
    Search, 
    List, 
    Archive, 
    ShieldAlert, 
    Activity, 
    Users, 
    Server, 
    HardDrive,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    File
} from 'lucide-react';
import { Button } from '../ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { useDelayedLoader } from '@/app/hooks/useDelayedLoader';
import { CardSkeleton } from '@/app/components/ui/page-loader';

// Professional Stat Card with Trend
const StatCard = ({ title, value, icon: Icon, trend, trendLabel, type = "neutral" }: any) => {
    const isPositive = trend === 'up';
    const trendColor = isPositive ? "text-green-600" : (trend === 'down' ? "text-red-600" : "text-slate-500");
    const TrendIcon = isPositive ? ArrowUpRight : (trend === 'down' ? ArrowDownRight : Activity);

    return (
        <Card className="overflow-hidden relative shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-500 tracking-wide uppercase">{title}</p>
                        <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
                    </div>
                    <div className="p-2 bg-slate-50 rounded-lg border border-slate-100 text-slate-600">
                        <Icon className="h-5 w-5" />
                    </div>
                </div>
                {trendLabel && (
                     <div className="flex items-center gap-2 mt-4 text-xs font-medium">
                        <span className={`flex items-center gap-1 ${trendColor} bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded-full`}>
                            <TrendIcon className="h-3 w-3" />
                            {trend === 'up' ? '+' : ''}
                            {trend === 'down' ? '-' : ''}
                        </span>
                        <span className="text-slate-500">{trendLabel}</span>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export const Dashboard = ({ onViewChange }: { onViewChange: (view: string) => void }) => {
    const { t, user } = useApp();
    const isLoading = useDelayedLoader(true, 400, 700);
    
    // Show loading skeletons
    if (isLoading) {
        return (
            <div className="space-y-8 pb-10">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-2">
                        <div className="h-8 w-64 bg-slate-200 rounded animate-pulse"></div>
                        <div className="h-4 w-48 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                    <div className="flex gap-3">
                        <div className="h-10 w-32 bg-slate-200 rounded animate-pulse"></div>
                        <div className="h-10 w-32 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <CardSkeleton key={i} />
                    ))}
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2">
                        <CardSkeleton className="h-96" />
                    </div>
                    <div className="space-y-6">
                        <CardSkeleton />
                        <CardSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    const renderStaffDashboard = () => (
        <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard title={t('dash.myDocs')} value="128" icon={FileText} trend="up" trendLabel="12% from last month" />
                <StatCard title={t('dash.pending')} value="3" icon={Clock} trend="neutral" trendLabel="Awaiting action" />
                <StatCard title="Storage Used" value="1.2 GB" icon={HardDrive} trend="up" trendLabel="of 5 GB Quota" />
                <StatCard title="Compliance" value="98%" icon={CheckCircle} trend="up" trendLabel="Score" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 flex flex-col shadow-sm rounded-[6px]">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div>
                            <CardTitle>{t('dash.recent')}</CardTitle>
                            <CardDescription>Your recently accessed documents</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50" onClick={() => onViewChange('documents')}>
                            View All
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 p-6">
                        <div className="space-y-1">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center justify-between py-3 px-3 hover:bg-slate-50 rounded-[6px] transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 bg-white border border-slate-200 rounded-[6px] flex items-center justify-center text-blue-600 shadow-sm group-hover:border-blue-200 group-hover:shadow-md transition-all">
                                            <FileText className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm text-slate-900 group-hover:text-blue-700 transition-colors">Budget Proposal Q1 2025_v{i}.docx</p>
                                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                                <span>Edited 2h ago</span>
                                                <span>•</span>
                                                <span>1.4 MB</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 rounded-[6px]">Draft</Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="shadow-sm rounded-[6px]">
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3 p-6">
                            <Button className="w-full h-auto py-[8px] px-[16px] justify-start text-left font-medium bg-blue-900 hover:bg-blue-800 shadow-md shadow-blue-900/10 rounded-[6px]" onClick={() => onViewChange('documents')}>
                                <Upload className="h-4 w-4 mr-2" />
                                {t('dash.upload')}
                            </Button>
                            <Button variant="outline" className="w-full h-auto py-[8px] px-[16px] justify-start text-left font-medium text-slate-700 bg-white hover:bg-slate-50 rounded-[6px]" onClick={() => onViewChange('search')}>
                                <Search className="h-4 w-4 mr-2 text-slate-400" />
                                {t('dash.searchRec')}
                            </Button>
                            <Button variant="secondary" className="w-full h-auto py-[8px] px-[16px] justify-start text-left font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 rounded-[6px]" onClick={() => onViewChange('workflows')}>
                                <List className="h-4 w-4 mr-2 text-slate-400" />
                                {t('dash.viewSub')}
                            </Button>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-900 to-slate-900 text-white border-none shadow-xl relative overflow-hidden rounded-[6px]">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Server className="h-24 w-24" />
                        </div>
                        <CardContent className="p-6 relative z-10">
                            <div className="mb-4">
                                <h4 className="font-semibold text-lg flex items-center gap-2">
                                    <Activity className="h-5 w-5 text-blue-300" />
                                    System Notice
                                </h4>
                                <p className="text-blue-200 text-sm mt-2 leading-relaxed">Scheduled maintenance on Saturday, 10:00 PM - 11:00 PM. Access may be intermittent.</p>
                            </div>
                            <Button size="sm" className="bg-white/10 hover:bg-white/20 text-white border-0 w-full backdrop-blur-sm rounded-[6px] px-[16px] py-[8px]">Dismiss</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );

    const renderManagerDashboard = () => (
        <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <StatCard title="Team Workload" value="84%" icon={Activity} trend="up" trendLabel="Capacity utilized" />
                <StatCard title="Pending Review" value="7" icon={Clock} trend="neutral" trendLabel="Avg time: 1.2 days" />
                <StatCard title="Approvals Given" value="342" icon={CheckCircle} trend="up" trendLabel="This month" />
                <StatCard title="Policy Issues" value="0" icon={ShieldAlert} trend="neutral" trendLabel="All clear" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 shadow-sm rounded-[6px]">
                    <CardHeader>
                        <CardTitle>{t('dash.pendingApprovals')}</CardTitle>
                        <CardDescription>Documents requiring your attention</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                         <div className="overflow-hidden rounded-[6px]">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-slate-50 hover:bg-slate-50 border-b border-slate-100">
                                        <TableHead className="w-[300px]">Document Details</TableHead>
                                        <TableHead>Submitted By</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Action</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="group hover:bg-slate-50/50 transition-colors">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-[6px] bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-slate-900">Budget Q4 2024 Final</p>
                                                    <p className="text-xs text-slate-500">Finance Dept.</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-slate-100 text-slate-600 text-xs flex items-center justify-center font-bold border border-slate-200">AR</div>
                                                <span className="text-sm font-medium text-slate-700">Ahmed R.</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-normal rounded-[6px]">Awaiting Review</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" className="bg-blue-900 hover:bg-blue-800 text-white shadow-sm h-8 px-[16px] rounded-[6px]">Review</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="group hover:bg-slate-50/50 transition-colors">
                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-[6px] bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-sm text-slate-900">Vendor Contract - Etisalat</p>
                                                    <p className="text-xs text-slate-500">Procurement</p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="h-6 w-6 rounded-full bg-slate-100 text-slate-600 text-xs flex items-center justify-center font-bold border border-slate-200">SM</div>
                                                <span className="text-sm font-medium text-slate-700">Sarah M.</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 font-normal rounded-[6px]">Awaiting Review</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button size="sm" className="bg-blue-900 hover:bg-blue-800 text-white shadow-sm h-8 px-[16px] rounded-[6px]">Review</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                         </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card className="shadow-sm rounded-[6px]">
                        <CardHeader>
                            <CardTitle>Team Activity</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="space-y-6">
                                <div className="flex gap-4 items-start relative pb-6 border-l border-slate-100 pl-4 ml-2 last:pb-0 last:border-0">
                                    <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-blue-500 ring-4 ring-white" />
                                    <div>
                                        <p className="text-sm text-slate-700 leading-relaxed"><span className="font-semibold text-slate-900">Ahmed R.</span> uploaded 3 new finance reports for Q4 analysis.</p>
                                        <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> 10 mins ago
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start relative pb-6 border-l border-slate-100 pl-4 ml-2 last:pb-0 last:border-0">
                                    <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-green-500 ring-4 ring-white" />
                                    <div>
                                        <p className="text-sm text-slate-700 leading-relaxed"><span className="font-semibold text-slate-900">Sarah M.</span> approved the HR Policy Draft v2.1.</p>
                                        <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> 45 mins ago
                                        </p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start relative pl-4 ml-2 last:pb-0 last:border-0">
                                    <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-slate-300 ring-4 ring-white" />
                                    <div>
                                        <p className="text-sm text-slate-700 leading-relaxed"><span className="font-semibold text-slate-900">System</span> automatically archived 120 expired documents.</p>
                                        <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                                            <Clock className="h-3 w-3" /> 2 hours ago
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );

    const renderRecordsDashboard = () => (
        <div className="space-y-6">
             <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center gap-6 shadow-sm">
                <div className="p-4 bg-amber-100 rounded-xl text-amber-700 shadow-sm">
                    <AlertTriangle className="h-6 w-6" />
                </div>
                <div className="flex-1">
                    <h4 className="text-amber-900 font-bold text-lg">Retention Action Required</h4>
                    <p className="text-amber-800/80 text-sm mt-1 max-w-2xl leading-relaxed">There are 5 documents that have exceeded their retention period and require immediate archival or disposal approval to maintain compliance standards.</p>
                </div>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white border-0 shadow-md whitespace-nowrap px-6">View Documents</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Due for Archival" value="24" icon={Archive} trend="up" trendLabel="+5 this week" />
                <StatCard title="Retention Expiry" value="12" icon={Clock} trend="down" trendLabel="Improving" />
                <StatCard title="Archived Total" value="8,180" icon={Server} trend="up" trendLabel="Lifetime" />
            </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card className="shadow-sm">
                     <CardHeader>
                        <CardTitle>Archival Volume</CardTitle>
                        <CardDescription>Monthly document processing trends</CardDescription>
                     </CardHeader>
                     <CardContent className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={[
                                {name: 'Jan', docs: 120}, {name: 'Feb', docs: 150}, {name: 'Mar', docs: 180}, 
                                {name: 'Apr', docs: 200}, {name: 'May', docs: 140}, {name: 'Jun', docs: 160}
                            ]}>
                                <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke="#94a3b8" />
                                <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="#94a3b8" />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    cursor={{fill: '#f1f5f9'}}
                                />
                                <Bar dataKey="docs" fill="#1e3a8a" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                     </CardContent>
                 </Card>
                 <Card className="shadow-sm">
                     <CardHeader>
                        <CardTitle>Due for Disposal</CardTitle>
                        <CardDescription>Items pending secure destruction</CardDescription>
                     </CardHeader>
                     <CardContent>
                        <div className="space-y-3">
                             {[1, 2, 3].map((i) => (
                                <div key={i} className="flex justify-between items-center p-4 border border-slate-100 rounded-lg bg-white hover:bg-slate-50 transition-all shadow-sm group">
                                     <div className="flex items-center gap-4">
                                         <div className="h-10 w-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500 group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                                            <File className="h-5 w-5" />
                                         </div>
                                         <div>
                                            <p className="text-sm font-semibold text-slate-900 group-hover:text-red-700 transition-colors">Financial Records 201{8+i}</p>
                                            <p className="text-xs text-slate-500">Expired: Jan {10+i}, 2025</p>
                                         </div>
                                     </div>
                                     <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-50">Dispose</Button>
                                 </div>
                             ))}
                        </div>
                     </CardContent>
                 </Card>
             </div>
        </div>
    );

    const renderAdminDashboard = () => (
         <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <StatCard title="Active Users" value="1,248" icon={Users} trend="up" trendLabel="+12 new users" />
                <StatCard title="System Health" value="100%" icon={Activity} trend="neutral" trendLabel="All systems operational" />
                <StatCard title="Storage" value="62%" icon={HardDrive} trend="up" trendLabel="12TB / 20TB" />
                <StatCard title="Security Events" value="0" icon={ShieldAlert} trend="neutral" trendLabel="Last 24 hours" />
            </div>

            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle>System Load & Traffic</CardTitle>
                    <CardDescription>Real-time server performance monitoring</CardDescription>
                </CardHeader>
                <CardContent className="h-96">
                     <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                            {time: '08:00', load: 20}, {time: '09:00', load: 45}, {time: '10:00', load: 55}, {time: '11:00', load: 80},
                            {time: '12:00', load: 70}, {time: '13:00', load: 65}, {time: '14:00', load: 75}, {time: '15:00', load: 50}, {time: '16:00', load: 40}
                        ]}>
                             <defs>
                                <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#1e3a8a" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#1e3a8a" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                             <XAxis dataKey="time" fontSize={12} tickLine={false} axisLine={false} stroke="#94a3b8" dy={10} />
                             <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="#94a3b8" dx={-10} />
                             <Tooltip 
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                             />
                             <Area type="monotone" dataKey="load" stroke="#1e3a8a" strokeWidth={3} fillOpacity={1} fill="url(#colorLoad)" />
                        </AreaChart>
                     </ResponsiveContainer>
                </CardContent>
            </Card>
         </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="heading-h2">
                        {t('dash.welcome')}, {user?.name.split(' ')[0]}
                    </h1>
                    <p className="text-subtle mt-1 flex items-center gap-2">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-[6px] text-xs font-semibold uppercase tracking-wide border border-blue-100">
                            {user?.department}
                        </span>
                        <span>•</span>
                        <span>{t(`role.${user?.role}` as any)}</span>
                    </p>
                </div>
                <div className="flex gap-3">
                     <Button variant="outline" className="gap-2 h-10 px-4 bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm">
                        <Upload className="h-4 w-4" /> Quick Upload
                     </Button>
                     <Button className="gap-2 h-10 px-4 bg-blue-900 hover:bg-blue-800 text-white shadow-md shadow-blue-900/20">
                        <FileText className="h-4 w-4" /> New Report
                     </Button>
                </div>
            </div>

            {user?.role === 'staff' && renderStaffDashboard()}
            {user?.role === 'manager' && renderManagerDashboard()}
            {user?.role === 'records' && renderRecordsDashboard()}
            {(user?.role === 'admin' || user?.role === 'compliance') && renderAdminDashboard()}
        </div>
    );
};