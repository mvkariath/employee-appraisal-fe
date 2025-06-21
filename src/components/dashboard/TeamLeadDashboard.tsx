"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  EmployeeAppraisalCard,
  EmployeeAppraisalCardProps,
} from "@/components/leads/EmployeeAppraisalCard";
import {
  CheckCircle2,
  Clock,
  Users,
  Calendar as CalendarIcon,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetCompletedAppraisalsQuery, useGetLeadsQuery } from "@/api-service/leads/leads.api";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { EmployeeData } from "@/api-service/leads/types";

const TeamLeadDashboard = () => {
  // Mock data - replace with actual data from your API
  const router=useRouter()
  const teamName = "Software Engineers";

  const [userId, setUserId] = useState<number| null>(null);

  const [leadName,setLeadName]=useState("")
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const parsed = JSON.parse(token);
        setUserId(parsed.id); 
        setLeadName(parsed.name)// assuming token is a JSON string with `id`
      } catch (e) {
        console.error("Invalid token in localStorage:", e);
      }
    }
  }, []);

  const { data, isLoading, error } = useGetLeadsQuery({id:userId},{skip:!userId})

  //   // skip: !userId, // <-- Skip until userId is ready
  // });

 
const pendingAppraisals = useMemo(() => {
  return data?.filter(item => item.appraisalStatus === 'FEEDBACK_INITIATED') ;
}, [data]);

const completedAppraisals = useMemo(() => {
  return data?.filter(item => item.appraisalStatus === 'FEEDBACK_SUBMITTED');
}, [data]);


console.log("Pending Appraisals:", pendingAppraisals);
 
 if (!userId) return <div>Loading user...</div>;
  if (isLoading) return <div>Loading leads...</div>;

  if (error) return <div>Error fetching leads</div>;
  if(!pendingAppraisals || !completedAppraisals) return <div>Loading appraisals</div>

  return (
    <div className="bg-gray-50/50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">
            Team Lead Dashboard
          </h1>
          <p className="text-gray-100">
            Welcome back, {leadName}! Here's an overview of your team's
            appraisals.
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Appraisals
              </CardTitle>
              <Users className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data?.length}</div>
            </CardContent>
          </Card>

          <Card className="flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Appraisals
              </CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingAppraisals?.length}</div>
            </CardContent>
          </Card>

          <Card className="flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Appraisals
              </CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedAppraisals?.length}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Pending Appraisals */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Pending Appraisals</h2>
                <Button variant="link" className="text-sm-white" onClick={()=>router.push('/leads/view-appraisal?status=FEEDBACK_INITIATED')}>
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {pendingAppraisals?.slice(0,3).map((appraisal) => (
                  <EmployeeAppraisalCard
                    key={appraisal.appraisalId}
                    appraisal={appraisal}
                  />
                ))}
              </div>
            </div>

          
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Completed Appraisals</h2>
                <Button variant="link" className="text-sm-white" onClick={()=>{router.push('/leads/view-appraisal?status=FEEDBACK_SUBMITTED')}}>
                  View All
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {completedAppraisals.slice(0,3).map((appraisal) => (
                 <EmployeeAppraisalCard key={appraisal.appraisalId}
                 appraisal={appraisal} />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TeamLeadDashboard;
