import { Employee } from "../employees/types";


export interface EmployeeData {
  appraisalId: number;
  employee:Employee;
  
 
 
  appraisalStatus:"INITIATE_FEEDBACK" | "FEEDBACK_SUBMITTED"|string;
  cycleName: string;
  startDate: Date;
  endDate: Date;
}
 export interface PastAppraisal {
  id: number;
  cycle_name: string;
  employee_name: string;
  startDate: string; // or Date
  endDate: string;   // or Date
  current_status: "COMPLETED" | "PENDING" | "IN_PROGRESS" | string;

  idp: any[];                    // Replace `any` with a specific type if known
  performance_factors: any[];   // Replace `any` with a specific type if known
  self_appraisals: any[];       // Replace `any` with a specific type if known
}
export interface AppraisalLeadView {
  id: number;
  current_status: string;
  employee: {
    id: number;
  };
  viewing_as: string;
  visible_fields: string[];
  idp?: IndividualDevelopmentPlan[];
  performance_factors: PerformanceFactor[];
  self_appraisal: SelfAppraisalEntry[];
}

export interface IndividualDevelopmentPlan {
  id: number;
  competency: string;
  technical_objective: string;
  technical_plan: string;
}

export interface PerformanceFactor {
  // Define fields based on your data shape; placeholder for now
  id: number;
  competency: string;
  strengths: string;
  improvements: string;
  rating: number;
}

export interface SelfAppraisalEntry {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  delivery_details: string;
  accomplishments: string;
  approach_solution: string;
  improvement_possibilities: string;
  project_time_frame: string;
}
// Define fields based on your data shape; placeholder for now
