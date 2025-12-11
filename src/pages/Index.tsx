import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, Share, Info, Users, GraduationCap, Award, ArrowRight, ArrowDownRight } from "lucide-react";
import { AdmissionReportCard, sampleAdmissionReports } from "@/components/AdmissionReportCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [activeTestTab, setActiveTestTab] = useState("toefl");
  const [activeFeedFilter, setActiveFeedFilter] = useState("all");

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-6 h-6 bg-primary rounded text-primary-foreground flex items-center justify-center font-semibold text-xs tracking-tighter shadow-sm group-hover:opacity-90 transition-opacity">
                A
              </div>
              <span className="font-semibold text-sm tracking-tight">
                Admit.io
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1 text-sm font-medium text-muted-foreground">
              <Link to="/schools" className="px-3 py-1.5 hover:text-foreground hover:bg-accent rounded-md transition-all">
                學校庫
              </Link>
              <a href="#" className="px-3 py-1.5 hover:text-foreground hover:bg-accent rounded-md transition-all">
                錄取案例
              </a>
              <a href="#" className="px-3 py-1.5 hover:text-foreground hover:bg-accent rounded-md transition-all">
                討論區
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="搜尋學校..."
                className="h-9 w-64 pl-9"
              />
            </div>
            <Button variant="ghost" size="sm">
              登入
            </Button>
            <Button size="sm">
              註冊
            </Button>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10">
          <div className="flex gap-5">
            <div className="w-20 h-20 bg-card border border-border rounded-xl flex items-center justify-center shadow-sm shrink-0">
              <span className="text-4xl font-serif font-bold tracking-tighter">
                C
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1 flex-wrap">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Columbia University
                </h1>
                <Badge variant="secondary" className="text-[10px]">
                  Private
                </Badge>
                <Badge variant="secondary" className="text-[10px] bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-50">
                  Ivy League
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                New York, NY • Engineering & Applied Science
              </p>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Plus className="w-3.5 h-3.5" />
                  追蹤學校
                </Button>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Share className="w-3.5 h-3.5" />
                  分享
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <Card className="flex gap-8 px-5 py-3 self-start">
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
                QS Ranking
              </span>
              <span className="text-xl font-semibold tracking-tight tabular-nums">
                #23
              </span>
            </div>
            <div className="w-px bg-border"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
                US News
              </span>
              <span className="text-xl font-semibold tracking-tight tabular-nums">
                #12
              </span>
            </div>
            <div className="w-px bg-border"></div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-wider font-medium text-muted-foreground">
                Tuition
              </span>
              <span className="text-xl font-semibold tracking-tight tabular-nums">
                $65k
                <span className="text-xs text-muted-foreground font-normal ml-0.5">/yr</span>
              </span>
            </div>
          </Card>
        </div>

        {/* Bento Grid Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Acceptance Rate */}
          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                官方錄取率
              </span>
              <Info className="w-3.5 h-3.5 text-muted-foreground/30 hover:text-muted-foreground cursor-help transition-colors" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold tracking-tight tabular-nums">
                3.9%
              </span>
              <Badge variant="destructive" className="gap-0.5 px-1.5 py-0.5 text-xs">
                <ArrowDownRight className="w-3 h-3" />
                0.2%
              </Badge>
            </div>
          </Card>

          {/* Platform Admits */}
          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                本站錄取回報
              </span>
              <Users className="w-3.5 h-3.5 text-muted-foreground/30" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-semibold tracking-tight tabular-nums">
                142
              </span>
              <span className="text-sm text-muted-foreground">/ 856 申請</span>
            </div>
            <div className="mt-3 flex gap-1 h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div className="bg-success h-full w-[16.6%] rounded-full" />
              <div className="bg-muted-foreground/30 h-full w-[10%] rounded-full" />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-[10px] text-success font-medium">
                16.6% 錄取
              </span>
              <span className="text-[10px] text-muted-foreground">樣本數充足</span>
            </div>
          </Card>

          {/* Avg GPA */}
          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                平均 GPA
              </span>
              <GraduationCap className="w-3.5 h-3.5 text-muted-foreground/30" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-semibold tracking-tight tabular-nums">
                3.85
              </span>
              <span className="text-sm text-muted-foreground">/ 4.0</span>
            </div>
            <div className="mt-3 relative h-6 w-full">
              <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-muted rounded-full" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[20%] right-[5%] h-1 bg-info/20 rounded-full" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[75%] w-2 h-2 bg-info rounded-full border-2 border-card shadow-sm z-10" />
              <div className="flex justify-between w-full text-[9px] text-muted-foreground absolute -bottom-1">
                <span>2.8</span>
                <span>4.0</span>
              </div>
            </div>
          </Card>

          {/* Scholarship */}
          <Card className="p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                獎學金比例
              </span>
              <Award className="w-3.5 h-3.5 text-muted-foreground/30" />
            </div>
            <div className="flex flex-col justify-end min-h-[60px]">
              <div className="flex items-baseline gap-2 mb-3">
                <span className="text-3xl font-semibold tracking-tight tabular-nums">
                  42.5%
                </span>
                <span className="text-sm text-muted-foreground">
                  獲得錄取獎學金
                </span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="bg-warning h-full w-[42.5%] rounded-full" />
              </div>
            </div>
          </Card>
        </section>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            {/* Program Stats */}
            <Card className="overflow-hidden">
              <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-accent/50">
                <h3 className="text-sm font-semibold">
                  熱門科系錄取數據
                </h3>
                <a href="#" className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                  查看全部
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
              <div className="divide-y divide-border/50">
                {[
                  { name: "Computer Science", degree: "MS", admitted: 52, total: 281, rate: 18.5 },
                  { name: "Electrical Engineering", degree: "MS", admitted: 38, total: 170, rate: 22.3 },
                  { name: "Data Science", degree: "MS", admitted: 16, total: 100, rate: 16.0 },
                ].map((program) => (
                  <div key={program.name} className="px-5 py-3 hover:bg-accent transition-colors group">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">
                          {program.name}
                        </span>
                        <Badge variant="secondary" className="text-[9px] font-semibold">
                          {program.degree}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground tabular-nums">
                          {program.admitted} 錄取 / {program.total} 申請
                        </span>
                        <span className="text-sm font-semibold tabular-nums w-12 text-right">
                          {program.rate}%
                        </span>
                      </div>
                    </div>
                    <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full group-hover:bg-info transition-colors"
                        style={{ width: `${program.rate}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Feed Header */}
            <div className="flex items-center justify-between pt-4">
              <h2 className="text-lg font-semibold tracking-tight">
                最新錄取回報
              </h2>

              <Tabs value={activeFeedFilter} onValueChange={setActiveFeedFilter} className="w-auto">
                <TabsList className="h-8">
                  <TabsTrigger value="all" className="text-xs">全部</TabsTrigger>
                  <TabsTrigger value="cs" className="text-xs">MS CS</TabsTrigger>
                  <TabsTrigger value="ee" className="text-xs">MS EE</TabsTrigger>
                  <TabsTrigger value="mba" className="text-xs">MBA</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Admission Cards */}
            <div className="space-y-4">
              {sampleAdmissionReports.map((report, index) => (
                <AdmissionReportCard 
                  key={index} 
                  report={report} 
                  currentSchool="Columbia University" 
                />
              ))}

              <Button variant="outline" className="w-full">
                載入更多錄取回報
              </Button>
            </div>
          </div>

          {/* Right Column */}
          <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-20 lg:self-start">
            {/* Test Scores */}
            <Card className="p-5">
              <h3 className="text-sm font-semibold mb-4">
                檢定成績分佈
              </h3>

              <Tabs value={activeTestTab} onValueChange={setActiveTestTab}>
                <TabsList className="w-full mb-5 grid grid-cols-4">
                  <TabsTrigger value="toefl" className="text-[11px]">TOEFL</TabsTrigger>
                  <TabsTrigger value="ielts" className="text-[11px]">IELTS</TabsTrigger>
                  <TabsTrigger value="gre" className="text-[11px]">GRE</TabsTrigger>
                  <TabsTrigger value="gmat" className="text-[11px]">GMAT</TabsTrigger>
                </TabsList>

                <TabsContent value="toefl" className="mt-0">
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-bold tracking-tighter tabular-nums">
                      108
                    </span>
                    <span className="text-xs text-muted-foreground mb-1.5">
                      中位數 (Total 120)
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="relative h-8 w-full">
                      <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-muted rounded-full" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-[15%] w-[70%] h-1.5 bg-info/20 rounded-full" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-[60%] w-3 h-3 bg-info border-2 border-card shadow-sm rounded-full z-10" />
                      <div className="absolute -bottom-1 left-0 text-[9px] text-muted-foreground">80</div>
                      <div className="absolute -bottom-1 right-0 text-[9px] text-muted-foreground">120</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { label: "Reading", score: 28 },
                        { label: "Listening", score: 27 },
                        { label: "Speaking", score: 24 },
                        { label: "Writing", score: 26 },
                      ].map((section) => (
                        <div key={section.label} className="p-2 bg-accent rounded border border-border flex justify-between">
                          <span className="text-muted-foreground">{section.label}</span>
                          <span className="font-medium tabular-nums">{section.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="ielts" className="mt-0">
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-bold tracking-tighter tabular-nums">
                      7.5
                    </span>
                    <span className="text-xs text-muted-foreground mb-1.5">
                      中位數 (Total 9.0)
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="relative h-8 w-full">
                      <div className="absolute top-1/2 -translate-y-1/2 w-full h-1.5 bg-muted rounded-full" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-[50%] w-[40%] h-1.5 bg-info/20 rounded-full" />
                      <div className="absolute top-1/2 -translate-y-1/2 left-[72%] w-3 h-3 bg-info border-2 border-card shadow-sm rounded-full z-10" />
                      <div className="absolute -bottom-1 left-0 text-[9px] text-muted-foreground">5.0</div>
                      <div className="absolute -bottom-1 right-0 text-[9px] text-muted-foreground">9.0</div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { label: "Reading", score: 8.0 },
                        { label: "Listening", score: 7.5 },
                        { label: "Speaking", score: 7.0 },
                        { label: "Writing", score: 7.5 },
                      ].map((section) => (
                        <div key={section.label} className="p-2 bg-accent rounded border border-border flex justify-between">
                          <span className="text-muted-foreground">{section.label}</span>
                          <span className="font-medium tabular-nums">{section.score}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="gre" className="mt-0">
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-bold tracking-tighter tabular-nums">
                      328
                    </span>
                    <span className="text-xs text-muted-foreground mb-1.5">
                      中位數 (Total 340)
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Quant</span>
                        <span className="font-medium tabular-nums">167 / 170</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="bg-success h-full w-[95%] rounded-full" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Verbal</span>
                        <span className="font-medium tabular-nums">160 / 170</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="bg-info h-full w-[70%] rounded-full" />
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="gmat" className="mt-0">
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-4xl font-bold tracking-tighter tabular-nums">
                      720
                    </span>
                    <span className="text-xs text-muted-foreground mb-1.5">
                      中位數 (Total 800)
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Quant</span>
                        <span className="font-medium tabular-nums">49 / 51</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="bg-success h-full w-[96%] rounded-full" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Verbal</span>
                        <span className="font-medium tabular-nums">41 / 51</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="bg-info h-full w-[80%] rounded-full" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">AWA</span>
                        <span className="font-medium tabular-nums">5.5 / 6.0</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="bg-warning h-full w-[92%] rounded-full" />
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>

            {/* School Sources */}
            <Card className="p-5">
              <h3 className="text-sm font-semibold mb-3">
                錄取者來自學校
              </h3>
              <div className="space-y-3">
                {[
                  { abbr: "NT", name: "National Taiwan U.", count: 28, percentage: 35 },
                  { abbr: "TH", name: "Tsinghua Univ.", count: 22, percentage: 28 },
                  { abbr: "PK", name: "Peking Univ.", count: 18, percentage: 20 },
                  { abbr: "IB", name: "IIT Bombay", count: 15, percentage: 16 },
                ].map((school) => (
                  <div key={school.abbr} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded flex items-center justify-center bg-muted text-[10px] font-bold text-muted-foreground">
                      {school.abbr}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="truncate w-32">{school.name}</span>
                        <span className="font-medium tabular-nums">{school.count}</span>
                      </div>
                      <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                        <div className="bg-primary h-full rounded-full" style={{ width: `${school.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-4 text-xs text-muted-foreground hover:text-foreground py-1 transition-colors border-t border-border pt-2">
                查看全部 45 所學校
              </button>
            </Card>

            {/* Simultaneous Offers */}
            <Card className="p-5">
              <h3 className="text-sm font-semibold mb-1">
                同時獲得 Offer
              </h3>
              <p className="text-[11px] text-muted-foreground mb-3">
                錄取者最常同時被哪些學校錄取
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "CMU", count: 42 },
                  { name: "UC Berkeley", count: 38 },
                  { name: "UCLA", count: 35 },
                  { name: "NYU", count: 28 },
                ].map((school) => (
                  <Badge key={school.name} variant="outline" className="gap-1.5 hover:border-border/80">
                    {school.name}
                    <span className="text-[10px] text-success font-medium bg-success/10 px-1 rounded">
                      {school.count}
                    </span>
                  </Badge>
                ))}
              </div>
            </Card>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <span className="font-semibold text-sm tracking-tight block mb-1">
              Admit.io
            </span>
            <p className="text-xs text-muted-foreground">
              © 2024 Admit.io. 數據由用戶貢獻，僅供參考。
            </p>
          </div>
          <div className="flex gap-6 text-xs text-muted-foreground font-medium">
            <a href="#" className="hover:text-foreground transition-colors">
              隱私權條款
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              使用規範
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              聯絡我們
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
