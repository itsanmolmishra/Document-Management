import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { StatusBadge } from '../ui/status-badge';
import { Search, Filter, Plus, FileText, Download, MoreHorizontal, Eye } from 'lucide-react';
import { documents } from '../../data/mockData';
import { UploadModal } from './UploadModal';
import { DocumentDetails } from './DocumentDetails';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export const DocumentRepo = () => {
    const { t } = useApp();
    const [searchTerm, setSearchTerm] = useState('');
    const [uploadOpen, setUploadOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState('all');
    const [selectedDoc, setSelectedDoc] = useState<any>(null);
    const [detailsOpen, setDetailsOpen] = useState(false);

    const filteredDocs = documents.filter(doc => 
        (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
         doc.owner.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (statusFilter === 'all' || doc.status.toLowerCase() === statusFilter)
    );

    const handleViewDetails = (doc: any) => {
        setSelectedDoc(doc);
        setDetailsOpen(true);
    };

    const getStatusColor = (status: string) => {
        switch(status.toLowerCase()) {
            case 'approved': return 'success';
            case 'active': return 'success';
            case 'under review': return 'warning';
            case 'archived': return 'secondary';
            case 'locked': return 'destructive';
            default: return 'default';
        }
    };

    return (
        <div className="space-y-6 h-full flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t('repo.title')}</h1>
                    <p className="text-slate-500 text-sm">Manage and organize secure government records.</p>
                </div>
                <div className="flex gap-2">
                     <Button variant="outline" className="gap-2">
                        <Download className="h-4 w-4" /> Export
                     </Button>
                     <Button className="bg-blue-900 gap-2" onClick={() => setUploadOpen(true)}>
                        <Plus className="h-4 w-4" /> {t('dash.upload')}
                     </Button>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 bg-white p-4 rounded-xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)]">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder={t('search.placeholder')} 
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="w-full sm:w-[200px]">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger>
                            <SelectValue placeholder="Filter by Status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="under review">Under Review</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Button variant="ghost" size="icon" className="text-slate-500 border border-slate-100 hover:bg-slate-50">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>

            <div className="bg-white rounded-xl border border-slate-100 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] flex-1 overflow-hidden flex flex-col">
                <div className="overflow-auto flex-1">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 hover:bg-slate-50/80">
                                <TableHead className="w-[400px]">{t('repo.col.name')}</TableHead>
                                <TableHead>{t('repo.col.type')}</TableHead>
                                <TableHead>{t('repo.col.class')}</TableHead>
                                <TableHead>{t('repo.col.owner')}</TableHead>
                                <TableHead>{t('repo.col.lastMod')}</TableHead>
                                <TableHead>{t('repo.col.status')}</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredDocs.length > 0 ? (
                                filteredDocs.map((doc) => (
                                    <TableRow 
                                        key={doc.id} 
                                        className="hover:bg-slate-50/50 cursor-pointer"
                                        onClick={() => handleViewDetails(doc)}
                                    >
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="h-8 w-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-500">
                                                    <FileText className="h-4 w-4" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span>{doc.name}</span>
                                                    <span className="text-[10px] text-slate-400 uppercase tracking-wider">REF-{1000 + doc.id}</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>{doc.type}</TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-normal">
                                                {doc.classification}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{doc.owner}</TableCell>
                                        <TableCell>{doc.date}</TableCell>
                                        <TableCell>
                                            <StatusBadge status={doc.status} />
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                                                    onClick={() => handleViewDetails(doc)}
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                        {t('repo.noDocs')}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
                    <span>Showing {filteredDocs.length} documents</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" disabled>Previous</Button>
                        <Button variant="outline" size="sm" disabled>Next</Button>
                    </div>
                </div>
            </div>

            <UploadModal open={uploadOpen} onOpenChange={setUploadOpen} />
            
            <DocumentDetails 
                document={selectedDoc} 
                open={detailsOpen} 
                onOpenChange={setDetailsOpen} 
            />
        </div>
    );
};