
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { User, Mail, FileText } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  sapId: string;
  email: string;
  linkedin: string;
  photoUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Shipra Nayal",
    role: "Team Lead & Frontend Developer",
    sapId: "500XXXXXX",
    email: "shipra.nayal@example.com",
    linkedin: "https://linkedin.com/in/shipra-nayal",
    photoUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    name: "Team Member 2",
    role: "Backend Developer",
    sapId: "500XXXXXX",
    email: "member2@example.com",
    linkedin: "https://linkedin.com/in/member2",
    photoUrl: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 3,
    name: "Team Member 3",
    role: "ML Engineer",
    sapId: "500XXXXXX",
    email: "member3@example.com",
    linkedin: "https://linkedin.com/in/member3",
    photoUrl: "https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 4,
    name: "Team Member 4",
    role: "Data Scientist",
    sapId: "500XXXXXX",
    email: "member4@example.com",
    linkedin: "https://linkedin.com/in/member4",
    photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 5,
    name: "Team Member 5",
    role: "UI/UX Designer",
    sapId: "500XXXXXX",
    email: "member5@example.com",
    linkedin: "https://linkedin.com/in/member5",
    photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&h=150&q=80"
  }
];

const Team = () => {
  return (
    <div className="min-h-screen flex flex-col page-background">
      <Navbar />
      
      <main className="flex-grow px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 font-heading">Meet Our Team</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              This project MediCare AI is built by a team of MCA students specializing in Artificial Intelligence and Machine Learning. 
              Our Collaborative support and diverse skills, knowledge and understanding of the problem statement has made this project possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.id} className="hover-lift overflow-hidden border border-gray-200">
                <CardContent className="p-0">
                  <div className="flex items-center p-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden mr-4 flex-shrink-0 border border-gray-200">
                      <img 
                        src={member.photoUrl} 
                        alt={member.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                      <p className="text-teal-600 font-medium text-sm">{member.role}</p>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 p-4 bg-gray-50">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600">SAP ID: {member.sapId}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a href={`mailto:${member.email}`} className="text-blue-600 hover:underline">
                          {member.email}
                        </a>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <a 
                          href={member.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          LinkedIn Profile
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Academic Attribution - Only on Team Page */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-center text-gray-600 italic font-medium">
              Made in partial fulfillment of Master's in Computer Applications (MCA) with specialization in Machine Learning and Artificial Intelligence under IBM internship program
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Team;
