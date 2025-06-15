"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmployeeAppraisalCard, EmployeeAppraisalCardProps } from "@/components/leads/EmployeeAppraisalCard";
import { CheckCircle2, Clock, Users, Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const TeamLeadDashboard = () => {
  // Mock data - replace with actual data from your API
  const teamName = "Software Engineers";
  const totalAppraisals = 12;
  const pendingAppraisalsCount = 5;
  const completedAppraisals = 7;

  const pastAppraisals: EmployeeAppraisalCardProps["appraisal"][] = [
    {
      employeeId: "4",
      employeeName: "Alex Smith",
      dueDate: "2024-05-20",
      progress: 100,
      status: "completed",
    },
    {
      employeeId: "5",
      employeeName: "Maria Garcia",
      dueDate: "2024-05-15",
      progress: 100,
      status: "completed",
    },
    {
      employeeId: "6",
      employeeName: "John Doe",
      dueDate: "2024-05-10",
      progress: 100,
      status: "completed",
    },
  ];

  const pendingAppraisals: EmployeeAppraisalCardProps["appraisal"][] = [
    {
      employeeId: "1",
      employeeName: "Jane Doe",
      dueDate: "2024-07-15",
      progress: 60,
      status: "in_progress",
    },
    {
      employeeId: "2",
      employeeName: "Peter Jones",
      dueDate: "2024-07-20",
      progress: 20,
      status: "pending",
    },
  ];

  const scheduledMeetings = [
    {
      employeeName: "Jane Doe",
      date: "2024-06-28 at 10:00 AM",
    },
    {
      employeeName: "Peter Jones",
      date: "2024-07-02 at 2:00 PM",
    },
  ];

  return (
    <div className="bg-gray-50/50 min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Team Lead Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {teamName}! Here's an overview of your team's appraisals.
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Appraisals</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalAppraisals}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Appraisals</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingAppraisalsCount}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Completed Appraisals</CardTitle>
              <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedAppraisals}</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Past Appraisals */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Past Appraisals</h2>
                <Button variant="link" className="text-sm">View All</Button>
              </div>
              <div className="space-y-4">
                {pastAppraisals.map((appraisal) => (
                  <Card key={appraisal.employeeId}>
                    <CardContent className="p-4 flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{appraisal.employeeName}</p>
                        <p className="text-sm text-gray-500">Due: {appraisal.dueDate}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-32 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-black rounded-full"
                            style={{ width: `${appraisal.progress}%` }}
                          ></div>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Pending Appraisals */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Pending Appraisals</h2>
                <Button variant="link" className="text-sm">View All</Button>
              </div>
              <div className="space-y-4">
                {pendingAppraisals.map((appraisal) => (
                  <EmployeeAppraisalCard key={appraisal.employeeId} appraisal={appraisal} />
                ))}
              </div>
            </div>
          </div>

          {/* Scheduled Meetings */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Scheduled Meetings</h2>
            <Card>
              <CardContent className="p-4 space-y-4">
                {scheduledMeetings.map((meeting, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <CalendarIcon className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="font-semibold">{meeting.employeeName}</p>
                        <p className="text-sm text-gray-500">{meeting.date}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamLeadDashboard;