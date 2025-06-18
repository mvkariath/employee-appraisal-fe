export interface EmployeeData {
  appraisal_id: number;
  employeeId: number;
  employeeEmail: string;
  name: string;
  department: string;
  cycleName: string;
  startDate: Date;
  endDate: Date;
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

interface IndividualDevelopmentPlan {
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
