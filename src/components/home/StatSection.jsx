import { UserRound, Award, GraduationCap, DollarSign, IndianRupee } from "lucide-react"
import StatCard from "./StatCard"
import { useEffect, useState } from "react"
import { api } from "@/api";

export default function StatsSection() {
    const [data,setData] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const resp = await fetch(`${api}/api/auth/metrics/`);
            const data = await resp.json();
            setData(data);
          } catch (error) {
            console.error("Error fetching metrics:", error);
          }
        };
      
        fetchData();
      }, []);
      
  return (
    <div className="py-16 px-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-3xl mb-20">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-purple-500 mb-12">Our Impact</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard icon={<UserRound className="h-6 w-6 text-purple-500" />} value={data?.students ||10} label="Students" />

          <StatCard icon={<GraduationCap className="h-6 w-6 text-purple-500" />} value={data?.ments ||10} label="Mentors" />

          <StatCard icon={<Award className="h-6 w-6 text-purple-500" />} value={2500} label="Scholarships" />

          <StatCard
            icon={<IndianRupee className="h-6 w-6 text-purple-500" />}
            value={10}
            label="Scholarship Funding"
            prefix="₹"
            suffix="+"
          />
        </div>
      </div>
    </div>
  )
}
