import { useState, useEffect } from "react";
import { Search, Check, ChevronRight, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

interface AddAdmissionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Mock database of programs (simulating 100k entries)
const mockPrograms = [
  { id: 1, university: "University of Southern California", universityAbbr: "USC", degree: "MS", program: "Computer Science", programAbbr: "CS" },
  { id: 2, university: "University of Southern California", universityAbbr: "USC", degree: "MS", program: "Electrical Engineering", programAbbr: "EE" },
  { id: 3, university: "University of Southern California", universityAbbr: "USC", degree: "MS", program: "Mechanical Engineering", programAbbr: "ME" },
  { id: 4, university: "University of Southern California", universityAbbr: "USC", degree: "PhD", program: "Computer Science", programAbbr: "CS" },
  { id: 5, university: "University of California, Berkeley", universityAbbr: "UCB", degree: "MS", program: "Electrical Engineering", programAbbr: "EE" },
  { id: 6, university: "University of California, Berkeley", universityAbbr: "UCB", degree: "MS", program: "Computer Science", programAbbr: "CS" },
  { id: 7, university: "University of California, Berkeley", universityAbbr: "UCB", degree: "PhD", program: "Computer Science", programAbbr: "CS" },
  { id: 8, university: "Massachusetts Institute of Technology", universityAbbr: "MIT", degree: "MS", program: "Electrical Engineering", programAbbr: "EE" },
  { id: 9, university: "Massachusetts Institute of Technology", universityAbbr: "MIT", degree: "PhD", program: "Computer Science", programAbbr: "CS" },
  { id: 10, university: "Stanford University", universityAbbr: "Stanford", degree: "MS", program: "Computer Science", programAbbr: "CS" },
  { id: 11, university: "Stanford University", universityAbbr: "Stanford", degree: "MS", program: "Management Science and Engineering", programAbbr: "MS&E" },
  { id: 12, university: "Carnegie Mellon University", universityAbbr: "CMU", degree: "MS", program: "Computer Science", programAbbr: "CS" },
  { id: 13, university: "Carnegie Mellon University", universityAbbr: "CMU", degree: "MS", program: "Machine Learning", programAbbr: "ML" },
  { id: 14, university: "University of California, Los Angeles", universityAbbr: "UCLA", degree: "MS", program: "Computer Science", programAbbr: "CS" },
  { id: 15, university: "Georgia Institute of Technology", universityAbbr: "GaTech", degree: "MS", program: "Computer Science", programAbbr: "CS" },
];

interface ProgramResult {
  id: number;
  university: string;
  universityAbbr: string;
  degree: string;
  program: string;
  programAbbr: string;
  matchScore?: number;
}

export function AddAdmissionSheet({ open, onOpenChange }: AddAdmissionSheetProps) {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<ProgramResult[]>([]);
  const [selectedProgram, setSelectedProgram] = useState<ProgramResult | null>(null);
  const [formData, setFormData] = useState({
    result: "",
    isFinalChoice: false,
    gpa: "",
    toefl: "",
    gre: "",
    applicationDate: "",
    decisionDate: "",
    notes: ""
  });

  // Simulate smart search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    // Simulate API delay
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();
      const tokens = query.split(/[\s,]+/).filter(Boolean);
      
      // Identify degree tokens
      const degreeTokens = ["ms", "phd", "mba", "llm", "meng", "bs", "ba"];
      const foundDegree = tokens.find(t => degreeTokens.includes(t))?.toUpperCase();
      
      // Filter and score programs
      const results = mockPrograms
        .map(prog => {
          let score = 0;
          const searchableText = `${prog.university} ${prog.universityAbbr} ${prog.degree} ${prog.program} ${prog.programAbbr}`.toLowerCase();
          
          // Check each token
          tokens.forEach(token => {
            if (searchableText.includes(token)) {
              score += 10;
              // Bonus for exact abbreviation match
              if (prog.universityAbbr.toLowerCase() === token || 
                  prog.programAbbr.toLowerCase() === token ||
                  prog.degree.toLowerCase() === token) {
                score += 20;
              }
            }
          });
          
          // Bonus if degree matches
          if (foundDegree && prog.degree === foundDegree) {
            score += 15;
          }
          
          return { ...prog, matchScore: score };
        })
        .filter(prog => prog.matchScore > 0)
        .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
        .slice(0, 8);
      
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectProgram = (program: ProgramResult) => {
    setSelectedProgram(program);
    setStep(2);
  };

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      if (step === 2) {
        setSelectedProgram(null);
      }
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    // Mock submit
    onOpenChange(false);
    setStep(1);
    setSearchQuery("");
    setSelectedProgram(null);
    setSearchResults([]);
    setFormData({
      result: "",
      isFinalChoice: false,
      gpa: "",
      toefl: "",
      gre: "",
      applicationDate: "",
      decisionDate: "",
      notes: ""
    });
  };

  const handleClose = () => {
    onOpenChange(false);
    setStep(1);
    setSearchQuery("");
    setSelectedProgram(null);
    setSearchResults([]);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleClose}>
              取消
            </Button>
            <SheetTitle>新增申請結果</SheetTitle>
            <div className="w-12" />
          </div>
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all ${
                  s === step ? "w-8 bg-primary" : s < step ? "w-6 bg-primary/50" : "w-6 bg-muted"
                }`}
              />
            ))}
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6">
          {/* Step 1: Smart Search */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">搜尋系所</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  輸入學校、學位、科系（順序不限、可用縮寫）
                </p>
              </div>

              {/* Search Input */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="例：USC MS CS、MIT PhD EE"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                  autoFocus
                />
                {isSearching && (
                  <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />
                )}
              </div>

              {/* Search Tips */}
              {!searchQuery && (
                <div className="space-y-3 mt-6">
                  <p className="text-sm font-medium text-muted-foreground">搜尋提示</p>
                  <div className="grid grid-cols-2 gap-2">
                    {["USC MS CS", "MIT PhD EE", "Stanford MS", "CMU ML"].map((example) => (
                      <button
                        key={example}
                        onClick={() => setSearchQuery(example)}
                        className="px-3 py-2 rounded-lg bg-muted/50 text-sm text-muted-foreground hover:bg-muted transition-colors text-left"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2 mt-4">
                  <p className="text-sm font-medium text-muted-foreground">
                    找到 {searchResults.length} 個結果
                  </p>
                  <div className="space-y-2">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleSelectProgram(result)}
                        className="w-full p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                                {result.degree}
                              </span>
                              <span className="font-medium">{result.program}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {result.university}
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {searchQuery && !isSearching && searchResults.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">找不到符合的系所</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    試試其他關鍵字，或檢查拼寫
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Confirm & Result */}
          {step === 2 && selectedProgram && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">確認系所與結果</h3>
                <p className="text-sm text-muted-foreground mt-1">確認選擇的系所並填寫申請結果</p>
              </div>

              {/* Selected Program Card */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                        {selectedProgram.degree}
                      </span>
                      <span className="font-semibold">{selectedProgram.program}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedProgram.university}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => { setStep(1); setSelectedProgram(null); }}
                    className="text-muted-foreground"
                  >
                    更換
                  </Button>
                </div>
              </div>

              {/* Result Selection */}
              <div className="space-y-2">
                <Label>申請結果</Label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "admitted", label: "錄取", color: "bg-green-500/10 border-green-500/30 text-green-600" },
                    { value: "waitlisted", label: "備取", color: "bg-yellow-500/10 border-yellow-500/30 text-yellow-600" },
                    { value: "rejected", label: "未錄取", color: "bg-red-500/10 border-red-500/30 text-red-600" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormData({ ...formData, result: option.value })}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        formData.result === option.value
                          ? option.color + " border-current"
                          : "border-border hover:border-muted-foreground/30"
                      }`}
                    >
                      <span className="font-medium">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {formData.result === "admitted" && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div>
                    <p className="font-medium">這是我的最終選擇</p>
                    <p className="text-sm text-muted-foreground">標記為你最終就讀的學校</p>
                  </div>
                  <Switch
                    checked={formData.isFinalChoice}
                    onCheckedChange={(checked) => setFormData({ ...formData, isFinalChoice: checked })}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 3: Stats */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">申請資料</h3>
                <p className="text-sm text-muted-foreground mt-1">填寫你的成績資料（選填）</p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>GPA</Label>
                    <Input
                      placeholder="例：3.8"
                      value={formData.gpa}
                      onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>TOEFL / IELTS</Label>
                    <Input
                      placeholder="例：110"
                      value={formData.toefl}
                      onChange={(e) => setFormData({ ...formData, toefl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>GRE / GMAT</Label>
                  <Input
                    placeholder="例：330"
                    value={formData.gre}
                    onChange={(e) => setFormData({ ...formData, gre: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>申請日期</Label>
                    <Input
                      type="date"
                      value={formData.applicationDate}
                      onChange={(e) => setFormData({ ...formData, applicationDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>結果通知日期</Label>
                    <Input
                      type="date"
                      value={formData.decisionDate}
                      onChange={(e) => setFormData({ ...formData, decisionDate: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Notes & Review */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold">補充說明</h3>
                <p className="text-sm text-muted-foreground mt-1">分享你的申請心得（選填）</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>申請心得或建議</Label>
                  <Textarea
                    placeholder="分享你的申請經驗，例如面試過程、申請策略等..."
                    className="min-h-[120px]"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                {/* Summary */}
                <div className="p-4 rounded-xl bg-muted/50 space-y-3">
                  <h4 className="font-medium">申請摘要</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">學校</span>
                      <span className="font-medium">{selectedProgram?.university || "未填寫"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">學位</span>
                      <span className="font-medium">{selectedProgram?.degree || "未填寫"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">科系</span>
                      <span className="font-medium">{selectedProgram?.program || "未填寫"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">結果</span>
                      <span className={`font-medium ${
                        formData.result === "admitted" ? "text-green-600" :
                        formData.result === "waitlisted" ? "text-yellow-600" :
                        formData.result === "rejected" ? "text-red-600" : ""
                      }`}>
                        {formData.result === "admitted" ? "錄取" :
                         formData.result === "waitlisted" ? "備取" :
                         formData.result === "rejected" ? "未錄取" : "未填寫"}
                        {formData.isFinalChoice && " ⭐ 最終選擇"}
                      </span>
                    </div>
                    {formData.gpa && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">GPA</span>
                        <span className="font-medium">{formData.gpa}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-border flex gap-3">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              上一步
            </Button>
          )}
          {step === 1 ? (
            <div className="flex-1" /> // Spacer for step 1
          ) : step < 4 ? (
            <Button 
              onClick={handleNext} 
              className="flex-1"
              disabled={step === 2 && !formData.result}
            >
              下一步
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex-1">
              <Check className="h-4 w-4 mr-2" />
              送出
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
