export interface Talent {
  id: number;
  name: string;
  title: string;
  location: string;
  category: string;
  rating: number;
  hourlyRate: number;
  avatar: string;
  skills: Array<{ name: string }>;
  description: string;
}

export const talentData: Talent[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    title: "Full Stack Developer",
    location: "San Francisco, CA",
    category: "Web Development",
    rating: 4.9,
    hourlyRate: 85,
    avatar: "/avatars/1.jpg",
    skills: [
      { name: "React" },
      { name: "Node.js" },
      { name: "TypeScript" },
    ],
    description: "Experienced developer with 8+ years building scalable web applications"
  },
  {
    id: 2,
    name: "Michael Chen",
    title: "UI/UX Designer",
    location: "New York, NY",
    category: "Design",
    rating: 5.0,
    hourlyRate: 75,
    avatar: "/avatars/2.jpg",
    skills: [
      { name: "Figma" },
      { name: "Adobe XD" },
      { name: "Prototyping" },
    ],
    description: "Creative designer focused on user-centered design and modern interfaces"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    title: "Mobile Developer",
    location: "Austin, TX",
    category: "Mobile Development",
    rating: 4.8,
    hourlyRate: 90,
    avatar: "/avatars/3.jpg",
    skills: [
      { name: "React Native" },
      { name: "Flutter" },
      { name: "iOS" },
    ],
    description: "Specialist in cross-platform mobile app development"
  },
  {
    id: 4,
    name: "David Kim",
    title: "Data Scientist",
    location: "Seattle, WA",
    category: "Data Science",
    rating: 4.7,
    hourlyRate: 95,
    avatar: "/avatars/4.jpg",
    skills: [
      { name: "Python" },
      { name: "Machine Learning" },
      { name: "TensorFlow" },
    ],
    description: "ML engineer with expertise in predictive modeling and data analysis"
  },
  {
    id: 5,
    name: "Jessica Martinez",
    title: "Content Writer",
    location: "Los Angeles, CA",
    category: "Writing",
    rating: 4.9,
    hourlyRate: 60,
    avatar: "/avatars/5.jpg",
    skills: [
      { name: "Content Strategy" },
      { name: "SEO Writing" },
      { name: "Copywriting" },
    ],
    description: "Professional writer specializing in tech and business content"
  },
  {
    id: 6,
    name: "Alex Thompson",
    title: "DevOps Engineer",
    location: "Denver, CO",
    category: "DevOps",
    rating: 4.8,
    hourlyRate: 100,
    avatar: "/avatars/6.jpg",
    skills: [
      { name: "AWS" },
      { name: "Docker" },
      { name: "Kubernetes" },
    ],
    description: "Infrastructure expert with cloud architecture and automation skills"
  }
];

