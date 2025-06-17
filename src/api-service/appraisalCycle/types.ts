export interface AppraisalCycle {
  id:number
  name: string;
  start_date: string;
  end_date: string;
  status: string;
  created_by: number;
  employees: number[]; 
}