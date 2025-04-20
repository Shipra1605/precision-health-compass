
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, ArrowRight, Leaf } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Define the data structure for health facts
interface HealthFact {
  id: number;
  title: string;
  description: string;
  category: string;
  prevention: string[];
}

// Sample health facts data
const healthFactsData: HealthFact[] = [
  {
    id: 1,
    title: "Effects of Dehydration",
    description: "Dehydration occurs when you use or lose more fluid than you take in, and your body doesn't have enough water and other fluids to carry out its normal functions. If you don't replace lost fluids, you will get dehydrated. Even mild dehydration can drain your energy and make you tired.",
    category: "Hydration",
    prevention: [
      "Drink at least 8 glasses of water daily",
      "Increase fluid intake during hot weather or physical activity",
      "Consume water-rich fruits and vegetables",
      "Monitor urine color - pale yellow indicates good hydration"
    ]
  },
  {
    id: 2,
    title: "Hypertension Risks",
    description: "High blood pressure (hypertension) is a common condition that can lead to serious health problems, such as heart attack and stroke. It often develops over many years and eventually affects nearly everyone. Fortunately, high blood pressure can be easily detected and controlled.",
    category: "Cardiovascular",
    prevention: [
      "Reduce sodium intake in your diet",
      "Exercise regularly, aim for 150 minutes per week",
      "Maintain a healthy weight",
      "Limit alcohol consumption",
      "Manage stress through meditation or other relaxation techniques"
    ]
  },
  {
    id: 3,
    title: "Sleep Deprivation Effects",
    description: "Sleep deprivation occurs when you don't get enough sleep. Getting fewer than 7 hours of sleep on a regular basis can eventually lead to health consequences that affect your entire body. This may also be caused by an underlying sleep disorder.",
    category: "Sleep",
    prevention: [
      "Aim for 7-9 hours of quality sleep per night",
      "Maintain a consistent sleep schedule, even on weekends",
      "Create a relaxing bedtime routine",
      "Limit exposure to screens before bedtime",
      "Create a comfortable sleep environment - cool, dark, and quiet"
    ]
  },
  {
    id: 4,
    title: "Sugar Consumption Impacts",
    description: "Consuming too much added sugar increases your risk of dying from heart disease. It can lead to weight gain, blood sugar problems, and increased inflammation in the body. Excess sugar consumption has been linked to numerous health issues including diabetes, obesity, and even certain types of cancer.",
    category: "Nutrition",
    prevention: [
      "Limit added sugar intake to less than 10% of daily calories",
      "Choose whole fruits instead of fruit juices",
      "Read nutrition labels to identify hidden sugars",
      "Avoid sugar-sweetened beverages",
      "Gradually reduce sugar in coffee, tea, and recipes"
    ]
  },
  {
    id: 5,
    title: "Benefits of Regular Exercise",
    description: "Regular physical activity is one of the most important things you can do for your health. Being physically active can improve your brain health, help manage weight, reduce the risk of disease, strengthen bones and muscles, and improve your ability to do everyday activities.",
    category: "Fitness",
    prevention: [
      "Aim for at least 150 minutes of moderate activity weekly",
      "Include both cardio and strength training exercises",
      "Find physical activities you enjoy to maintain consistency",
      "Start with small goals and gradually increase intensity",
      "Incorporate movement throughout your day, even if brief"
    ]
  },
  {
    id: 6,
    title: "Mental Health Awareness",
    description: "Mental health includes our emotional, psychological, and social well-being. It affects how we think, feel, and act. It also helps determine how we handle stress, relate to others, and make choices. Mental health is important at every stage of life, from childhood and adolescence through adulthood.",
    category: "Mental Health",
    prevention: [
      "Practice mindfulness or meditation regularly",
      "Stay connected with friends and family",
      "Seek professional help when needed",
      "Maintain work-life balance",
      "Engage in activities that bring joy and fulfillment"
    ]
  },
  {
    id: 7,
    title: "Digital Eye Strain",
    description: "Digital eye strain, also known as computer vision syndrome, describes a group of eye and vision-related problems that result from prolonged use of digital devices. Symptoms include eye fatigue, dry eyes, headaches, blurred vision, neck and shoulder pain.",
    category: "Vision",
    prevention: [
      "Follow the 20-20-20 rule: Every 20 minutes, look at something 20 feet away for 20 seconds",
      "Adjust screen brightness to match your surroundings",
      "Position your screen at arm's length and slightly below eye level",
      "Use artificial tears to keep eyes moist",
      "Consider blue light filtering glasses or screen protectors"
    ]
  }
];

const HealthFacts = () => {
  // State to track the current health fact being displayed
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("facts");
  
  const currentFact = healthFactsData[currentFactIndex];
  
  // Function to show the next random fact
  const showNextFact = () => {
    let nextIndex;
    do {
      nextIndex = Math.floor(Math.random() * healthFactsData.length);
    } while (nextIndex === currentFactIndex && healthFactsData.length > 1);
    
    setCurrentFactIndex(nextIndex);
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800">Health Facts & Prevention Tips</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-cyan-500 mx-auto mb-8"></div>
        
        <Tabs defaultValue="facts" className="mb-8" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="facts" className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Health Facts
            </TabsTrigger>
            <TabsTrigger value="prevention" className="flex items-center gap-2">
              <Leaf className="h-4 w-4" />
              Prevention Tips
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="facts" className="mt-4">
            <Card className="overflow-hidden border-t-4 hover-lift" style={{ borderTopColor: 'rgb(45, 212, 191)' }}>
              <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50">
                <CardTitle className="text-xl text-teal-800">
                  {currentFact.title}
                </CardTitle>
                <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-teal-100 text-teal-800">
                  {currentFact.category}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-700">
                  {currentFact.description}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveTab("prevention")}
                  className="text-teal-600 hover:text-teal-700 hover:bg-teal-50"
                >
                  View Prevention Tips
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button 
                  onClick={showNextFact}
                  className="bg-teal-600 hover:bg-teal-700"
                >
                  Next Fact
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="prevention" className="mt-4">
            <Card className="overflow-hidden border-t-4 hover-lift" style={{ borderTopColor: 'rgb(16, 185, 129)' }}>
              <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                <CardTitle className="text-xl text-emerald-800">
                  Prevention Tips: {currentFact.title}
                </CardTitle>
                <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-emerald-100 text-emerald-800">
                  {currentFact.category}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <ul className="space-y-3">
                  {currentFact.prevention.map((tip, index) => (
                    <li key={index} className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="text-xs font-medium text-green-800">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{tip}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Button 
                  variant="ghost" 
                  onClick={() => setActiveTab("facts")}
                  className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                >
                  Back to Health Facts
                </Button>
                <Button 
                  onClick={showNextFact}
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Next Topic
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mt-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Why These Facts Matter</h2>
          <p className="text-gray-600 mb-4">
            Understanding these health facts and implementing the related prevention strategies can significantly improve your overall wellbeing
            and reduce your risk of developing chronic conditions. Small daily changes can lead to substantial long-term health benefits.
          </p>
          <p className="text-gray-600">
            If you have specific health concerns, always consult with a healthcare professional for personalized advice and treatment recommendations.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default HealthFacts;
