
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Health facts data
const healthFacts = [
  {
    id: 1,
    title: "Our Heart Beats 100,000 Times Daily",
    content: "Your heart beats about 100,000 times every day, pumping approximately 2,000 gallons of blood through your body. That's enough to fill a small swimming pool over a lifetime!",
  },
  {
    id: 2,
    title: "Your Body Has Trillions of Bacteria",
    content: "The human body contains trillions of bacteria, outnumbering human cells by about 10 to 1. Most of these bacteria are beneficial and essential for maintaining health.",
  },
  {
    id: 3,
    title: "Your Brain Uses 20% of Your Oxygen",
    content: "Despite making up only about 2% of your body weight, your brain consumes approximately 20% of your body's oxygen and calories.",
  },
  {
    id: 4,
    title: "Fingernails Grow Four Times Faster Than Toenails",
    content: "Your fingernails grow at an average rate of 3.5 millimeters per month, which is about four times faster than your toenails. Fingernails on your dominant hand even grow slightly faster!",
  },
  {
    id: 5,
    title: "Humans Are Bioluminescent",
    content: "Human bodies actually emit visible light, but it's about 1,000 times less intense than what our eyes can detect. This bioluminescence follows our circadian rhythm and is strongest in the late afternoon.",
  }
];

// Prevention tips
const preventionTips = [
  {
    id: 1,
    title: "Stay Physically Active",
    content: "Regular physical activity can help prevent heart disease, stroke, diabetes, and various cancers. Aim for at least 150 minutes of moderate exercise per week.",
  },
  {
    id: 2,
    title: "Maintain a Healthy Diet",
    content: "Eat a balanced diet rich in fruits, vegetables, whole grains, lean proteins, and healthy fats. Limit processed foods, sugary drinks, and excessive salt intake.",
  },
  {
    id: 3,
    title: "Get Enough Sleep",
    content: "Adults should aim for 7-9 hours of quality sleep per night. Poor sleep is linked to increased risk of heart disease, diabetes, obesity, and mental health issues.",
  },
  {
    id: 4,
    title: "Manage Stress",
    content: "Chronic stress can contribute to health problems like high blood pressure, heart disease, and weakened immunity. Practice stress-reducing techniques like meditation or deep breathing.",
  },
  {
    id: 5,
    title: "Stay Hydrated",
    content: "Proper hydration supports bodily functions including digestion, circulation, and temperature regulation. Most adults should aim to drink about 8 cups (64 ounces) of water daily.",
  }
];

const HealthFacts: React.FC = () => {
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const handleNextFact = () => {
    setCurrentFactIndex((prevIndex) => (prevIndex + 1) % healthFacts.length);
  };

  const handlePrevFact = () => {
    setCurrentFactIndex((prevIndex) => (prevIndex - 1 + healthFacts.length) % healthFacts.length);
  };

  const handleNextTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % preventionTips.length);
  };

  const handlePrevTip = () => {
    setCurrentTipIndex((prevIndex) => (prevIndex - 1 + preventionTips.length) % preventionTips.length);
  };

  const currentFact = healthFacts[currentFactIndex];
  const currentTip = preventionTips[currentTipIndex];

  return (
    <MainLayout requireAuth={false}>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">Health Facts & Prevention Tips</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-blue-500 mx-auto mb-8"></div>
        
        <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Discover interesting facts about the human body and useful tips to maintain good health and prevent common illnesses.
        </p>

        <Tabs defaultValue="facts" className="w-full">
          <TabsList className="grid grid-cols-2 mb-8">
            <TabsTrigger value="facts" className="text-lg py-3">Interesting Facts</TabsTrigger>
            <TabsTrigger value="prevention" className="text-lg py-3">Prevention Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="facts">
            <Card className="glass-panel border-t-4 border-blue-500">
              <CardHeader>
                <CardTitle className="flex items-center text-xl md:text-2xl text-blue-700">
                  <Heart className="h-6 w-6 mr-2 text-blue-600" />
                  <span>Fact #{currentFactIndex + 1}: {currentFact.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 mb-8">{currentFact.content}</p>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevFact}
                    className="border-blue-200 text-blue-600 hover:bg-blue-50"
                  >
                    Previous Fact
                  </Button>
                  
                  <Button 
                    onClick={handleNextFact}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Next Fact
                  </Button>
                </div>
                
                <div className="flex justify-center mt-4">
                  <div className="flex gap-2">
                    {healthFacts.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                          index === currentFactIndex ? 'bg-blue-600' : 'bg-blue-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="prevention">
            <Card className="glass-panel border-t-4 border-teal-500">
              <CardHeader>
                <CardTitle className="flex items-center text-xl md:text-2xl text-teal-700">
                  <Heart className="h-6 w-6 mr-2 text-teal-600" />
                  <span>Tip #{currentTipIndex + 1}: {currentTip.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 mb-8">{currentTip.content}</p>
                
                <div className="flex justify-between mt-8">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevTip}
                    className="border-teal-200 text-teal-600 hover:bg-teal-50"
                  >
                    Previous Tip
                  </Button>
                  
                  <Button 
                    onClick={handleNextTip}
                    className="bg-teal-600 hover:bg-teal-700"
                  >
                    Next Tip
                  </Button>
                </div>
                
                <div className="flex justify-center mt-4">
                  <div className="flex gap-2">
                    {preventionTips.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${
                          index === currentTipIndex ? 'bg-teal-600' : 'bg-teal-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default HealthFacts;
