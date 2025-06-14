"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmployeeAppraisalCard } from "@/components/leads/EmployeeAppraisalCard";
import { CheckCircle2, Clock, Users } from "lucide-react";


const LeadsDashboardPage = () => {
  // Mock data - replace with actual data from your API
  const pendingAppraisals = [
    {
      employeeId: "1",
      employeeName: "Sarah Johnson",
      dueDate: "2024-07-15",
      progress: 60,
    },
    {
      employeeId: "2",
      employeeName: "David Rodriguez",
      dueDate: "2024-07-20",
      progress: 20,
    },
    {
      employeeId: "3",
      employeeName: "Emily Chen",
      dueDate: "2024-07-22",
      progress: 80,
    },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
     
        {/* Header */}
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Appraisal Management
            </h1>
            <p className="text-lg text-gray-600">
              Streamline your performance review process
            </p>
          </div>
        </div>
                {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100">Total Emloyees Assigned</p>
                    <p className="text-3xl font-bold">254</p>
                  </div>
                  <Users className="h-8 w-8 text-green-200" />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-100">Completed Reviews</p>
                    <p className="text-3xl font-bold">23</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-purple-200" />
                </div>
              </CardContent>
            </Card>
            {/* <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-orange-100">Pending Actions</p>
                    <p className="text-3xl font-bold">31</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-200" />
                </div>
              </CardContent>
            </Card> */}
          </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pendingAppraisals.map((appraisal) => (
          <EmployeeAppraisalCard
            key={appraisal.employeeId}
            appraisal={appraisal}
          />
        ))}
      </div>
    </div>
  );
};

export default LeadsDashboardPage;
