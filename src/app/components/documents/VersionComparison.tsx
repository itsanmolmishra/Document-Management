import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { GitCompare, ChevronLeft, ChevronRight, Download, X } from 'lucide-react';
import { ScrollArea } from '../ui/scroll-area';

interface VersionComparisonProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    document: any;
}

export const VersionComparison: React.FC<VersionComparisonProps> = ({ 
    open, 
    onOpenChange, 
    document 
}) => {
    const [leftVersion, setLeftVersion] = useState('2.3');
    const [rightVersion, setRightVersion] = useState('2.4');

    // Mock version data
    const versions = [
        { version: '2.4', date: 'Jan 20, 2025', author: 'Ahmed R.', changes: 23 },
        { version: '2.3', date: 'Jan 18, 2025', author: 'Sarah M.', changes: 15 },
        { version: '2.2', date: 'Jan 15, 2025', author: 'Ahmed R.', changes: 8 },
        { version: '2.1', date: 'Jan 10, 2025', author: 'John D.', changes: 42 },
    ];

    // Mock diff data
    const diffSections = [
        {
            section: 'Executive Summary',
            left: 'The total budget for fiscal year 2025 is projected at AED 2.5 billion, representing a modest increase of 8% over 2024.',
            right: 'The total budget for fiscal year 2025 is projected at AED 2.8 billion, representing a significant increase of 12% over 2024.',
            changed: true
        },
        {
            section: 'Revenue Projections',
            left: 'Expected revenue from direct taxes: AED 1.2 billion\nExpected revenue from fees: AED 800 million',
            right: 'Expected revenue from direct taxes: AED 1.4 billion\nExpected revenue from fees: AED 950 million\nExpected revenue from investments: AED 450 million',
            changed: true
        },
        {
            section: 'Expenditure Breakdown',
            left: 'Personnel costs: AED 900 million\nOperational costs: AED 600 million\nCapital projects: AED 1.0 billion',
            right: 'Personnel costs: AED 900 million\nOperational costs: AED 600 million\nCapital projects: AED 1.0 billion',
            changed: false
        },
        {
            section: 'Risk Assessment',
            left: 'Medium risk level identified for Q2 operations.',
            right: 'Low risk level identified for Q2 operations following mitigation strategies.',
            changed: true
        }
    ];

    const highlightDiff = (left: string, right: string) => {
        const leftWords = left.split(' ');
        const rightWords = right.split(' ');
        
        return {
            left: left,
            right: right
        };
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[95vw] w-[1400px] h-[85vh] bg-white p-0 flex flex-col">
                <DialogHeader className="p-6 border-b border-slate-200">
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <GitCompare className="h-5 w-5 text-blue-600" />
                        Version Comparison
                    </DialogTitle>
                    <DialogDescription>
                        Compare changes between different versions of "{document?.name}"
                    </DialogDescription>
                </DialogHeader>

                {/* Version Selectors */}
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
                    <div className="flex items-center justify-center gap-6">
                        {/* Left Version */}
                        <div className="flex-1 max-w-md">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                                Older Version
                            </label>
                            <select 
                                className="flex h-10 w-full items-center justify-between rounded-[6px] border-2 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                value={leftVersion}
                                onChange={(e) => setLeftVersion(e.target.value)}
                            >
                                {versions.map(v => (
                                    <option key={v.version} value={v.version}>
                                        v{v.version} - {v.date} by {v.author}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Comparison Icon */}
                        <div className="mt-6">
                            <GitCompare className="h-6 w-6 text-slate-400" />
                        </div>

                        {/* Right Version */}
                        <div className="flex-1 max-w-md">
                            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">
                                Newer Version
                            </label>
                            <select 
                                className="flex h-10 w-full items-center justify-between rounded-[6px] border-2 border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all"
                                value={rightVersion}
                                onChange={(e) => setRightVersion(e.target.value)}
                            >
                                {versions.map(v => (
                                    <option key={v.version} value={v.version}>
                                        v{v.version} - {v.date} by {v.author}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-center gap-8 mt-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-green-500"></div>
                            <span className="text-slate-600">18 additions</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-red-500"></div>
                            <span className="text-slate-600">5 deletions</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-amber-500"></div>
                            <span className="text-slate-600">12 modifications</span>
                        </div>
                    </div>
                </div>

                {/* Side-by-Side Diff View */}
                <div className="flex-1 overflow-hidden">
                    <ScrollArea className="h-full">
                        <div className="grid grid-cols-2 divide-x divide-slate-200">
                            {/* Left Side - Older Version */}
                            <div className="bg-slate-50/30">
                                <div className="sticky top-0 bg-slate-100 border-b border-slate-200 px-4 py-3 z-10">
                                    <h3 className="font-bold text-sm text-slate-900">
                                        Version {leftVersion}
                                        <Badge variant="secondary" className="ml-2 text-xs">
                                            Old
                                        </Badge>
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Modified on Jan 18, 2025 by Sarah M.
                                    </p>
                                </div>
                                <div className="p-4 space-y-4">
                                    {diffSections.map((section, idx) => (
                                        <div key={idx} className={`p-4 rounded-lg border ${section.changed ? 'bg-red-50 border-red-200' : 'bg-white border-slate-200'}`}>
                                            <h4 className="font-bold text-sm text-slate-900 mb-3">{section.section}</h4>
                                            <div className="space-y-2">
                                                {section.left.split('\n').map((line, lineIdx) => (
                                                    <p key={lineIdx} className={`text-sm leading-relaxed ${section.changed ? 'text-red-900' : 'text-slate-700'}`}>
                                                        {section.changed && <span className="inline-block w-6 text-red-500 font-mono text-xs">-</span>}
                                                        {line}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Side - Newer Version */}
                            <div className="bg-white">
                                <div className="sticky top-0 bg-slate-100 border-b border-slate-200 px-4 py-3 z-10">
                                    <h3 className="font-bold text-sm text-slate-900">
                                        Version {rightVersion}
                                        <Badge variant="default" className="ml-2 text-xs bg-blue-600">
                                            Current
                                        </Badge>
                                    </h3>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Modified on Jan 20, 2025 by Ahmed R.
                                    </p>
                                </div>
                                <div className="p-4 space-y-4">
                                    {diffSections.map((section, idx) => (
                                        <div key={idx} className={`p-4 rounded-lg border ${section.changed ? 'bg-green-50 border-green-200' : 'bg-white border-slate-200'}`}>
                                            <h4 className="font-bold text-sm text-slate-900 mb-3">{section.section}</h4>
                                            <div className="space-y-2">
                                                {section.right.split('\n').map((line, lineIdx) => (
                                                    <p key={lineIdx} className={`text-sm leading-relaxed ${section.changed ? 'text-green-900' : 'text-slate-700'}`}>
                                                        {section.changed && <span className="inline-block w-6 text-green-500 font-mono text-xs">+</span>}
                                                        {line}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </div>

                {/* Footer Actions */}
                <div className="px-6 py-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            <Download className="h-4 w-4" />
                            Export Diff Report
                        </Button>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => onOpenChange(false)}>
                            Close
                        </Button>
                        <Button className="bg-blue-900 hover:bg-blue-800">
                            Restore Version {leftVersion}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
