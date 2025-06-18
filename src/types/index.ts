// employee-appraisal-fe/src/types/index.ts

export interface Employee {
      id:number
  employeeId: string;
  email: string;
  name: string;
  age: number;
  password: string;
  role: string;
  department:string;
  dateOfJoining: string;
  experience: number;
  status: string;
}

export interface Appraisal {
    employeeIds: number[],
        cycle:{id:number},
        content:string,
        remarks_by:string,
        current_status:string,
}

// export interface EmployeeAppraisal{
  
//     employeeId: string
//     employeeName: string
//     dueDate: string
//     progress: number
//     status: "pending" | "in_progress" | "completed"
  
// }

// export interface SelfAppraisalEntry {
//   id: string;
//   deliveryDetails: string;
//   accomplishments: string;
//   approach: string;
//   improvements: string;
//   strengths: string;
// }

// export interface CompetencyEvaluation {
//   strengths: string;
//   improvements: string;
//   rating: number; // 1-10
// }

// export interface LeadEvaluation {
//   technical: CompetencyEvaluation;
//   functional: CompetencyEvaluation;
//   communication: CompetencyEvaluation;
//   energyAndDrive: CompetencyEvaluation;
//   responsibilitiesAndTrust: CompetencyEvaluation;
//   teamwork: CompetencyEvaluation;
//   managingProcesses: CompetencyEvaluation;
// }

// export interface Appraisal {
//   id: string;
//   employeeId: string;
//   period: {
//     from: string;
//     to: string;
//   };
//   selfAppraisal: SelfAppraisalEntry[];
//   leadEvaluation: LeadEvaluation | null;
//   status: 'Pending Self-Appraisal' | 'Pending Lead-Evaluation' | 'Complete';
// }

// export interface PastAppraisalSummary {
//     id: string;
//     team: string;
//     designation: string;
//     lead: string;
//     period: {
//         from: string;
//         to: string;
//     };
// }