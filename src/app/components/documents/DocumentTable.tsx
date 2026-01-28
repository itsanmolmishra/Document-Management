import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { FileText, Eye, MoreHorizontal } from 'lucide-react';
import { cn } from '@/app/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

interface Document {
  id: string;
  name: string;
  refNumber: string;
  type: string;
  classification: string;
  owner: string;
  lastModified: string;
  status: 'Under Review' | 'Approved' | 'Active' | 'Archived' | 'Locked';
}

interface DocumentTableProps {
  documents: Document[];
  onView?: (doc: Document) => void;
  onEdit?: (doc: Document) => void;
  onDownload?: (doc: Document) => void;
  onDelete?: (doc: Document) => void;
}

const statusConfig = {
  'Under Review': {
    bg: 'bg-amber-100',
    text: 'text-amber-700',
    border: 'border-amber-200',
  },
  'Approved': {
    bg: 'bg-green-100',
    text: 'text-green-700',
    border: 'border-green-200',
  },
  'Active': {
    bg: 'bg-emerald-100',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  'Archived': {
    bg: 'bg-slate-100',
    text: 'text-slate-700',
    border: 'border-slate-200',
  },
  'Locked': {
    bg: 'bg-red-100',
    text: 'text-red-700',
    border: 'border-red-200',
  },
};

export const DocumentTable = ({ documents, onView, onEdit, onDownload, onDelete }: DocumentTableProps) => {
  return (
    <div className="border border-slate-200 rounded-[6px] overflow-hidden bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-slate-50/80 border-b border-slate-200">
            <TableHead className="w-[380px]">Name</TableHead>
            <TableHead className="w-[180px]">Type</TableHead>
            <TableHead className="w-[140px]">Classification</TableHead>
            <TableHead className="w-[180px]">Owner</TableHead>
            <TableHead className="w-[140px]">Last Modified</TableHead>
            <TableHead className="w-[140px]">Status</TableHead>
            <TableHead className="w-[100px] text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id} className="hover:bg-slate-50/60 border-b border-slate-100 last:border-0">
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-[6px] bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0 group-hover:border-blue-200 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-[14px] text-slate-900 leading-tight truncate group-hover:text-blue-700 transition-colors">
                      {doc.name}
                    </p>
                    <p className="text-[12px] text-slate-400 mt-0.5 font-mono tracking-tight">
                      {doc.refNumber}
                    </p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-[14px] text-slate-700 font-medium">
                  {doc.type}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-[14px] text-slate-600">
                  {doc.classification}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-[14px] text-slate-700 font-medium">
                  {doc.owner}
                </span>
              </TableCell>
              <TableCell>
                <span className="text-[14px] text-slate-600">
                  {doc.lastModified}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={cn(
                    'rounded-full px-3 py-1 text-[12px] font-semibold border',
                    statusConfig[doc.status].bg,
                    statusConfig[doc.status].text,
                    statusConfig[doc.status].border
                  )}
                >
                  {doc.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-[6px]"
                    onClick={() => onView?.(doc)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-[6px]"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem onClick={() => onView?.(doc)}>
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEdit?.(doc)}>
                        Edit Document
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDownload?.(doc)}>
                        Download
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDelete?.(doc)}
                        className="text-red-600 focus:text-red-700 focus:bg-red-50"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {/* Footer with pagination */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-white">
        <p className="text-[13px] text-slate-500">
          Showing {documents.length} document{documents.length !== 1 ? 's' : ''}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-[13px] text-slate-600 border-slate-200 hover:bg-slate-50 rounded-[6px]"
            disabled
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="h-8 px-3 text-[13px] text-slate-600 border-slate-200 hover:bg-slate-50 rounded-[6px]"
            disabled
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
