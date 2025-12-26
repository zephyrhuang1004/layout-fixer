import { useState } from "react";
import { Check, ChevronLeft, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface AdmissionData {
  id: number;
  university: string;
  program: string;
  degree?: string;
  result: string;
  isFinalChoice: boolean;
  scholarship?: string;
  notes?: string;
}

interface EditAdmissionSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  admission: AdmissionData | null;
  onSave?: (data: AdmissionData) => void;
  onDelete?: (id: number) => void;
}

export function EditAdmissionSheet({ 
  open, 
  onOpenChange, 
  admission,
  onSave,
  onDelete 
}: EditAdmissionSheetProps) {
  const [result, setResult] = useState(admission?.result || "");
  const [isFinalChoice, setIsFinalChoice] = useState(admission?.isFinalChoice || false);
  const [scholarship, setScholarship] = useState(admission?.scholarship || "none");
  const [notes, setNotes] = useState(admission?.notes || "");

  // Reset form when admission changes
  useState(() => {
    if (admission) {
      setResult(admission.result);
      setIsFinalChoice(admission.isFinalChoice);
      setScholarship(admission.scholarship || "none");
      setNotes(admission.notes || "");
    }
  });

  const handleSave = () => {
    if (admission && onSave) {
      onSave({
        ...admission,
        result,
        isFinalChoice,
        scholarship,
        notes
      });
    }
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (admission && onDelete) {
      onDelete(admission.id);
    }
    onOpenChange(false);
  };

  if (!admission) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl flex flex-col">
        <SheetHeader className="pb-4 border-b border-border flex-shrink-0">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              <ChevronLeft className="h-4 w-4 mr-1" />
              返回
            </Button>
            <SheetTitle>編輯申請結果</SheetTitle>
            <div className="w-16" />
          </div>
        </SheetHeader>

        <div className="flex-1 py-6 overflow-auto">
          <div className="space-y-6 px-1">
            {/* Program Info Card */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                {admission.degree && (
                  <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                    {admission.degree}
                  </span>
                )}
                <span className="font-semibold">{admission.program}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {admission.university}
              </p>
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
                    onClick={() => setResult(option.value)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      result === option.value
                        ? option.color + " border-current"
                        : "border-border hover:border-muted-foreground/30"
                    }`}
                  >
                    <span className="font-medium text-sm">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scholarship Selection */}
            {result === "admitted" && (
              <div className="space-y-2">
                <Label>獎學金</Label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "none", label: "無" },
                    { value: "full", label: "Full" },
                    { value: "partial", label: "Partial" },
                    { value: "ta", label: "TA" },
                    { value: "ra", label: "RA" }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setScholarship(option.value)}
                      className={`p-2.5 rounded-xl border-2 transition-all text-sm ${
                        scholarship === option.value
                          ? "bg-primary/10 border-primary text-primary"
                          : "border-border hover:border-muted-foreground/30"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Final Choice Toggle */}
            {result === "admitted" && (
              <div className="flex items-center justify-between p-4 rounded-xl bg-primary/5 border border-primary/20">
                <div>
                  <p className="font-medium text-sm">這是我的最終選擇</p>
                  <p className="text-xs text-muted-foreground">標記為你最終就讀的學校</p>
                </div>
                <Switch
                  checked={isFinalChoice}
                  onCheckedChange={setIsFinalChoice}
                />
              </div>
            )}

            {/* Notes */}
            <div className="space-y-2">
              <Label>備註（選填）</Label>
              <Textarea
                placeholder="面試心得、特殊經歷、獎學金資訊..."
                className="min-h-[120px]"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            {/* Current Status */}
            <div className="p-4 rounded-xl bg-muted/30">
              <p className="text-sm font-medium mb-2">目前狀態</p>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline"
                  className={
                    result === "admitted" ? "border-green-500/50 text-green-600" :
                    result === "waitlisted" ? "border-yellow-500/50 text-yellow-600" :
                    "border-red-500/50 text-red-600"
                  }
                >
                  {result === "admitted" ? "錄取" : result === "waitlisted" ? "備取" : "未錄取"}
                </Badge>
                {isFinalChoice && result === "admitted" && (
                  <Badge className="bg-primary/10 text-primary">最終選擇</Badge>
                )}
              </div>
            </div>

            {/* Delete Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full text-destructive border-destructive/30 hover:bg-destructive/10">
                  <Trash2 className="h-4 w-4 mr-2" />
                  刪除此筆結果
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>確定要刪除嗎？</AlertDialogTitle>
                  <AlertDialogDescription>
                    刪除後將無法復原。確定要刪除 {admission.university} - {admission.program} 的申請結果嗎？
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>取消</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    確定刪除
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        {/* Bottom Save Button */}
        <div className="flex-shrink-0 pt-4 pb-6 border-t border-border">
          <Button onClick={handleSave} className="w-full" disabled={!result}>
            <Check className="h-4 w-4 mr-2" />
            儲存變更
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
