import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { StatusPill } from '../ui/status-badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { CheckCircle, Clock, FileText, User, Calendar, Plus, Filter, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { 
    Dialog, 
    DialogContent, 
    DialogDescription, 
    DialogFooter, 
    DialogHeader, 
    DialogTitle, 
} from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';

const initialWorkflows = [
    { id: 1, title: 'Annual Budget Report Q4', type: 'Approval', requester: 'Ahmed R.', date: '2025-01-02', status: 'Pending', priority: 'High' },
    { id: 2, title: 'Vendor Contract - Etisalat', type: 'Signature', requester: 'Sarah M.', date: '2025-01-01', status: 'Pending', priority: 'Normal' },
    { id: 3, title: 'HR Policy Update v2.1', type: 'Review', requester: 'John D.', date: '2024-12-30', status: 'Approved', priority: 'Normal' },
    { id: 4, title: 'IT Security Audit Findings', type: 'Approval', requester: 'Fatima A.', date: '2024-12-28', status: 'Rejected', priority: 'High' },
];

export const Workflows = () => {
    const [workflows, setWorkflows] = useState(initialWorkflows);
    const [selectedWorkflow, setSelectedWorkflow] = useState<any>(null);
    const [comment, setComment] = useState('');
    const [actionDialogOpen, setActionDialogOpen] = useState(false);
    const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);

    const handleAction = (id: number, type: 'approve' | 'reject') => {
        setSelectedWorkflow(workflows.find(w => w.id === id));
        setActionType(type);
        setActionDialogOpen(true);
    };

    const confirmAction = () => {
        if (!selectedWorkflow || !actionType) return;

        const newStatus = actionType === 'approve' ? 'Approved' : 'Rejected';
        
        setWorkflows(prev => prev.map(w => 
            w.id === selectedWorkflow.id ? { ...w, status: newStatus } : w
        ));

        toast.success(`Request ${newStatus} successfully`, {
            description: `You have ${actionType}d the ${selectedWorkflow.title}`
        });

        setActionDialogOpen(false);
        setComment('');
        setSelectedWorkflow(null);
        setActionType(null);
    };

    const renderList = (filterStatus: string[]) => {
        const list = workflows.filter(w => filterStatus.includes(w.status));
        
        if (list.length === 0) {
            return (
                <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                    <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <CheckCircle className="h-8 w-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">No active tasks</h3>
                    <p className="max-w-sm mt-2 text-slate-500">You're all caught up! There are no pending requests in this view.</p>
                </div>
            );
        }

        return (
            <div className="space-y-4">
                {list.map((item) => (
                    <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-transparent hover:border-l-blue-600 group overflow-hidden">
                        <CardContent className="p-5">
                            <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                <div className="flex gap-4 w-full">
                                    <div className="h-12 w-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:bg-blue-100 transition-colors">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-slate-900 text-lg">{item.title}</h3>
                                            {item.priority === 'High' && (
                                                <Badge variant="destructive" className="h-5 text-[10px] px-1.5 bg-red-100 text-red-700 hover:bg-red-200 border-red-200 shadow-none">
                                                    High Priority
                                                </Badge>
                                            )}
                                        </div>
                                        <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
                                            <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                <User className="h-3 w-3" /> {item.requester}
                                            </span>
                                            <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                                                <Calendar className="h-3 w-3" /> {item.date}
                                            </span>
                                            <Badge variant="outline" className="text-slate-500 font-normal bg-slate-50 border-slate-200">{item.type}</Badge>
                                        </div>
                                    </div>
                                </div>
                                
                                {item.status === 'Pending' ? (
                                    <div className="flex gap-2 shrink-0 w-full sm:w-auto mt-4 sm:mt-0">
                                        <Button size="sm" variant="outline" className="flex-1 sm:flex-none text-red-600 hover:bg-red-50 hover:text-red-700 border-red-100" onClick={() => handleAction(item.id, 'reject')}>
                                            Reject
                                        </Button>
                                        <Button size="sm" className="flex-1 sm:flex-none bg-blue-900 hover:bg-blue-800 shadow-sm text-white" onClick={() => handleAction(item.id, 'approve')}>
                                            Approve
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="shrink-0 mt-2 sm:mt-0">
                                        <StatusPill status={item.status} />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    };

    return (
        <div className="space-y-6 max-w-5xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Workflows & Approvals</h1>
                    <p className="text-slate-500 text-sm">Manage document review cycles and sign-offs.</p>
                </div>
                <Button className="bg-blue-900 shadow-md hover:bg-blue-800 text-white">
                    <Plus className="h-4 w-4 mr-2" /> New Request
                </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Search requests..." 
                        className="pl-9 bg-slate-50/50 border-slate-200"
                    />
                </div>
                <Button variant="outline" className="gap-2 bg-white hover:bg-slate-50 border-slate-200 text-slate-700">
                    <Filter className="h-4 w-4" /> Filter
                </Button>
            </div>

            <Tabs defaultValue="inbox" className="w-full">
                <TabsList className="bg-white border border-slate-200 p-1 w-full sm:w-auto grid grid-cols-3 sm:flex mb-6 rounded-lg h-auto shadow-sm">
                    <TabsTrigger value="inbox" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm px-4 py-2">Inbox (2)</TabsTrigger>
                    <TabsTrigger value="sent" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm px-4 py-2">Sent</TabsTrigger>
                    <TabsTrigger value="history" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 data-[state=active]:shadow-sm px-4 py-2">History</TabsTrigger>
                </TabsList>
                
                <TabsContent value="inbox">
                    {renderList(['Pending'])}
                </TabsContent>
                <TabsContent value="sent">
                    <div className="flex flex-col items-center justify-center py-16 text-center text-slate-500 bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                        <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                            <Clock className="h-8 w-8 text-slate-300" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No active outgoing requests</h3>
                        <p className="max-w-sm mt-2 text-slate-500">You haven't sent any documents for approval recently.</p>
                    </div>
                </TabsContent>
                <TabsContent value="history">
                    {renderList(['Approved', 'Rejected'])}
                </TabsContent>
            </Tabs>

            <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm {actionType === 'approve' ? 'Approval' : 'Rejection'}</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to {actionType} <strong>{selectedWorkflow?.title}</strong>? This action will be logged.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <label className="text-sm font-medium mb-2 block">Comments (Optional)</label>
                        <Textarea 
                            placeholder="Add a note..." 
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="bg-slate-50 border-slate-200 focus:border-blue-500"
                        />
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setActionDialogOpen(false)}>Cancel</Button>
                        <Button 
                            className={actionType === 'approve' ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-red-600 hover:bg-red-700 text-white'}
                            onClick={confirmAction}
                        >
                            Confirm {actionType === 'approve' ? 'Approve' : 'Reject'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};