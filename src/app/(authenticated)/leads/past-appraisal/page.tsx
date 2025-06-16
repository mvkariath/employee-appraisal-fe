import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
//import { useNavigate } from "react-router-dom";

// Mock data (replace with API call or context as needed)
const pastAppraisals = [
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

const PastAppraisalsPage = () => {
  //const navigate = useNavigate();

  return (
    <div className="w-full p-8">
      <h1 className="text-2xl font-bold mb-6">Past Appraisals</h1>
      <div className="space-y-4">
        {pastAppraisals.map((appraisal) => (
          <Card key={appraisal.employeeId}>
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{appraisal.employeeName}</p>
                <p className="text-sm text-gray-500">
                  Due: {appraisal.dueDate}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-black rounded-full"
                    style={{ width: `${appraisal.progress}%` }}
                  ></div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  /*onClick={() =>
                    navigate(`/past-appraisals/${appraisal.employeeId}`)
                  }*/
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PastAppraisalsPage;