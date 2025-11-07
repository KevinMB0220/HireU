'use client'

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Briefcase, Shield, Zap } from "lucide-react";
import CreateProjectPreview from "@/components/home/create-project-preview";
import { motion } from "framer-motion";

export default function HomePage() {
  const features = [
    {
      icon: Users,
      title: "Find Top Talent",
      description: "Connect with skilled professionals ready to bring your projects to life"
    },
    {
      icon: Briefcase,
      title: "Post Projects",
      description: "Share your vision and receive proposals from qualified freelancers"
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description: "Protected transactions ensure everyone gets paid fairly"
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Get your projects completed quickly with dedicated professionals"
    }
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <motion.section
          className="relative overflow-hidden bg-gradient-to-br from-[#002333] via-[#004455] to-[#15949C] text-white py-20 lg:py-32"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-96 h-96 bg-[#15949C] rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-[#002333] rounded-full blur-3xl"></div>
          </div>
          
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Find the Perfect Talent for Your Next Project
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-white/90 mb-8"
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Connect with skilled professionals and get your work done efficiently
              </motion.p>
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Link href="/talent">
                  <Button size="lg" className="bg-white text-[#002333] hover:bg-white/90 text-lg h-12 px-8">
                    Find Talent
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/post-project">
                  <Button size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white/10 text-lg h-12 px-8">
                    Post a Project
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Project Creation Preview Section */}
        <CreateProjectPreview />

        {/* Features Section */}
        <motion.section
          className="py-20 bg-gray-50"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              className="text-center mb-16"
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-[#002333] mb-4">
                Why Choose OFFER-HUB?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Everything you need to hire talent and manage projects successfully
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileInView="visible"
                  initial="hidden"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-[#15949C] to-[#002333] rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#002333] mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          className="py-20 bg-gradient-to-r from-[#15949C] to-[#002333] text-white"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 max-w-7xl text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of clients and freelancers collaborating on OFFER-HUB
            </p>
            <Link href="/onboarding/sign-up">
              <Button size="lg" className="bg-white text-[#002333] hover:bg-white/90 text-lg h-12 px-8">
                Create Free Account
              </Button>
            </Link>
            <p className="mt-4 text-sm text-white/70">
              This is a UI demonstration only - no real accounts are created
            </p>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}
