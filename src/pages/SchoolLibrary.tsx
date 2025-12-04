import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, MapPin, GraduationCap, Users, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const schools = [
  {
    id: "columbia-university",
    name: "Columbia University",
    location: "New York, NY",
    country: "美國",
    ranking: 12,
    programs: ["MBA", "MS Finance", "MS Marketing"],
    acceptanceRate: 15.2,
    avgGPA: 3.7,
    totalReports: 156,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
  },
  {
    id: "harvard-university",
    name: "Harvard University",
    location: "Cambridge, MA",
    country: "美國",
    ranking: 3,
    programs: ["MBA", "MPA", "MS Data Science"],
    acceptanceRate: 11.8,
    avgGPA: 3.85,
    totalReports: 203,
    image: "https://images.unsplash.com/photo-1559135197-8a45ea74d367?w=400&h=250&fit=crop"
  },
  {
    id: "stanford-university",
    name: "Stanford University",
    location: "Stanford, CA",
    country: "美國",
    ranking: 5,
    programs: ["MBA", "MS Engineering", "MS Computer Science"],
    acceptanceRate: 6.9,
    avgGPA: 3.9,
    totalReports: 189,
    image: "https://images.unsplash.com/photo-1574958269340-fa927503f3dd?w=400&h=250&fit=crop"
  },
  {
    id: "mit",
    name: "MIT Sloan",
    location: "Cambridge, MA",
    country: "美國",
    ranking: 4,
    programs: ["MBA", "MS Finance", "MS Management Studies"],
    acceptanceRate: 13.5,
    avgGPA: 3.78,
    totalReports: 145,
    image: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400&h=250&fit=crop"
  },
  {
    id: "london-business-school",
    name: "London Business School",
    location: "London",
    country: "英國",
    ranking: 8,
    programs: ["MBA", "MiM", "MS Finance"],
    acceptanceRate: 24.3,
    avgGPA: 3.6,
    totalReports: 98,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=250&fit=crop"
  },
  {
    id: "insead",
    name: "INSEAD",
    location: "Fontainebleau / Singapore",
    country: "法國/新加坡",
    ranking: 6,
    programs: ["MBA", "EMBA", "MiM"],
    acceptanceRate: 28.1,
    avgGPA: 3.55,
    totalReports: 112,
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=250&fit=crop"
  },
  {
    id: "wharton",
    name: "Wharton School",
    location: "Philadelphia, PA",
    country: "美國",
    ranking: 1,
    programs: ["MBA", "MS Finance", "PhD"],
    acceptanceRate: 19.2,
    avgGPA: 3.82,
    totalReports: 178,
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop"
  },
  {
    id: "chicago-booth",
    name: "Chicago Booth",
    location: "Chicago, IL",
    country: "美國",
    ranking: 2,
    programs: ["MBA", "Executive MBA", "PhD"],
    acceptanceRate: 22.5,
    avgGPA: 3.75,
    totalReports: 134,
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=250&fit=crop"
  },
];

const SchoolLibrary = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-xl font-bold text-primary">留學資料庫</Link>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/schools" className="text-sm font-medium text-primary">學校庫</Link>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">排名</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">錄取回報</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">討論區</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">登入</Button>
              <Button size="sm">註冊</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">探索全球頂尖商學院</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            瀏覽超過 100+ 所商學院的錄取數據、申請經驗分享，幫助你做出最佳選擇
          </p>
          <div className="max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="搜尋學校名稱、地區或專業..." 
              className="pl-12 h-12 text-base"
            />
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">100+</div>
              <div className="text-sm text-muted-foreground">收錄學校</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">1,500+</div>
              <div className="text-sm text-muted-foreground">錄取回報</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">30+</div>
              <div className="text-sm text-muted-foreground">國家地區</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">專業項目</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">全部</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">美國</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">英國</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">歐洲</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">亞洲</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">MBA</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">MiM</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-secondary">MS Finance</Badge>
          </div>
        </div>
      </section>

      {/* School Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {schools.map((school) => (
            <Link key={school.id} to={`/school/${school.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                <div className="aspect-video relative overflow-hidden">
                  <img 
                    src={school.image} 
                    alt={school.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-primary/90 text-primary-foreground">
                      #{school.ranking} 排名
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {school.name}
                  </h3>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{school.location}</span>
                    <span className="mx-1">·</span>
                    <span>{school.country}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {school.programs.slice(0, 3).map((program) => (
                      <Badge key={program} variant="outline" className="text-xs">
                        {program}
                      </Badge>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-0.5">
                        <TrendingUp className="w-3 h-3" />
                        錄取率
                      </div>
                      <div className="text-sm font-medium text-foreground">{school.acceptanceRate}%</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-0.5">
                        <GraduationCap className="w-3 h-3" />
                        GPA
                      </div>
                      <div className="text-sm font-medium text-foreground">{school.avgGPA}</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground mb-0.5">
                        <Users className="w-3 h-3" />
                        回報
                      </div>
                      <div className="text-sm font-medium text-foreground">{school.totalReports}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          © 2024 留學資料庫. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SchoolLibrary;
