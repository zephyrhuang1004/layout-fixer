import { useState } from "react";
import { X, Image, Link, Bold, Italic, List, Hash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface WritePostSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const suggestedTags = ["申請心得", "GRE準備", "TOEFL", "選校策略", "SOP", "推薦信", "面試", "獎學金"];

export function WritePostSheet({ open, onOpenChange }: WritePostSheetProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else if (selectedTags.length < 3) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePublish = () => {
    // Mock publish
    onOpenChange(false);
    setTitle("");
    setContent("");
    setSelectedTags([]);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[95vh] flex flex-col p-0">
        <SheetHeader className="p-4 border-b border-border px-6">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
              取消
            </Button>
            <SheetTitle>撰寫文章</SheetTitle>
            <Button 
              size="sm" 
              disabled={!title.trim() || !content.trim()}
              onClick={handlePublish}
            >
              發布
            </Button>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          {/* Title */}
          <div className="px-4 py-4 border-b border-border">
            <Input
              placeholder="文章標題"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-0 text-xl font-semibold p-0 h-auto focus-visible:ring-0 placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Tags */}
          <div className="px-4 py-3 border-b border-border">
            <div className="flex items-center gap-2 mb-2">
              <Hash className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">選擇標籤（最多 3 個）</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {suggestedTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                    selectedTags.includes(tag)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="px-4 py-4">
            <Textarea
              placeholder="分享你的申請經歷、心得或建議..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border-0 min-h-[300px] p-0 focus-visible:ring-0 resize-none placeholder:text-muted-foreground/50"
            />
          </div>
        </div>

        {/* Toolbar */}
        <div className="border-t border-border p-3 flex items-center gap-1">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Image className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Link className="h-5 w-5" />
          </Button>
          <div className="w-px h-6 bg-border mx-2" />
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Bold className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <Italic className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <List className="h-5 w-5" />
          </Button>
          <div className="flex-1" />
          <span className="text-xs text-muted-foreground">{content.length} 字</span>
        </div>
      </SheetContent>
    </Sheet>
  );
}
