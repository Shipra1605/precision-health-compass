
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Mail, Github, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TeamMember {
  id: number;
  name: string;
  sapId: string;
  email: string;
  role: string;
  avatarUrl: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
  };
}

// Team members data (placeholder - to be replaced with actual team info)
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Shipra Nayal",
    sapId: "500XXXXXX",
    email: "shipra.nayal@example.com",
    role: "Team Lead & Frontend Developer",
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: 2,
    name: "Team Member 2",
    sapId: "500XXXXXX",
    email: "member2@example.com",
    role: "Backend Developer",
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    socialLinks: {
      github: "https://github.com",
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: 3,
    name: "Team Member 3",
    sapId: "500XXXXXX",
    email: "member3@example.com",
    role: "ML Engineer",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
    socialLinks: {
      github: "https://github.com"
    }
  },
  {
    id: 4,
    name: "Team Member 4",
    sapId: "500XXXXXX",
    email: "member4@example.com",
    role: "UI/UX Designer",
    avatarUrl: "https://randomuser.me/api/portraits/men/75.jpg",
    socialLinks: {
      linkedin: "https://linkedin.com"
    }
  },
  {
    id: 5,
    name: "Team Member 5",
    sapId: "500XXXXXX",
    email: "member5@example.com",
    role: "QA Engineer",
    avatarUrl: "https://randomuser.me/api/portraits/women/90.jpg"
  }
];

const Team = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800">Meet Our Team</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-blue-500 mx-auto mb-8"></div>
        
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
          MediCare AI is developed by a dedicated team of MCA students with specialization in Machine Learning and Artificial Intelligence. 
          Our diverse skills and collaborative approach make this project possible.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              className="animate-fade-in" 
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card className="overflow-hidden hover-lift bg-white border border-gray-100">
                <div className="aspect-[3/2] overflow-hidden bg-gradient-to-br from-blue-100 to-red-100">
                  <img 
                    src={member.avatarUrl} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-center transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h2>
                  <p className="text-blue-600 text-sm font-medium mb-3">{member.role}</p>
                  
                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <p className="flex items-center">
                      <span className="font-medium mr-2">SAP ID:</span> {member.sapId}
                    </p>
                    <p className="flex items-center">
                      <span className="font-medium mr-2">Email:</span> 
                      <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline truncate">
                        {member.email}
                      </a>
                    </p>
                  </div>
                  
                  <div className="flex space-x-2 pt-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href={`mailto:${member.email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </a>
                    </Button>
                    
                    {member.socialLinks?.github && (
                      <Button size="icon" variant="outline" asChild>
                        <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                    
                    {member.socialLinks?.linkedin && (
                      <Button size="icon" variant="outline" asChild>
                        <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-red-50 rounded-xl p-8 shadow-sm border border-blue-100">
          <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Project Information</h2>
          <div className="text-center">
            <p className="text-gray-600 mt-4 max-w-3xl mx-auto text-center">
              Made in partial fulfillment of Master's in Computer Applications (MCA) with specialization in Machine Learning and Artificial Intelligence, under internship collaboration with IBM.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Team;
