import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
    Archive as ArchiveIcon, 
    Search, 
    Filter, 
    Calendar, 
    FileText, 
    Trash2, 
    History,
    Download,
    RefreshCw,
    Plus,
    Settings,
    Shield,
    CheckCircle,
    AlertTriangle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const mockArchive = [
    { id: 101, title: 'Financial Statements 2018', ref: 'FIN-2018-004', dept: 'Finance', archivedDate: '2023-01-15', retention: '10 Years', status: 'Archived', expiry: '2028-12-31' },
    { id: 102, title: 'Project Alpha Blueprint', ref: 'ENG-2019-112', dept: 'Engineering', archivedDate: '2022-06-20', retention: '15 Years', status: 'Archived', expiry: '2034-06-20' },
    { id: 103, title: 'Employee Records - Batch A', ref: 'HR-2010-001', dept: 'HR', archivedDate: '2020-01-01', retention: '25 Years', status: 'Deep Storage', expiry: '2045-01-01' },
    { id: 104, title: 'Vendor Contracts 2015', ref: 'LGL-2015-089', dept: 'Legal', archivedDate: '2021-03-10', retention: '7 Years', status: 'Expired', expiry: '2022-03-10' },
    { id: 105, title: 'Meeting Minutes 2020', ref: 'ADM-2020-055', dept: 'Admin', archivedDate: '2021-01-05', retention: '5 Years', status: 'Pending Disposal', expiry: '2026-01-05' },
];

export const Archive = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterDept, setFilterDept] = useState('all');

    const filteredDocs = mockArchive.filter(doc => 
        (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.ref.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterDept === 'all' || doc.dept === filterDept)
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Archival Management</h1>
                    <p className="text-slate-500 text-sm">Long-term storage, retention policies, and disposal governance.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 bg-white hover:bg-slate-50 shadow-sm">
                        <History className="h-4 w-4" /> Audit Log
                    </Button>
                    <Button className="bg-slate-800 hover:bg-slate-700 text-white gap-2 shadow-md">
                        <RefreshCw className="h-4 w-4" /> Sync Policies
                    </Button>
                </div>
            </div>

            <Tabs defaultValue="repository" className="space-y-6">
                <TabsList className="bg-white border border-slate-200 p-1 rounded-lg h-auto shadow-sm">
                    <TabsTrigger value="repository" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm px-4 py-2">Repository View</TabsTrigger>
                    <TabsTrigger value="policies" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm px-4 py-2">Retention Policies</TabsTrigger>
                    <TabsTrigger value="disposal" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm px-4 py-2">Disposal Queue</TabsTrigger>
                </TabsList>

                <TabsContent value="repository" className="space-y-6">
                    {/* Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="h-12 w-12 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-600 shadow-sm">
                                    <ArchiveIcon className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Total Archived</p>
                                    <p className="text-2xl font-bold text-slate-900">8,180</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="h-12 w-12 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                                    <FileText className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">This Year</p>
                                    <p className="text-2xl font-bold text-slate-900">432</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="h-12 w-12 bg-amber-50 rounded-xl border border-amber-100 flex items-center justify-center text-amber-600 shadow-sm">
                                    <Calendar className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Expired</p>
                                    <p className="text-2xl font-bold text-slate-900">12</p>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-white border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="h-12 w-12 bg-red-50 rounded-xl border border-red-100 flex items-center justify-center text-red-600 shadow-sm">
                                    <Trash2 className="h-6 w-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Disposal Due</p>
                                    <p className="text-2xl font-bold text-slate-900">5</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                            <Input 
                                placeholder="Search archives by name or reference..." 
                                className="pl-9 bg-slate-50/50 border-slate-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <div className="w-full sm:w-[200px]">
                            <Select value={filterDept} onValueChange={setFilterDept}>
                                <SelectTrigger className="bg-slate-50/50 border-slate-200">
                                    <SelectValue placeholder="Department" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Departments</SelectItem>
                                    <SelectItem value="Finance">Finance</SelectItem>
                                    <SelectItem value="HR">HR</SelectItem>
                                    <SelectItem value="Legal">Legal</SelectItem>
                                    <SelectItem value="Engineering">Engineering</SelectItem>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-slate-50/50 hover:bg-slate-50/80 border-b border-slate-200">
                                    <TableHead className="font-semibold text-slate-600">Reference</TableHead>
                                    <TableHead className="font-semibold text-slate-600">Document Title</TableHead>
                                    <TableHead className="font-semibold text-slate-600">Department</TableHead>
                                    <TableHead className="font-semibold text-slate-600">Archived Date</TableHead>
                                    <TableHead className="font-semibold text-slate-600">Retention</TableHead>
                                    <TableHead className="font-semibold text-slate-600">Expiry</TableHead>
                                    <TableHead className="font-semibold text-slate-600">Status</TableHead>
                                    <TableHead className="text-right font-semibold text-slate-600">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredDocs.map((doc) => (
                                    <TableRow key={doc.id} className="hover:bg-slate-50/50 border-b border-slate-100 last:border-0">
                                        <TableCell className="font-mono text-xs text-slate-500 bg-slate-50/30">{doc.ref}</TableCell>
                                        <TableCell className="font-medium text-slate-900">{doc.title}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-normal border border-slate-200">
                                                {doc.dept}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-slate-500 text-sm">{doc.archivedDate}</TableCell>
                                        <TableCell className="text-sm font-medium">{doc.retention}</TableCell>
                                        <TableCell className="text-slate-500 text-sm">{doc.expiry}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className={
                                                doc.status === 'Archived' ? 'bg-slate-50 text-slate-600 border-slate-200' : 
                                                doc.status === 'Expired' ? 'bg-red-50 text-red-700 border-red-200' :
                                                doc.status === 'Deep Storage' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                                                'bg-amber-50 text-amber-700 border-amber-200'
                                            }>
                                                {doc.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-700 hover:bg-slate-100">
                                                <Download className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TabsContent>

                <TabsContent value="policies">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card className="md:col-span-2 shadow-sm border-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between pb-6 border-b border-slate-100">
                                <div>
                                    <CardTitle>Active Retention Policies</CardTitle>
                                    <CardDescription>Rules governing document lifecycle and automated disposal.</CardDescription>
                                </div>
                                <Button size="sm" className="bg-blue-900 gap-2 shadow-md hover:bg-blue-800">
                                    <Plus className="h-4 w-4" /> Create Policy
                                </Button>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    {[
                                        { name: 'Financial Records - Standard', duration: '10 Years', action: 'Secure Destruction', dept: 'Finance, Procurement' },
                                        { name: 'Employee Personnel Files', duration: '25 Years', action: 'Deep Storage', dept: 'HR' },
                                        { name: 'Legal Contracts', duration: '7 Years', action: 'Review Required', dept: 'Legal' },
                                        { name: 'Meeting Minutes', duration: '5 Years', action: 'Archival', dept: 'All' }
                                    ].map((policy, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50/80 transition-all shadow-sm group">
                                            <div className="flex items-start gap-4">
                                                <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0 border border-blue-100 group-hover:bg-blue-100 transition-colors">
                                                    <Shield className="h-5 w-5" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-slate-900 text-sm">{policy.name}</h4>
                                                    <p className="text-xs text-slate-500 mt-1">Applied to: {policy.dept}</p>
                                                </div>
                                            </div>
                                            <div className="text-right space-y-1.5">
                                                <Badge className="bg-slate-900 text-white hover:bg-slate-800">
                                                    {policy.duration}
                                                </Badge>
                                                <p className="text-xs text-slate-500 font-medium">{policy.action}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="shadow-sm border-slate-200">
                             <CardHeader className="border-b border-slate-100 pb-4">
                                <CardTitle>Compliance Status</CardTitle>
                             </CardHeader>
                             <CardContent className="space-y-8 pt-6">
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm items-center">
                                        <span className="text-slate-600 font-medium">Policy Coverage</span>
                                        <Badge variant="outline" className="text-green-600 bg-green-50 border-green-200">98%</Badge>
                                    </div>
                                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full w-[98%] bg-green-500 rounded-full" />
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between text-sm items-center">
                                        <span className="text-slate-600 font-medium">Disposal Audit</span>
                                        <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200">100%</Badge>
                                    </div>
                                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full w-full bg-blue-500 rounded-full" />
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-500 leading-relaxed flex gap-3">
                                    <CheckCircle className="h-5 w-5 text-slate-400 shrink-0" />
                                    System automatically enforces retention rules based on Dubai ISR standards. Audit logs are generated for every disposal action.
                                </div>
                             </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="disposal">
                    <Card className="shadow-sm border-slate-200">
                        <CardHeader>
                            <CardTitle>Disposal Queue</CardTitle>
                            <CardDescription>Documents pending approval for destruction or permanent archival.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500 bg-slate-50/50 rounded-xl border border-dashed border-slate-200 m-2">
                                <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <Trash2 className="h-8 w-8 text-slate-300" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900">No Pending Disposals</h3>
                                <p className="max-w-sm mt-2 text-slate-500">There are currently no documents in the queue requiring manual disposal approval.</p>
                                <Button variant="outline" className="mt-6">Refresh Queue</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
