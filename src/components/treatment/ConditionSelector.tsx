
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Clipboard, Search } from 'lucide-react';
import { medicalConditions } from '@/data/mockData';

interface ConditionSelectorProps {
  selectedCondition: string;
  setSelectedCondition: React.Dispatch<React.SetStateAction<string>>;
}

const ConditionSelector: React.FC<ConditionSelectorProps> = ({ 
  selectedCondition, 
  setSelectedCondition 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredConditions = searchTerm.length > 0
    ? medicalConditions.filter(condition => 
        condition.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 6)
    : [];
  
  return (
    <Card className="health-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium flex items-center gap-2">
          <Clipboard className="h-5 w-5 text-medical-primary" />
          Primary Condition
        </CardTitle>
        <CardDescription>Select the primary condition for treatment</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for a condition..."
              className="w-full"
            />
            {searchTerm && filteredConditions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                {filteredConditions.map((condition, index) => (
                  <div
                    key={index}
                    className="px-3 py-2 cursor-pointer hover:bg-medical-light/20 flex items-center"
                    onClick={() => {
                      setSelectedCondition(condition);
                      setSearchTerm('');
                    }}
                  >
                    <Search className="h-4 w-4 mr-2 text-gray-500" />
                    {condition}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-4 bg-medical-light/10 rounded-lg">
            <h4 className="font-medium mb-1">Selected Condition</h4>
            {selectedCondition ? (
              <div className="flex items-center justify-between">
                <span>{selectedCondition}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedCondition('')}
                >
                  Change
                </Button>
              </div>
            ) : (
              <div className="text-gray-500">No condition selected</div>
            )}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
            {medicalConditions.slice(0, 6).map((condition, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto py-2 px-3 justify-start"
                onClick={() => setSelectedCondition(condition)}
              >
                {condition}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConditionSelector;
