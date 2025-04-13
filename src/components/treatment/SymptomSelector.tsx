
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Thermometer, Plus, X, Search } from 'lucide-react';
import { CurrentSymptom, symptomSuggestions } from '@/data/mockData';

interface SymptomSelectorProps {
  selectedSymptoms: CurrentSymptom[];
  setSelectedSymptoms: React.Dispatch<React.SetStateAction<CurrentSymptom[]>>;
}

const SymptomSelector: React.FC<SymptomSelectorProps> = ({ 
  selectedSymptoms, 
  setSelectedSymptoms 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newSymptom, setNewSymptom] = useState('');
  const [severity, setSeverity] = useState<number>(5);
  const [duration, setDuration] = useState('');
  const [frequency, setFrequency] = useState<CurrentSymptom['frequency']>('occasional');
  
  const filteredSuggestions = symptomSuggestions
    .filter(symptom => 
      symptom.toLowerCase().includes(searchTerm.toLowerCase()) && 
      !selectedSymptoms.some(s => s.name.toLowerCase() === symptom.toLowerCase())
    )
    .slice(0, 5);
  
  const handleAddSymptom = () => {
    if (!newSymptom) return;
    
    const symptomToAdd: CurrentSymptom = {
      id: `S${Date.now()}`,
      name: newSymptom,
      severity: severity,
      duration: duration || "Not specified",
      frequency: frequency,
      aggravatingFactors: [],
      relievingFactors: []
    };
    
    setSelectedSymptoms(prev => [...prev, symptomToAdd]);
    setNewSymptom('');
    setSeverity(5);
    setDuration('');
    setFrequency('occasional');
  };
  
  const handleRemoveSymptom = (id: string) => {
    setSelectedSymptoms(prev => prev.filter(s => s.id !== id));
  };

  const handleSymptomSelection = (symptom: string) => {
    setNewSymptom(symptom);
    setSearchTerm('');
  };
  
  return (
    <Card className="health-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-medium flex items-center gap-2">
          <Thermometer className="h-5 w-5 text-medical-primary" />
          Current Symptoms
        </CardTitle>
        <CardDescription>Add symptoms you're currently experiencing</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="symptom-search" className="text-sm font-medium">
              Search or enter symptom
            </label>
            <div className="flex gap-2">
              <div className="relative flex-grow">
                <Input
                  id="symptom-search"
                  value={newSymptom || searchTerm}
                  onChange={(e) => {
                    if (!newSymptom) {
                      setSearchTerm(e.target.value);
                    }
                    setNewSymptom(e.target.value);
                  }}
                  placeholder="Enter a symptom..."
                  className="w-full"
                />
                {searchTerm && filteredSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredSuggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 cursor-pointer hover:bg-medical-light/20 flex items-center"
                        onClick={() => handleSymptomSelection(suggestion)}
                      >
                        <Search className="h-4 w-4 mr-2 text-gray-500" />
                        {suggestion}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <Button onClick={handleAddSymptom} disabled={!newSymptom}>
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
          
          {newSymptom && (
            <div className="space-y-4 border-t border-gray-100 pt-4">
              <div>
                <label className="text-sm font-medium">Severity (1-10)</label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[severity]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(value) => setSeverity(value[0])}
                    className="flex-grow"
                  />
                  <span className="w-8 text-center font-medium">{severity}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Duration</label>
                  <Input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 3 days, 2 weeks"
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">Frequency</label>
                  <Select 
                    value={frequency} 
                    onValueChange={(value) => setFrequency(value as CurrentSymptom['frequency'])}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="constant">Constant</SelectItem>
                      <SelectItem value="intermittent">Intermittent</SelectItem>
                      <SelectItem value="occasional">Occasional</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}
          
          <div className="border-t border-gray-100 pt-4">
            <h4 className="text-sm font-medium mb-2">Selected Symptoms</h4>
            {selectedSymptoms.length === 0 ? (
              <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-md">
                No symptoms selected
              </div>
            ) : (
              <div className="space-y-2">
                {selectedSymptoms.map((symptom) => (
                  <div 
                    key={symptom.id}
                    className="flex items-center justify-between bg-medical-light/10 p-2 rounded-md"
                  >
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-medical-light/30">
                        {symptom.severity}/10
                      </Badge>
                      <span className="font-medium">{symptom.name}</span>
                      {symptom.duration && (
                        <span className="text-xs text-gray-500">
                          {symptom.duration} • {symptom.frequency}
                        </span>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveSymptom(symptom.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SymptomSelector;
