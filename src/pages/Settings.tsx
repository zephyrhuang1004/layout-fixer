import { 
  ChevronLeft, 
  ChevronRight,
  User,
  Bell,
  Lock,
  Eye,
  Palette,
  HelpCircle,
  FileText,
  LogOut,
  Moon,
  Globe
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const settingsGroups = [
  {
    title: "帳號",
    items: [
      { icon: User, label: "個人資料", description: "編輯你的公開資訊", hasArrow: true },
      { icon: Lock, label: "帳號安全", description: "密碼與登入設定", hasArrow: true },
      { icon: Eye, label: "隱私設定", description: "控制誰可以看到你的資料", hasArrow: true },
    ]
  },
  {
    title: "偏好設定",
    items: [
      { icon: Bell, label: "通知設定", description: "管理推播和電子郵件", hasArrow: true },
      { icon: Moon, label: "深色模式", description: "切換介面外觀", hasToggle: true },
      { icon: Globe, label: "語言", description: "繁體中文", hasArrow: true },
    ]
  },
  {
    title: "支援",
    items: [
      { icon: HelpCircle, label: "幫助中心", description: "常見問題與教學", hasArrow: true },
      { icon: FileText, label: "使用條款", description: "服務條款與隱私政策", hasArrow: true },
    ]
  }
];

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center px-4 h-14">
          <Button variant="ghost" size="icon" onClick={() => navigate("/profile")}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">設定</h1>
        </div>
      </header>

      <main className="pb-8">
        {/* User Card */}
        <div className="p-4">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border">
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face" />
              <AvatarFallback>王</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-semibold">王小明</p>
              <p className="text-sm text-muted-foreground truncate">ming.wang@example.com</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
          </div>
        </div>

        {/* Settings Groups */}
        {settingsGroups.map((group) => (
          <div key={group.title} className="px-4 mb-6">
            <h2 className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">
              {group.title}
            </h2>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {group.items.map((item, index) => (
                <button
                  key={item.label}
                  className={`w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors ${
                    index !== group.items.length - 1 ? "border-b border-border" : ""
                  }`}
                >
                  <div className="h-10 w-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground truncate">{item.description}</p>
                  </div>
                  {item.hasArrow && (
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0" />
                  )}
                  {item.hasToggle && (
                    <Switch />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout Button */}
        <div className="px-4">
          <Button variant="outline" className="w-full h-12 text-destructive hover:text-destructive hover:bg-destructive/10">
            <LogOut className="h-5 w-5 mr-2" />
            登出
          </Button>
        </div>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground mt-8">
          版本 1.0.0
        </p>
      </main>
    </div>
  );
}
