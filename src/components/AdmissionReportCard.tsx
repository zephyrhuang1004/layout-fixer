import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, X, Clock, GraduationCap } from "lucide-react";

export interface OtherResult {
  name: string;
  status: "accepted" | "rejected" | "waitlist" | "pending";
}

export interface AdmissionReport {
  initials: string;
  avatarColor?: {
    from: string;
    to: string;
    text: string;
    border: string;
  };
  undergradSchool: string;
  undergradMajor: string;
  gpa: string;
  program: string;
  admissionStatus: string;
  finalChoice?: {
    school: string;
    program: string;
  };
  testScores: { label: string; value: string }[];
  highlights?: { label: string; color?: "warning" | "purple" | "blue" }[];
  otherResults: OtherResult[];
  timeAgo: string;
}

interface AdmissionReportCardProps {
  report: AdmissionReport;
  currentSchool?: string;
}

const statusIcon = {
  accepted: <Check className="w-3 h-3" />,
  rejected: <X className="w-3 h-3" />,
  waitlist: <Clock className="w-3 h-3" />,
  pending: <Clock className="w-3 h-3" />,
};

const statusStyles = {
  accepted: "bg-success/10 text-success hover:bg-success/10 border-success/20",
  rejected: "bg-destructive/10 text-destructive hover:bg-destructive/10 border-destructive/20 opacity-75",
  waitlist: "bg-warning/10 text-warning hover:bg-warning/10 border-warning/20",
  pending: "bg-muted text-muted-foreground hover:bg-muted border-border",
};

const highlightStyles = {
  warning: "bg-warning/10 text-warning hover:bg-warning/10 border-warning/20",
  purple: "bg-purple-50 text-purple-700 hover:bg-purple-50 border-purple-200 dark:bg-purple-950 dark:text-purple-300 dark:border-purple-800",
  blue: "bg-blue-50 text-blue-700 hover:bg-blue-50 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
};

export function AdmissionReportCard({ report, currentSchool }: AdmissionReportCardProps) {
  const defaultAvatarColor = {
    from: "from-muted",
    to: "to-muted",
    text: "text-muted-foreground",
    border: "border-border",
  };
  
  const avatarColor = report.avatarColor || defaultAvatarColor;

  return (
    <Card className="p-5 hover:shadow-md hover:border-border/80 transition-all">
      <div className="flex flex-col sm:flex-row gap-5">
        {/* Left: User Info */}
        <div className="shrink-0 flex flex-row sm:flex-col items-center sm:items-start gap-3 sm:w-32 sm:border-r border-border sm:pr-4">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${avatarColor.from} ${avatarColor.to} flex items-center justify-center text-xs font-bold ${avatarColor.text} border ${avatarColor.border}`}>
            {report.initials}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-semibold">{report.undergradSchool}</span>
            <span className="text-[10px] text-muted-foreground">{report.undergradMajor}</span>
            <span className="text-[10px] text-muted-foreground/70 mt-0.5">{report.gpa}</span>
          </div>
        </div>

        {/* Right: Application Details */}
        <div className="flex-1 space-y-3">
          {/* Program & Status */}
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-sm font-bold">{report.program}</h3>
                <Badge className="gap-1 px-1.5 py-0.5 text-[10px] bg-success/10 text-success hover:bg-success/10 border-success/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                  {report.admissionStatus}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-2 text-[10px] font-medium">
                {report.testScores.map((score, idx) => (
                  <Badge key={idx} variant="secondary">{score.label} {score.value}</Badge>
                ))}
                {report.highlights?.map((highlight, idx) => (
                  <Badge key={idx} className={highlightStyles[highlight.color || "warning"]}>
                    {highlight.label}
                  </Badge>
                ))}
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground tabular-nums">{report.timeAgo}</span>
          </div>

          {/* Final Choice - NEW: Clear indicator of where they enrolled */}
          {report.finalChoice && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20">
              <GraduationCap className="w-4 h-4 text-primary" />
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">最終選擇</span>
                <span className="text-xs font-bold text-primary">{report.finalChoice.school}</span>
                <span className="text-[10px] text-muted-foreground">·</span>
                <span className="text-xs font-medium text-foreground">{report.finalChoice.program}</span>
              </div>
            </div>
          )}

          {/* Other Results */}
          <div className="pt-3 border-t border-border/50">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground mb-2 block">
              其他申請結果
            </span>
            <div className="flex flex-wrap gap-2">
              {report.otherResults.map((result, idx) => (
                <Badge key={idx} className={`gap-1.5 text-[11px] ${statusStyles[result.status]}`}>
                  {statusIcon[result.status]}
                  {result.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Sample data for demonstration
export const sampleAdmissionReports: AdmissionReport[] = [
  {
    initials: "JL",
    avatarColor: { from: "from-indigo-50", to: "to-blue-100", text: "text-blue-600", border: "border-blue-100" },
    undergradSchool: "National Taiwan Univ.",
    undergradMajor: "BS, Electrical Eng.",
    gpa: "GPA 4.13 / 4.3",
    program: "MS Computer Science",
    admissionStatus: "錄取 (Fall 2024)",
    finalChoice: { school: "Columbia", program: "MS Computer Science" },
    testScores: [{ label: "TOEFL", value: "112" }, { label: "GRE", value: "331" }],
    highlights: [{ label: "3 篇論文", color: "warning" }],
    otherResults: [
      { name: "CMU MCDS", status: "accepted" },
      { name: "UCSD CS75", status: "accepted" },
      { name: "Stanford", status: "rejected" },
      { name: "MIT", status: "rejected" },
    ],
    timeAgo: "2d ago",
  },
  {
    initials: "User",
    undergradSchool: "IIT Bombay",
    undergradMajor: "B.Tech, Mech Eng.",
    gpa: "GPA 8.9 / 10",
    program: "MS Data Science",
    admissionStatus: "錄取 (Fall 2024)",
    finalChoice: { school: "Columbia", program: "MS Data Science" },
    testScores: [{ label: "IELTS", value: "8.0" }, { label: "GRE", value: "334" }],
    highlights: [{ label: "Amazon Intern", color: "purple" }],
    otherResults: [
      { name: "UPenn", status: "waitlist" },
      { name: "NYU DS", status: "accepted" },
      { name: "Harvard", status: "rejected" },
    ],
    timeAgo: "5d ago",
  },
  {
    initials: "SY",
    avatarColor: { from: "from-green-50", to: "to-emerald-100", text: "text-green-700", border: "border-green-200" },
    undergradSchool: "Tsinghua University",
    undergradMajor: "BS, Computer Sci.",
    gpa: "GPA 3.92 / 4.0",
    program: "MS Electrical Engineering",
    admissionStatus: "錄取 (Fall 2024)",
    finalChoice: { school: "UC Berkeley", program: "MS EECS" },
    testScores: [{ label: "TOEFL", value: "115" }, { label: "GRE", value: "330" }],
    highlights: [{ label: "2 篇論文", color: "warning" }],
    otherResults: [
      { name: "UC Berkeley", status: "accepted" },
      { name: "Cornell", status: "accepted" },
      { name: "MIT", status: "waitlist" },
    ],
    timeAgo: "1w ago",
  },
  {
    initials: "AK",
    avatarColor: { from: "from-orange-50", to: "to-amber-100", text: "text-orange-700", border: "border-orange-200" },
    undergradSchool: "UC Berkeley",
    undergradMajor: "BS, Mathematics",
    gpa: "GPA 3.88 / 4.0",
    program: "MS Computer Science",
    admissionStatus: "錄取 with $15k/yr",
    finalChoice: { school: "Columbia", program: "MS Computer Science" },
    testScores: [{ label: "TOEFL", value: "109" }, { label: "GRE", value: "326" }],
    highlights: [{ label: "Google Intern", color: "blue" }],
    otherResults: [
      { name: "USC CS", status: "accepted" },
      { name: "UCSD", status: "accepted" },
      { name: "CMU MSCS", status: "rejected" },
    ],
    timeAgo: "1w ago",
  },
  {
    initials: "MZ",
    avatarColor: { from: "from-pink-50", to: "to-rose-100", text: "text-rose-700", border: "border-rose-200" },
    undergradSchool: "Peking University",
    undergradMajor: "BS, Physics",
    gpa: "GPA 3.76 / 4.0",
    program: "MS Data Science",
    admissionStatus: "錄取 (Fall 2024)",
    finalChoice: { school: "Columbia", program: "MS Data Science" },
    testScores: [{ label: "TOEFL", value: "110" }, { label: "GRE", value: "332" }],
    highlights: [{ label: "1 篇論文", color: "warning" }],
    otherResults: [
      { name: "NYU DS", status: "accepted" },
      { name: "Duke MIDS", status: "accepted" },
      { name: "UChicago", status: "pending" },
    ],
    timeAgo: "2w ago",
  },
  {
    initials: "RK",
    avatarColor: { from: "from-cyan-50", to: "to-sky-100", text: "text-cyan-700", border: "border-cyan-200" },
    undergradSchool: "Seoul National Univ.",
    undergradMajor: "BS, Comp. Eng.",
    gpa: "GPA 3.95 / 4.3",
    program: "MS Computer Science",
    admissionStatus: "錄取 (Fall 2024)",
    finalChoice: { school: "CMU", program: "MCDS" },
    testScores: [{ label: "TOEFL", value: "113" }, { label: "GRE", value: "329" }],
    highlights: [{ label: "Microsoft Intern", color: "blue" }],
    otherResults: [
      { name: "CMU MCDS", status: "accepted" },
      { name: "UWashington", status: "accepted" },
      { name: "Stanford MS", status: "rejected" },
    ],
    timeAgo: "2w ago",
  },
];
