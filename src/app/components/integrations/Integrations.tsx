import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { CheckCircle, AlertCircle, RefreshCw, ExternalLink, Mail, Server, Ticket, Shield } from 'lucide-react';

export const Integrations = () => {
    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">System Integrations</h1>
                    <p className="text-slate-500 text-sm">Manage connections with external government and enterprise services.</p>
                </div>
                <Button variant="outline" className="gap-2 bg-white hover:bg-slate-50 shadow-sm text-slate-700">
                    <RefreshCw className="h-4 w-4" /> Check Status
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-sm border-slate-200 h-full">
                    <CardHeader className="border-b border-slate-100 pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <Shield className="h-5 w-5 text-blue-600" />
                            Identity & Access Management
                        </CardTitle>
                        <CardDescription>Authentication providers and directory services.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 pt-6">
                         <div className="p-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50/50 transition-all shadow-sm group flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                 <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-700 text-lg border border-blue-200 group-hover:bg-blue-200 transition-colors">AD</div>
                                 <div>
                                     <h3 className="font-bold text-slate-900 text-sm">Active Directory (AD)</h3>
                                     <p className="text-xs text-slate-500 mt-0.5">SSO & RBAC Enforcement</p>
                                 </div>
                             </div>
                             <div className="text-right">
                                 <div className="flex items-center justify-end gap-1.5 text-green-600 text-xs font-bold mb-1">
                                     <CheckCircle className="h-3.5 w-3.5" /> Connected
                                 </div>
                                 <p className="text-[10px] text-slate-400 font-mono">Synced 2m ago</p>
                             </div>
                         </div>
                         <div className="p-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50/50 transition-all shadow-sm group flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                 <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center font-bold text-green-700 text-lg border border-green-100 group-hover:bg-green-100 transition-colors">UAE</div>
                                 <div>
                                     <h3 className="font-bold text-slate-900 text-sm">UAE PASS</h3>
                                     <p className="text-xs text-slate-500 mt-0.5">National Digital Identity</p>
                                 </div>
                             </div>
                             <div className="text-right">
                                 <div className="flex items-center justify-end gap-1.5 text-green-600 text-xs font-bold mb-1">
                                     <CheckCircle className="h-3.5 w-3.5" /> Connected
                                 </div>
                                 <p className="text-[10px] text-slate-400 font-mono">v3.1.0</p>
                             </div>
                         </div>
                    </CardContent>
                </Card>

                <Card className="shadow-sm border-slate-200 h-full">
                    <CardHeader className="border-b border-slate-100 pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <Server className="h-5 w-5 text-indigo-600" />
                            Enterprise Systems
                        </CardTitle>
                        <CardDescription>Core business application connectors.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 pt-6">
                         <div className="p-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50/50 transition-all shadow-sm group flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                 <div className="h-12 w-12 bg-red-50 rounded-lg flex items-center justify-center font-bold text-red-600 border border-red-100 group-hover:bg-red-100 transition-colors">ERP</div>
                                 <div>
                                     <h3 className="font-bold text-slate-900 text-sm">Oracle ERP / GRP</h3>
                                     <p className="text-xs text-slate-500 mt-0.5">Financial Data Sync</p>
                                 </div>
                             </div>
                             <div className="text-right">
                                 <div className="flex items-center justify-end gap-1.5 text-green-600 text-xs font-bold mb-1">
                                     <CheckCircle className="h-3.5 w-3.5" /> Operational
                                 </div>
                                 <p className="text-[10px] text-slate-400 font-mono">Last batch: 10:00 AM</p>
                             </div>
                         </div>

                         <div className="p-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50/50 transition-all shadow-sm group flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                 <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 border border-blue-100 group-hover:bg-blue-100 transition-colors">
                                     <Mail className="h-6 w-6" />
                                 </div>
                                 <div>
                                     <h3 className="font-bold text-slate-900 text-sm">Microsoft Exchange</h3>
                                     <p className="text-xs text-slate-500 mt-0.5">Email Archiving</p>
                                 </div>
                             </div>
                             <div className="text-right">
                                 <div className="flex items-center justify-end gap-1.5 text-green-600 text-xs font-bold mb-1">
                                     <CheckCircle className="h-3.5 w-3.5" /> Connected
                                 </div>
                                 <p className="text-[10px] text-slate-400 font-mono">SMTP Active</p>
                             </div>
                         </div>
                    </CardContent>
                </Card>

                <Card className="md:col-span-2 shadow-sm border-slate-200">
                    <CardHeader className="border-b border-slate-100 pb-4">
                        <CardTitle className="flex items-center gap-2">
                            <Ticket className="h-5 w-5 text-amber-600" />
                            Support & Operations
                        </CardTitle>
                        <CardDescription>Maintenance and support system connectors.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                        <div className="p-4 border border-slate-200 rounded-xl bg-white hover:bg-slate-50/50 transition-all shadow-sm group flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                 <div className="h-12 w-12 bg-purple-50 rounded-lg flex items-center justify-center font-bold text-purple-600 border border-purple-100 group-hover:bg-purple-100 transition-colors">OCR</div>
                                 <div>
                                     <h3 className="font-bold text-slate-900 text-sm">Tesseract OCR</h3>
                                     <p className="text-xs text-slate-500 mt-0.5">Text Extraction</p>
                                 </div>
                             </div>
                             <div className="text-right">
                                 <div className="flex items-center justify-end gap-1.5 text-green-600 text-xs font-bold mb-1">
                                     <CheckCircle className="h-3.5 w-3.5" /> Operational
                                 </div>
                                 <p className="text-[10px] text-slate-400 font-mono">Latency: 45ms</p>
                             </div>
                         </div>

                         <div className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 opacity-75 hover:opacity-100 transition-opacity flex items-center justify-between">
                             <div className="flex items-center gap-4">
                                 <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 border border-indigo-100">
                                     <Ticket className="h-6 w-6" />
                                 </div>
                                 <div>
                                     <h3 className="font-bold text-slate-900 text-sm">Helpdesk System</h3>
                                     <p className="text-xs text-slate-500 mt-0.5">Support Integration</p>
                                 </div>
                             </div>
                             <div className="text-right">
                                 <div className="flex items-center justify-end gap-1.5 text-amber-600 text-xs font-bold mb-1">
                                     <AlertCircle className="h-3.5 w-3.5" /> Maintenance
                                 </div>
                                 <p className="text-[10px] text-slate-400 font-mono">Until 12:00 PM</p>
                             </div>
                         </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
