
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Brain, LucideIcon, Lungs, Activity, Apple } from 'lucide-react';

interface FactProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const facts: FactProps[] = [
  {
    title: "Hydration Enhances Brain Function",
    description: "Even mild dehydration—as little as 2% fluid loss—can affect your mood, energy level, and cognitive function. Research shows that staying properly hydrated improves brain performance by up to 30%, enhancing concentration, alertness, and short-term memory.",
    icon: Brain,
    color: "bg-blue-100 text-blue-600"
  },
  {
    title: "Blood Circulates Your Body in 60 Seconds",
    description: "Your heart pumps approximately 2,000 gallons of blood through your circulatory system each day. A single drop of blood takes only about 60 seconds to make the entire round trip through your body—from heart to body tissues and back again.",
    icon: Heart,
    color: "bg-red-100 text-red-600"
  },
  {
    title: "Lungs Contain Nearly 1,500 Miles of Airways",
    description: "If all the airways in your lungs were laid end to end, they would extend for about 1,500 miles—roughly the distance from New York to Denver. These airways contain tiny air sacs called alveoli, and you have about 600 million of them, providing an enormous surface area for gas exchange.",
    icon: Lungs,
    color: "bg-teal-100 text-teal-600"
  },
  {
    title: "Exercise Creates New Brain Cells",
    description: "Physical activity doesn't just build muscles—it actually promotes neurogenesis (the formation of new brain cells). Regular aerobic exercise increases the size of the hippocampus, the brain area involved in verbal memory and learning, by 1-2% annually, countering age-related brain shrinkage.",
    icon: Activity,
    color: "bg-purple-100 text-purple-600"
  },
  {
    title: "Gut Microbiome Weighs Around 4 Pounds",
    description: "The collection of bacteria in your digestive tract weighs approximately 4 pounds—about the same weight as your brain. This microbiome contains trillions of bacteria representing over 1,000 different species, and plays a crucial role in everything from digestion to immune function and even mental health.",
    icon: Apple,
    color: "bg-green-100 text-green-600"
  },
];

const HealthFacts: React.FC = () => {
  const [currentFact, setCurrentFact] = useState(0);

  const nextFact = () => {
    setCurrentFact((prev) => (prev < facts.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="min-h-screen flex flex-col page-background">
      <Navbar />
      
      <main className="flex-grow px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Health Facts</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover interesting insights about the human body and medical science
            </p>
          </div>
          
          <Tabs defaultValue="facts" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="facts">Interactive Facts</TabsTrigger>
              <TabsTrigger value="all">All Facts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="facts" className="w-full">
              <motion.div
                key={currentFact}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="glass-panel">
                  <CardContent className="pt-6 pb-4">
                    <div className="flex flex-col items-center text-center">
                      <div className={`rounded-full p-4 ${facts[currentFact].color} mb-6`}>
                        <facts[currentFact].icon className="h-8 w-8" />
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-4">{facts[currentFact].title}</h3>
                      <p className="text-gray-600 mb-8">{facts[currentFact].description}</p>
                      
                      <Button onClick={nextFact} className="bg-teal-600 hover:bg-teal-700">
                        Next Fact <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="all" className="space-y-6">
              {facts.map((fact, index) => (
                <Card key={index} className="hover-lift">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-3 ${fact.color} flex-shrink-0`}>
                        <fact.icon className="h-6 w-6" />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">{fact.title}</h3>
                        <p className="text-gray-600 text-sm">{fact.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HealthFacts;
