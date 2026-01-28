import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { auditLogs } from '../../data/mockData';
import { Download, Search, Shield, Filter } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

export const AuditLogs = () => {
    const { t } = useApp();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredLogs = auditLogs.filter(log => 
        log.user.toLowerCase().includes(searchTerm.toLowerCase()) || 
        log.document.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.action.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('nav.compliance')} & Audit</h1>
                    <p className="text-slate-500 text-sm">Monitor system access, document activities, and security events.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="gap-2 bg-white hover:bg-slate-50 shadow-sm">
                        <Filter className="h-4 w-4" /> Filter
                    </Button>
                    <Button className="bg-blue-900 gap-2 hover:bg-blue-800 shadow-md text-white">
                        <Download className="h-4 w-4" /> Export Report
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="shadow-sm border-slate-200">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="h-12 w-12 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                            <Shield className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Security Score</p>
                            <p className="text-2xl font-bold text-slate-900">98/100</p>
                        </div>
                    </CardContent>
                </Card>
                {/* Add more stats if needed, or keep it minimal */}
            </div>

            <div className="flex gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                 <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Search logs by user, document, or action..." 
                        className="pl-9 bg-slate-50/50 border-slate-200"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50/50 hover:bg-slate-50/80 border-b border-slate-200">
                            <TableHead className="w-[200px] font-semibold text-slate-600">User</TableHead>
                            <TableHead className="font-semibold text-slate-600">Action</TableHead>
                            <TableHead className="font-semibold text-slate-600">Document Context</TableHead>
                            <TableHead className="font-semibold text-slate-600">Timestamp</TableHead>
                            <TableHead className="font-semibold text-slate-600 text-right">IP Address</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredLogs.map((log) => (
                            <TableRow key={log.id} className="hover:bg-slate-50/50 border-b border-slate-100 last:border-0">
                                <TableCell className="font-medium text-slate-900">
                                    <div className="flex items-center gap-2">
                                        <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500">
                                            {log.user.charAt(0)}
                                        </div>
                                        {log.user}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline" className="bg-slate-50 border-slate-200 font-normal">
                                        {log.action}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-slate-600">{log.document}</TableCell>
                                <TableCell className="text-slate-500 text-sm">{log.time}</TableCell>
                                <TableCell className="font-mono text-xs text-slate-400 text-right">{log.ip}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
