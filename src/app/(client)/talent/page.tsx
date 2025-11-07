"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { Search, MapPin, Star } from "lucide-react"
import { talentData, type Talent } from "@/lib/mock-data/talent-data"
import TalentProfileModal from "@/components/talent/talent-profile-modal"

export default function TalentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTalent, setSelectedTalent] = useState<Talent | null>(null)

  const filteredTalents = talentData.filter(
    (talent) =>
      talent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      talent.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleCloseModal = (open: boolean) => {
    if (!open) {
      setSelectedTalent(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#002333] to-[#15949C] text-white py-12">
          <div className="container mx-auto px-4 max-w-7xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Find Top Talent</h1>
            <p className="text-lg text-white/90">Discover skilled professionals for your next project</p>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-7xl py-8">
          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative max-w-2xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name, title, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-sm text-gray-600">
              Showing {filteredTalents.length} of {talentData.length} talents
            </p>
          </div>

          {/* Talent Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTalents.map((talent) => (
              <Card key={talent.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#15949C] to-[#002333] rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {talent.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-[#002333]">{talent.name}</h3>
                    <p className="text-gray-600 text-sm">{talent.title}</p>
                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-500">
                      <MapPin className="h-3 w-3" />
                      <span>{talent.location}</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {talent.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {talent.skills.slice(0, 3).map((skill, idx) => (
                    <Badge key={idx} variant="default" className="text-xs">
                      {skill.name}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{talent.rating}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      ${talent.hourlyRate}/hr
                    </p>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-[#15949C] hover:bg-[#15949C]/90"
                    onClick={() => setSelectedTalent(talent)}
                  >
                    View Profile
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {filteredTalents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-2">No talents found</p>
              <p className="text-gray-400 text-sm">Try adjusting your search criteria</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <TalentProfileModal
        open={Boolean(selectedTalent)}
        talent={selectedTalent}
        onOpenChange={handleCloseModal}
      />
    </div>
  )
}

