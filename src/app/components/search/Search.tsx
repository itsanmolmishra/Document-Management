import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Search as SearchIcon, Filter, Calendar, FileText, Tag, User } from 'lucide-react';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Checkbox } from '../ui/checkbox';
import { documents } from '../../data/mockData';

export const Search = () => {
    const [results, setResults] = useState(documents);
    const [isAdvancedOpen, setIsAdvancedOpen] = useState(true);

    return (
        <div className="space-y-6">
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="text-center space-y-2 mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Advanced Document Search</h1>
                    <p className="text-slate-500">Find records across the entire archival system using metadata and content.</p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100">
                    <div className="relative">
                        <SearchIcon className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                        <Input 
                            className="pl-12 h-12 text-lg" 
                            placeholder="Search by keywords, reference ID, or content..." 
                        />
                        <Button className="absolute right-1.5 top-1.5 h-9 bg-blue-900 hover:bg-blue-800">
                            Search
                        </Button>
                    </div>

                    {isAdvancedOpen && (
                        <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2">
                            <div className="space-y-2">
                                <Label>Date Range</Label>
                                <div className="flex gap-2">
                                    <Button variant="outline" className="w-full text-slate-500 font-normal justify-start">
                                        <Calendar className="mr-2 h-4 w-4" /> Start Date
                                    </Button>
                                    <Button variant="outline" className="w-full text-slate-500 font-normal justify-start">
                                        <Calendar className="mr-2 h-4 w-4" /> End Date
                                    </Button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Document Type</Label>
                                <div className="flex flex-wrap gap-2">
                                    {['PDF', 'Word', 'Excel', 'Image'].map(type => (
                                        <div key={type} className="flex items-center space-x-2 border rounded-md px-3 py-2 cursor-pointer hover:bg-slate-50">
                                            <Checkbox id={type} />
                                            <label htmlFor={type} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                                                {type}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Department</Label>
                                <select className="flex h-10 w-full items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                    <option>All Departments</option>
                                    <option>Finance</option>
                                    <option>HR</option>
                                    <option>Legal</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <Label>Classification Level</Label>
                                <div className="space-y-3 pt-2">
                                    <div className="flex justify-between text-xs text-slate-500">
                                        <span>Public</span>
                                        <span>Confidential</span>
                                        <span>Top Secret</span>
                                    </div>
                                    <Slider defaultValue={[50]} max={100} step={1} />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div className="mt-4 flex justify-center">
                         <Button variant="ghost" size="sm" onClick={() => setIsAdvancedOpen(!isAdvancedOpen)} className="text-slate-500">
                             {isAdvancedOpen ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
                         </Button>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="font-semibold text-lg text-slate-900">Recent Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.slice(0, 3).map((doc) => (
                        <Card key={doc.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between mb-3">
                                    <div className="h-10 w-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                        <FileText className="h-5 w-5" />
                                    </div>
                                    <Badge variant="outline">{doc.classification}</Badge>
                                </div>
                                <h4 className="font-bold text-slate-900 mb-1">{doc.name}</h4>
                                <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                                    Financial report containing Q4 analysis and budget projections for the upcoming fiscal year...
                                </p>
                                <div className="flex items-center gap-3 text-xs text-slate-400 border-t pt-3">
                                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {doc.owner}</span>
                                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {doc.date}</span>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};
