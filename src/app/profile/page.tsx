"use client"

import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { MapPin, Mail, Star, Edit } from "lucide-react"

export default function ProfilePage() {
  const mockUser = {
    name: "John Doe",
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    email: "john@example.com",
    bio: "Passionate developer with 5+ years of experience building modern web applications",
    rating: 4.8,
    skills: ["React", "Node.js", "TypeScript", "Python", "AWS"],
    completedProjects: 42
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="bg-gradient-to-r from-[#002333] to-[#15949C] text-white py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl font-bold mb-2">My Profile</h1>
            <p className="opacity-90">Manage your profile information</p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-5xl py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Sidebar */}
            <div className="lg:col-span-1">
              <Card className="p-6">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#15949C] to-[#002333] rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
                    {mockUser.name.charAt(0)}
                  </div>
                  <h2 className="text-xl font-semibold text-[#002333] mb-1">{mockUser.name}</h2>
                  <p className="text-gray-600 mb-4">{mockUser.title}</p>
                  
                  <div className="flex items-center justify-center gap-1 mb-4">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{mockUser.rating}</span>
                    <span className="text-gray-500 text-sm ml-1">
                      ({mockUser.completedProjects} projects)
                    </span>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{mockUser.location}</span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{mockUser.email}</span>
                    </div>
                  </div>

                  <Button className="w-full mt-6 bg-[#15949C] hover:bg-[#15949C]/90">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </Card>

              <Card className="p-6 mt-4">
                <h3 className="font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {mockUser.skills.map((skill, idx) => (
                    <Badge key={idx} variant="default">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-[#002333]">About Me</h2>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
                <p className="text-gray-600 mb-6">{mockUser.bio}</p>

                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="displayName">Display Name</Label>
                      <Input id="displayName" defaultValue={mockUser.name} />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={mockUser.email} />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input id="location" defaultValue={mockUser.location} />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <textarea 
                        id="bio"
                        className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                        defaultValue={mockUser.bio}
                      />
                    </div>
                    <Button className="bg-[#15949C] hover:bg-[#15949C]/90">
                      Save Changes
                    </Button>
                  </div>
                </div>
              </Card>

              <Card className="p-6 mt-6">
                <h3 className="text-lg font-semibold mb-4">Recent Projects</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">E-commerce Website</h4>
                      <p className="text-sm text-gray-600">Completed • 5.0 rating</p>
                    </div>
                    <Badge variant="success">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Mobile App Development</h4>
                      <p className="text-sm text-gray-600">Completed • 4.9 rating</p>
                    </div>
                    <Badge variant="success">Completed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium">Dashboard UI Design</h4>
                      <p className="text-sm text-gray-600">In Progress</p>
                    </div>
                    <Badge variant="pending">In Progress</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

