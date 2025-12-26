import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  FileText, 
  Bookmark, 
  PlusCircle, 
  Settings,
  MapPin,
  GraduationCap,
  Calendar,
  ChevronRight,
  Edit3,
  Heart,
  MessageCircle,
  Eye
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AddAdmissionSheet } from "@/components/AddAdmissionSheet";
import { WritePostSheet } from "@/components/WritePostSheet";
import { EditProfileSheet } from "@/components/EditProfileSheet";
import { EditAdmissionSheet } from "@/components/EditAdmissionSheet";

type TabType = "profile" | "report" | "posts" | "saved";

// Mock user data
const mockUser = {
  name: "王小明",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  bio: "台大資工系畢業，目前在 Stanford CS MS 就讀中 🎓",
  location: "Palo Alto, CA",
  school: "國立台灣大學",
  major: "資訊工程學系",
  graduationYear: "2024",
  stats: {
    posts: 12,
    saved: 28,
    views: 1520
  }
};

// Mock admission results
const mockAdmissions = [
  {
    id: 1,
    university: "Stanford University",
    program: "MS Computer Science",
    result: "admitted",
    isFinalChoice: true
  },
  {
    id: 2,
    university: "MIT",
    program: "MS EECS",
    result: "admitted",
    isFinalChoice: false
  },
  {
    id: 3,
    university: "UC Berkeley",
    program: "MS Computer Science",
    result: "waitlisted",
    isFinalChoice: false
  },
  {
    id: 4,
    university: "CMU",
    program: "MS Machine Learning",
    result: "rejected",
    isFinalChoice: false
  }
];

// Mock posts
const mockPosts = [
  {
    id: 1,
    title: "Stanford CS MS 申請心得分享",
    excerpt: "從準備到錄取的完整時程規劃...",
    likes: 234,
    comments: 45,
    createdAt: "2024-03-15"
  },
  {
    id: 2,
    title: "GRE 準備攻略：兩個月從 310 到 330",
    excerpt: "分享我的備考方法和資源...",
    likes: 189,
    comments: 32,
    createdAt: "2024-02-20"
  }
];

// Mock saved items
const mockSaved = [
  {
    id: 1,
    type: "admission",
    title: "UCLA CS PhD 錄取分享",
    author: "李同學",
    savedAt: "2024-03-10"
  },
  {
    id: 2,
    type: "post",
    title: "如何寫出吸引教授的 SOP",
    author: "陳同學",
    savedAt: "2024-03-08"
  },
  {
    id: 3,
    type: "admission",
    title: "Harvard MBA 申請全記錄",
    author: "張同學",
    savedAt: "2024-03-05"
  }
];

const getResultBadgeStyle = (result: string) => {
  switch (result) {
    case "admitted":
      return "bg-green-500/10 text-green-600 border-green-500/20";
    case "waitlisted":
      return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
    case "rejected":
      return "bg-red-500/10 text-red-600 border-red-500/20";
    default:
      return "bg-muted text-muted-foreground";
  }
};

const getResultText = (result: string) => {
  switch (result) {
    case "admitted":
      return "錄取";
    case "waitlisted":
      return "備取";
    case "rejected":
      return "未錄取";
    default:
      return result;
  }
};

export default function UserProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [showAddAdmission, setShowAddAdmission] = useState(false);
  const [showWritePost, setShowWritePost] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showEditAdmission, setShowEditAdmission] = useState(false);
  const [editingAdmission, setEditingAdmission] = useState<typeof mockAdmissions[0] | null>(null);

  const handleEditAdmission = (admission: typeof mockAdmissions[0]) => {
    setEditingAdmission(admission);
    setShowEditAdmission(true);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 h-14">
          <h1 className="text-lg font-semibold">我的頁面</h1>
          <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as TabType)} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="profile" className="text-xs">個人資料</TabsTrigger>
            <TabsTrigger value="report" className="text-xs">回報結果</TabsTrigger>
            <TabsTrigger value="posts" className="text-xs">我的文章</TabsTrigger>
            <TabsTrigger value="saved" className="text-xs">收藏</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            {/* Profile Card */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-20 w-20 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback>{mockUser.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold truncate">{mockUser.name}</h2>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => setShowEditProfile(true)}>
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{mockUser.bio}</p>
                </div>
              </div>

              {/* User Info */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{mockUser.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <GraduationCap className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">{mockUser.school} · {mockUser.major}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="text-muted-foreground">Class of {mockUser.graduationYear}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-border">
                <div className="text-center">
                  <p className="text-2xl font-bold">{mockUser.stats.posts}</p>
                  <p className="text-xs text-muted-foreground">文章</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{mockUser.stats.saved}</p>
                  <p className="text-xs text-muted-foreground">收藏</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{mockUser.stats.views.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">瀏覽</p>
                </div>
              </div>
            </Card>

            {/* Admission Results Summary */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">申請成果</h3>
                <Button variant="ghost" size="sm" className="text-primary">
                  查看全部 <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              <div className="space-y-3">
                {mockAdmissions.map((admission) => (
                  <Card 
                    key={admission.id} 
                    className={`p-4 ${admission.isFinalChoice ? 'ring-2 ring-primary/50 bg-primary/5' : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{admission.university}</p>
                          {admission.isFinalChoice && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary text-xs shrink-0">
                              最終選擇
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{admission.program}</p>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={`shrink-0 ml-3 ${getResultBadgeStyle(admission.result)}`}
                      >
                        {getResultText(admission.result)}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Report Tab */}
          <TabsContent value="report" className="space-y-6">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <PlusCircle className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">回報申請結果</h3>
              <p className="text-sm text-muted-foreground mb-4">
                分享你的申請經歷，幫助更多學弟妹
              </p>
              <Button className="w-full" onClick={() => setShowAddAdmission(true)}>
                <PlusCircle className="h-4 w-4 mr-2" />
                新增申請結果
              </Button>
            </Card>

            {/* Already reported */}
            <div>
              <h3 className="font-semibold mb-4">已回報的結果</h3>
              <div className="space-y-3">
                {mockAdmissions.map((admission) => (
                  <Card key={admission.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium truncate">{admission.university}</p>
                          {admission.isFinalChoice && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary text-xs shrink-0">
                              最終選擇
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{admission.program}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <Badge 
                          variant="outline" 
                          className={getResultBadgeStyle(admission.result)}
                        >
                          {getResultText(admission.result)}
                        </Badge>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => handleEditAdmission(admission)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Posts Tab */}
          <TabsContent value="posts" className="space-y-6">
            <Button className="w-full" variant="outline" onClick={() => setShowWritePost(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              撰寫新文章
            </Button>

            <div className="space-y-4">
              {mockPosts.map((post) => (
                <Card key={post.id} className="p-4">
                  <h4 className="font-medium line-clamp-2 mb-2">{post.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Heart className="h-4 w-4" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" /> {post.comments}
                      </span>
                    </div>
                    <span>{post.createdAt}</span>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Saved Tab */}
          <TabsContent value="saved" className="space-y-6">
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4">
              <Button variant="secondary" size="sm" className="shrink-0">全部</Button>
              <Button variant="ghost" size="sm" className="shrink-0">錄取案例</Button>
              <Button variant="ghost" size="sm" className="shrink-0">文章</Button>
            </div>

            <div className="space-y-3">
              {mockSaved.map((item) => (
                <Card key={item.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      item.type === 'admission' ? 'bg-green-500/10' : 'bg-blue-500/10'
                    }`}>
                      {item.type === 'admission' ? (
                        <GraduationCap className={`h-5 w-5 text-green-600`} />
                      ) : (
                        <FileText className={`h-5 w-5 text-blue-600`} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium line-clamp-2">{item.title}</p>
                      <p className="text-sm text-muted-foreground">by {item.author}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0 text-primary">
                      <Bookmark className="h-4 w-4 fill-current" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Bottom Tab Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border safe-area-inset-bottom">
        <div className="grid grid-cols-4 h-16">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "profile" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <User className="h-5 w-5" />
            <span className="text-xs">個人</span>
          </button>
          <button 
            onClick={() => setActiveTab("report")}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "report" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <PlusCircle className="h-5 w-5" />
            <span className="text-xs">回報</span>
          </button>
          <button 
            onClick={() => setActiveTab("posts")}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "posts" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <FileText className="h-5 w-5" />
            <span className="text-xs">文章</span>
          </button>
          <button 
            onClick={() => setActiveTab("saved")}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              activeTab === "saved" ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <Bookmark className="h-5 w-5" />
            <span className="text-xs">收藏</span>
          </button>
        </div>
      </nav>

      {/* Sheets */}
      <AddAdmissionSheet open={showAddAdmission} onOpenChange={setShowAddAdmission} />
      <WritePostSheet open={showWritePost} onOpenChange={setShowWritePost} />
      <EditProfileSheet 
        open={showEditProfile} 
        onOpenChange={setShowEditProfile}
        initialData={{
          name: mockUser.name,
          avatar: mockUser.avatar,
          bio: mockUser.bio,
          location: mockUser.location,
          school: mockUser.school,
          major: mockUser.major,
          graduationYear: mockUser.graduationYear
        }}
      />
      <EditAdmissionSheet
        open={showEditAdmission}
        onOpenChange={setShowEditAdmission}
        admission={editingAdmission}
      />
    </div>
  );
}
