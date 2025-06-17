"use client";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Clock, Star, MessageCircle } from "lucide-react";


// Dummy employee data
const dummyEmployee = {
	employeeId: "EMP001",
	email: "jane.doe@example.com",
	name: "Jane Doe",
	age: 28,
	role: "hr",
	password: "securePassword123",
	experience: 5,
	status: "ACTIVE",
	dateOfJoining: new Date("2022-06-15"),
};

// Dummy summary and feedback
const employeeSummary = {
	currentRating: "4.5",
	lastAppraisalDate: "2024-03-15",
	progress: 80,
};

const feedbackList = [
	{
		comment: "Great leadership and mentorship shown throughout the quarter.",
		givenBy: "Mike Chen",
		date: "2024-03-20",
	},
	{
		comment: "Excellent planning and execution of the Q1 roadmap.",
		givenBy: "Lisa Park",
		date: "2024-02-10",
	},
];

const EmpDashboardPage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
			<div className="container mx-auto px-6 py-8">
				<div className="mb-8">
					<h1 className="text-4xl font-bold text-gray-900 mb-2">
						Welcome, {dummyEmployee.name}
					</h1>
					<p className="text-lg text-gray-600">
						Here's your latest appraisal summary and feedback.
					</p>
				</div>

				{/* Rating, Appraisal Date, Status */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
					<Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-green-100">Current Rating</p>
									<p className="text-3xl font-bold">{employeeSummary.currentRating}</p>
								</div>
								<Star className="h-8 w-8 text-yellow-200" />
							</div>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-purple-100">Last Appraisal</p>
									<p className="text-3xl font-bold">{employeeSummary.lastAppraisalDate}</p>
								</div>
								<CheckCircle2 className="h-8 w-8 text-purple-200" />
							</div>
						</CardContent>
					</Card>

					<Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
						<CardContent className="p-6">
							<div className="flex items-center justify-between">
								<div>
									<p className="text-orange-100">Status</p>
									<p className="text-3xl font-bold">{dummyEmployee.status}</p>
								</div>
								<Clock className="h-8 w-8 text-orange-200" />
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Summary and Feedback Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>	Employee Details</CardTitle>
							<CardDescription></CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-2">
								<div>
									<span className="font-semibold">Employee ID:</span> {dummyEmployee.employeeId}
								</div>
								<div>
									<span className="font-semibold">Email:</span> {dummyEmployee.email}
								</div>
								<div>
									<span className="font-semibold">Role:</span> {dummyEmployee.role}
								</div>
								<div>
									<span className="font-semibold">Experience:</span> {dummyEmployee.experience} years
								</div>
								<div>
									<span className="font-semibold">Date of Joining:</span>{" "}
									{dummyEmployee.dateOfJoining.toLocaleDateString()}
								</div>
								<div>
									<span className="font-semibold">Progress:</span>
									<Progress value={employeeSummary.progress} className="h-2 mt-1" />
								</div>
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Recent Feedback</CardTitle>
							<CardDescription>Feedback from your leads and peers.</CardDescription>
						</CardHeader>
						<CardContent>
							{feedbackList.length > 0 ? (
								<ul className="space-y-2">
									{feedbackList.map((item, idx) => (
										<li key={idx} className="bg-gray-100 rounded p-3">
											<div className="flex items-center gap-2">
												<MessageCircle className="h-4 w-4 text-blue-500" />
												<span className="text-sm text-gray-700">{item.comment}</span>
											</div>
											<div className="text-xs text-gray-500 mt-1">
												By {item.givenBy} on {item.date}
											</div>
										</li>
									))}
								</ul>
							) : (
								<div>No recent feedback.</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default EmpDashboardPage;
