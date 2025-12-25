import { useState } from "react";
import { X, ChevronDown, Calendar, Check } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

interface AddAdmissionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const universities = [
  "Stanford University",
  "MIT",
  "Harvard University",
  "UC Berkeley",
  "Carnegie Mellon University",
  "UCLA",
  "Columbia University",
  "Yale University",
  "Princeton University",
  "其他"
];

const programs = [
  "MS Computer Science",
  "MS Electrical Engineering",
  "MS Data Science",
  "MS Machine Learning",
  "MBA",
  "PhD Computer Science",
  "PhD Economics",
  "LLM",
  "其他"
];

export function AddAdmissionSheet({ open, onOpenChange }: AddAdmissionSheetProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    university: "",
    program: "",
    result: "",
    isFinalChoice: false,
    gpa: "",
    toefl: "",
    gre: "",
    applicationDate: "",
    decisionDate: "",
    notes: ""
  });

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    // Mock submit
    onOpenChange(false);
    setStep(1);
    setFormData({
      university: "",
      program: "",
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

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] rounded-t-3xl">
        <SheetHeader className="pb-4 border-b border-border">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <SheetTitle>新增申請結果</SheetTitle>
            <div className="w-12" />
          </div>
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3].map((s) => (
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
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold">學校與科系</h3>
                <p className="text-sm text-muted-foreground mt-1">選擇你申請的學校和科系</p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>學校名稱</Label>
                  <Select 
                    value={formData.university} 
                    onValueChange={(v) => setFormData({ ...formData, university: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選擇學校" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((uni) => (
                        <SelectItem key={uni} value={uni}>{uni}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>科系 / Program</Label>
                  <Select 
                    value={formData.program} 
                    onValueChange={(v) => setFormData({ ...formData, program: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="選擇科系" />
                    </SelectTrigger>
                    <SelectContent>
                      {programs.map((prog) => (
                        <SelectItem key={prog} value={prog}>{prog}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
            </div>
          )}

          {/* Step 2: Stats */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
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

          {/* Step 3: Notes & Review */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
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
                      <span className="font-medium">{formData.university || "未填寫"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">科系</span>
                      <span className="font-medium">{formData.program || "未填寫"}</span>
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
          {step < 3 ? (
            <Button onClick={handleNext} className="flex-1">
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
