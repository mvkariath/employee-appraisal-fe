import { IndividualDevelopmentPlan } from "@/api-service/leads/types"
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

import { Table,TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";

const IndividualDevelopmentPlanCard=({idpData}:{idpData:IndividualDevelopmentPlan[]})=>{
   
 return (


    <Card>
      <CardHeader>
        <CardTitle>Individual Development Plan</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Competency</TableHead>
              <TableHead>Individual Objective</TableHead>
              <TableHead>Development Plan</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {idpData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.competency}</TableCell>
                <TableCell>
                  {item.technical_objective || (
                    <span className="text-gray-400 italic">Not provided</span>
                  )}
                </TableCell>
                <TableCell>
                  {item.technical_plan || (
                    <span className="text-gray-400 italic">Not provided</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>)
  
  

    
}
export default IndividualDevelopmentPlanCard