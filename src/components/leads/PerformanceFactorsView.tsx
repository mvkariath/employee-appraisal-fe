
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card"
import { Table,TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table"
import { PerformanceFactor } from "@/api-service/leads/types"

const PerformanceFactorsView = ({performance_factors}:{performance_factors:PerformanceFactor[]}) => {
    return (
        <Card>
        <CardHeader>
          <CardTitle>Performance Factors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Competency</TableHead>
                <TableHead>Strengths</TableHead>
                <TableHead>Improvements</TableHead>
                <TableHead>Rating</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {performance_factors?.map((factor) => (
                <TableRow key={factor.id}>
                  <TableCell>{factor.competency}</TableCell>
                  <TableCell>{factor.strengths ?? "—"}</TableCell>
                  <TableCell>{factor.improvements ?? "—"}</TableCell>
                  <TableCell>{factor.rating}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    )
}
export default PerformanceFactorsView