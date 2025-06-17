"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  Users,
  FileText,
  Target,
  Clock,
  CheckCircle2,
  User,
  Building2,
  PlusSquareIcon,
  PlusIcon,
  X,
} from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";
import AppraisalCycleModal from "@/components/hr/AppraisalCycleForm";
import renderHrDashboard from "../components/hrDashboard";



const Index = () => {
 
  const [activeView, setActiveView] = useState("hr");

  const renderActiveView = () => {
    switch (activeView) {
     case "hr": return renderHrDashboard();
     case "lead": return renderHrDashboard();
     case "employee": return renderHrDashboard();
      default:
        return <>Not found</>;
    }
  };

  return renderActiveView();
};

export default Index;
