import { useState, useEffect } from "react";
import { Search, Check, ChevronRight, X, Loader2, Plus, Trash2, ChevronLeft } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface SelectedProgramWithResult extends ProgramResult {
  result: string;
  isFinalChoice: boolean;
  notes: string;
}

export function AddAdmissionSheet({ open, onOpenChange }: AddAdmissionSheetProps) {
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<ProgramResult[]>([]);
  
  // Batch mode: multiple programs
  const [selectedPrograms, setSelectedPrograms] = useState<SelectedProgramWithResult[]>([]);
  const [currentEditIndex, setCurrentEditIndex] = useState(0);
  
  // Shared stats (applied to all programs)
  const [sharedStats, setSharedStats] = useState({
    gpa: "",
    toefl: "",
    gre: "",
    applicationDate: "",
  });

  // Simulate smart search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    const timer = setTimeout(() => {
      const query = searchQuery.toLowerCase().trim();
      const tokens = query.split(/[\s,]+/).filter(Boolean);
      
      const degreeTokens = ["ms", "phd", "mba", "llm", "meng", "bs", "ba"];
      const foundDegree = tokens.find(t => degreeTokens.includes(t))?.toUpperCase();
      
      const results = mockPrograms
        .map(prog => {
          let score = 0;
          const searchableText = `${prog.university} ${prog.universityAbbr} ${prog.degree} ${prog.program} ${prog.programAbbr}`.toLowerCase();
          
          tokens.forEach(token => {
            if (searchableText.includes(token)) {
              score += 10;
              if (prog.universityAbbr.toLowerCase() === token || 
                  prog.programAbbr.toLowerCase() === token ||
                  prog.degree.toLowerCase() === token) {
                score += 20;
              }
            }
          });
          
          if (foundDegree && prog.degree === foundDegree) {
            score += 15;
          }
          
          return { ...prog, matchScore: score };
        })
        .filter(prog => prog.matchScore > 0)
        // Filter out already selected programs
        .filter(prog => !selectedPrograms.some(sp => sp.id === prog.id))
        .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0))
        .slice(0, 8);
      
      setSearchResults(results);
      setIsSearching(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedPrograms]);

  const handleAddProgram = (program: ProgramResult) => {
    setSelectedPrograms([
      ...selectedPrograms,
      { 
        ...program, 
        result: "", 
        isFinalChoice: false, 
        notes: "" 
      }
    ]);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleRemoveProgram = (id: number) => {
    setSelectedPrograms(selectedPrograms.filter(p => p.id !== id));
  };

  const handleNext = () => {
    if (step === 3 && currentEditIndex < selectedPrograms.length - 1) {
      setCurrentEditIndex(currentEditIndex + 1);
    } else if (step < 4) {
      if (step === 2) setCurrentEditIndex(0);
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 3 && currentEditIndex > 0) {
      setCurrentEditIndex(currentEditIndex - 1);
    } else if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateCurrentProgram = (field: string, value: string | boolean) => {
    const updated = [...selectedPrograms];
    updated[currentEditIndex] = {
      ...updated[currentEditIndex],
      [field]: value
    };
    // If setting this as final choice, remove final choice from others
    if (field === "isFinalChoice" && value === true) {
      updated.forEach((p, i) => {
        if (i !== currentEditIndex) p.isFinalChoice = false;
      });
    }
    setSelectedPrograms(updated);
  };

  const handleSubmit = () => {
    // Mock submit
    onOpenChange(false);
    resetForm();
  };

  const resetForm = () => {
    setStep(1);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedPrograms([]);
    setCurrentEditIndex(0);
    setSharedStats({
      gpa: "",
      toefl: "",
      gre: "",
      applicationDate: "",
    });
  };

  const handleClose = () => {
    onOpenChange(false);
    resetForm();
  };

  const canProceedFromStep1 = selectedPrograms.length > 0;
  const canProceedFromStep3 = selectedPrograms[currentEditIndex]?.result !== "";
  const allResultsFilled = selectedPrograms.every(p => p.result !== "");

  const getStepTitle = () => {
    switch (step) {
      case 1: return "選擇系所";
      case 2: return "共用資料";
      case 3: return `填寫結果 (${currentEditIndex + 1}/${selectedPrograms.length})`;
      case 4: return "確認送出";
      default: return "";
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl flex flex-col">
        <SheetHeader className="pb-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleClose}>
              取消
            </Button>
            <SheetTitle>批次新增申請結果</SheetTitle>
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
          <p className="text-center text-sm text-muted-foreground mt-2">{getStepTitle()}</p>
        </SheetHeader>

        <ScrollArea className="flex-1 py-6">
          {/* Step 1: Search and add multiple programs */}
          {step === 1 && (
            <div className="space-y-4 px-1">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  搜尋並加入多個系所，一次填寫所有申請結果
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

              {/* Search Results */}
              {searchResults.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    搜尋結果
                  </p>
                  <div className="space-y-2">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleAddProgram(result)}
                        className="w-full p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-left group"
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                                {result.degree}
                              </span>
                              <span className="font-medium text-sm">{result.program}</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {result.universityAbbr} · {result.university}
                            </p>
                          </div>
                          <Plus className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Search Tips (when no query) */}
              {!searchQuery && selectedPrograms.length === 0 && (
                <div className="space-y-3 mt-4">
                  <p className="text-sm font-medium text-muted-foreground">快速搜尋</p>
                  <div className="flex flex-wrap gap-2">
                    {["USC MS CS", "MIT PhD EE", "Stanford MS", "CMU ML"].map((example) => (
                      <button
                        key={example}
                        onClick={() => setSearchQuery(example)}
                        className="px-3 py-1.5 rounded-full bg-muted/50 text-sm text-muted-foreground hover:bg-muted transition-colors"
                      >
                        {example}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Selected Programs List */}
              {selectedPrograms.length > 0 && (
                <div className="space-y-3 mt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">已選擇的系所</p>
                    <Badge variant="secondary">{selectedPrograms.length} 個</Badge>
                  </div>
                  <div className="space-y-2">
                    {selectedPrograms.map((prog) => (
                      <div
                        key={prog.id}
                        className="flex items-center justify-between p-3 rounded-xl bg-primary/5 border border-primary/20"
                      >
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                              {prog.degree}
                            </span>
                            <span className="font-medium text-sm">{prog.program}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {prog.universityAbbr}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => handleRemoveProgram(prog.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* No Results */}
              {searchQuery && !isSearching && searchResults.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-muted-foreground text-sm">找不到符合的系所</p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Shared Stats */}
          {step === 2 && (
            <div className="space-y-6 px-1">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  這些資料會套用到所有 {selectedPrograms.length} 個系所
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>GPA</Label>
                    <Input
                      placeholder="例：3.8"
                      value={sharedStats.gpa}
                      onChange={(e) => setSharedStats({ ...sharedStats, gpa: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>TOEFL / IELTS</Label>
                    <Input
                      placeholder="例：110"
                      value={sharedStats.toefl}
                      onChange={(e) => setSharedStats({ ...sharedStats, toefl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>GRE / GMAT</Label>
                  <Input
                    placeholder="例：330"
                    value={sharedStats.gre}
                    onChange={(e) => setSharedStats({ ...sharedStats, gre: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>申請季</Label>
                  <Input
                    type="month"
                    value={sharedStats.applicationDate}
                    onChange={(e) => setSharedStats({ ...sharedStats, applicationDate: e.target.value })}
                  />
                </div>
              </div>

              {/* Preview selected programs */}
              <div className="mt-6 p-4 rounded-xl bg-muted/30">
                <p className="text-sm font-medium mb-3">接下來要填寫的系所：</p>
                <div className="flex flex-wrap gap-2">
                  {selectedPrograms.map((prog) => (
                    <Badge key={prog.id} variant="outline" className="text-xs">
                      {prog.universityAbbr} {prog.degree} {prog.programAbbr}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Individual Results */}
          {step === 3 && selectedPrograms[currentEditIndex] && (
            <div className="space-y-6 px-1">
              {/* Current Program Card */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                    {selectedPrograms[currentEditIndex].degree}
                  </span>
                  <span className="font-semibold">{selectedPrograms[currentEditIndex].program}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedPrograms[currentEditIndex].university}
                </p>
              </div>

              {/* Progress dots */}
              <div className="flex items-center justify-center gap-1.5">
                {selectedPrograms.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 w-2 rounded-full transition-all ${
                      i === currentEditIndex 
                        ? "bg-primary scale-125" 
                        : selectedPrograms[i].result 
                          ? "bg-primary/50" 
                          : "bg-muted"
                    }`}
                  />
                ))}
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
                      onClick={() => updateCurrentProgram("result", option.value)}
                      className={`p-3 rounded-xl border-2 transition-all ${
                        selectedPrograms[currentEditIndex].result === option.value
                          ? option.color + " border-current"
                          : "border-border hover:border-muted-foreground/30"
                      }`}
                    >
                      <span className="font-medium text-sm">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Final Choice Toggle */}
              {selectedPrograms[currentEditIndex].result === "admitted" && (
                <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                  <div>
                    <p className="font-medium text-sm">這是我的最終選擇</p>
                    <p className="text-xs text-muted-foreground">標記為你最終就讀的學校</p>
                  </div>
                  <Switch
                    checked={selectedPrograms[currentEditIndex].isFinalChoice}
                    onCheckedChange={(checked) => updateCurrentProgram("isFinalChoice", checked)}
                  />
                </div>
              )}

              {/* Notes */}
              <div className="space-y-2">
                <Label>備註（選填）</Label>
                <Textarea
                  placeholder="面試心得、特殊經歷..."
                  className="min-h-[80px]"
                  value={selectedPrograms[currentEditIndex].notes}
                  onChange={(e) => updateCurrentProgram("notes", e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-6 px-1">
              <div className="text-center mb-4">
                <p className="text-sm text-muted-foreground">
                  確認以下 {selectedPrograms.length} 筆申請結果
                </p>
              </div>

              {/* Shared Stats Summary */}
              <div className="p-4 rounded-xl bg-muted/30">
                <p className="text-sm font-medium mb-2">共用資料</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {sharedStats.gpa && <p>GPA: <span className="font-medium">{sharedStats.gpa}</span></p>}
                  {sharedStats.toefl && <p>語言: <span className="font-medium">{sharedStats.toefl}</span></p>}
                  {sharedStats.gre && <p>GRE/GMAT: <span className="font-medium">{sharedStats.gre}</span></p>}
                  {sharedStats.applicationDate && <p>申請季: <span className="font-medium">{sharedStats.applicationDate}</span></p>}
                </div>
              </div>

              {/* Programs Summary */}
              <div className="space-y-3">
                {selectedPrograms.map((prog) => (
                  <div
                    key={prog.id}
                    className="p-4 rounded-xl border border-border"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                            {prog.degree}
                          </span>
                          <span className="font-medium text-sm">{prog.program}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{prog.universityAbbr}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {prog.isFinalChoice && (
                          <Badge className="bg-primary/10 text-primary text-xs">最終選擇</Badge>
                        )}
                        <Badge 
                          variant="outline"
                          className={
                            prog.result === "admitted" ? "border-green-500/50 text-green-600" :
                            prog.result === "waitlisted" ? "border-yellow-500/50 text-yellow-600" :
                            "border-red-500/50 text-red-600"
                          }
                        >
                          {prog.result === "admitted" ? "錄取" : prog.result === "waitlisted" ? "備取" : "未錄取"}
                        </Badge>
                      </div>
                    </div>
                    {prog.notes && (
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{prog.notes}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </ScrollArea>

        {/* Bottom Navigation */}
        <div className="flex-shrink-0 pt-4 pb-6 border-t border-border">
          <div className="flex gap-3">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} className="flex-1">
                <ChevronLeft className="h-4 w-4 mr-1" />
                {step === 3 && currentEditIndex > 0 ? "上一個" : "上一步"}
              </Button>
            )}
            
            {step === 1 && (
              <Button 
                onClick={handleNext} 
                disabled={!canProceedFromStep1}
                className="flex-1"
              >
                下一步：填寫資料
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
            
            {step === 2 && (
              <Button onClick={handleNext} className="flex-1">
                下一步：填寫結果
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            )}
            
            {step === 3 && (
              <Button 
                onClick={handleNext} 
                disabled={!canProceedFromStep3}
                className="flex-1"
              >
                {currentEditIndex < selectedPrograms.length - 1 ? (
                  <>下一個<ChevronRight className="h-4 w-4 ml-1" /></>
                ) : (
                  <>確認送出<Check className="h-4 w-4 ml-1" /></>
                )}
              </Button>
            )}
            
            {step === 4 && (
              <Button onClick={handleSubmit} className="flex-1">
                <Check className="h-4 w-4 mr-1" />
                送出 {selectedPrograms.length} 筆結果
              </Button>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
