import { useState } from "react";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

interface EditProfileSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialData: {
    name: string;
    avatar: string;
    bio: string;
    location: string;
    school: string;
    major: string;
    graduationYear: string;
  };
}

const schools = [
  "國立台灣大學",
  "國立清華大學", 
  "國立交通大學",
  "國立成功大學",
  "國立政治大學",
  "國立台灣師範大學",
  "其他"
];

const years = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];

export function EditProfileSheet({ open, onOpenChange, initialData }: EditProfileSheetProps) {
  const [formData, setFormData] = useState(initialData);

  const handleSave = () => {
    // Mock save
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[90vh] flex flex-col px-6">
        <SheetHeader className="pb-4 border-b border-border px-0">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <SheetTitle>編輯個人資料</SheetTitle>
            <Button size="sm" onClick={handleSave}>
              儲存
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={formData.avatar} alt={formData.name} />
                <AvatarFallback>{formData.name[0]}</AvatarFallback>
              </Avatar>
              <button className="absolute bottom-0 right-0 h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <Button variant="link" size="sm" className="text-primary">
              更換頭像
            </Button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>暱稱</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="你的暱稱"
              />
            </div>

            <div className="space-y-2">
              <Label>個人簡介</Label>
              <Textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="簡單介紹一下自己..."
                className="min-h-[80px]"
              />
              <p className="text-xs text-muted-foreground text-right">{formData.bio.length}/150</p>
            </div>

            <div className="space-y-2">
              <Label>目前所在地</Label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="例：Palo Alto, CA"
              />
            </div>

            <div className="space-y-2">
              <Label>畢業學校</Label>
              <Select 
                value={formData.school} 
                onValueChange={(v) => setFormData({ ...formData, school: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇學校" />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school} value={school}>{school}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>主修科系</Label>
              <Input
                value={formData.major}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                placeholder="例：資訊工程學系"
              />
            </div>

            <div className="space-y-2">
              <Label>畢業年份</Label>
              <Select 
                value={formData.graduationYear} 
                onValueChange={(v) => setFormData({ ...formData, graduationYear: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="選擇年份" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>{year}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
