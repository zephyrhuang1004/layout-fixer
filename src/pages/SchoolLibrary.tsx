import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, MapPin, GraduationCap, Users, TrendingUp, Globe, Building2, Sparkles, Filter } from "lucide-react";
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
    programs: ["MBA", "MS Engineering", "MS CS"],
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
    programs: ["MBA", "MS Finance", "MMS"],
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
    location: "Fontainebleau",
    country: "法國",
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
    programs: ["MBA", "EMBA", "PhD"],
    acceptanceRate: 22.5,
    avgGPA: 3.75,
    totalReports: 134,
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=250&fit=crop"
  },
  {
    id: "hec-paris",
    name: "HEC Paris",
    location: "Paris",
    country: "法國",
    ranking: 7,
    programs: ["MBA", "MiM", "MS Marketing"],
    acceptanceRate: 20.5,
    avgGPA: 3.58,
    totalReports: 87,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=250&fit=crop"
  },
  {
    id: "oxford-said",
    name: "Oxford Saïd",
    location: "Oxford",
    country: "英國",
    ranking: 9,
    programs: ["MBA", "MFE", "EMBA"],
    acceptanceRate: 18.7,
    avgGPA: 3.65,
    totalReports: 76,
    image: "https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=400&h=250&fit=crop"
  },
  {
    id: "cambridge-judge",
    name: "Cambridge Judge",
    location: "Cambridge",
    country: "英國",
    ranking: 10,
    programs: ["MBA", "MFin", "EMBA"],
    acceptanceRate: 21.3,
    avgGPA: 3.62,
    totalReports: 68,
    image: "https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=400&h=250&fit=crop"
  },
  {
    id: "yale-som",
    name: "Yale SOM",
    location: "New Haven, CT",
    country: "美國",
    ranking: 11,
    programs: ["MBA", "MAM", "EMBA"],
    acceptanceRate: 17.8,
    avgGPA: 3.71,
    totalReports: 92,
    image: "https://images.unsplash.com/photo-1569447891824-7a1758aa73a2?w=400&h=250&fit=crop"
  },
  {
    id: "nyu-stern",
    name: "NYU Stern",
    location: "New York, NY",
    country: "美國",
    ranking: 13,
    programs: ["MBA", "MS Finance", "MS Data"],
    acceptanceRate: 23.4,
    avgGPA: 3.52,
    totalReports: 143,
    image: "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=400&h=250&fit=crop"
  },
  {
    id: "berkeley-haas",
    name: "Berkeley Haas",
    location: "Berkeley, CA",
    country: "美國",
    ranking: 14,
    programs: ["MBA", "MFE", "EMBA"],
    acceptanceRate: 12.8,
    avgGPA: 3.68,
    totalReports: 121,
    image: "https://images.unsplash.com/photo-1521747116042-5a810fda9664?w=400&h=250&fit=crop"
  },
  {
    id: "northwestern-kellogg",
    name: "Northwestern Kellogg",
    location: "Evanston, IL",
    country: "美國",
    ranking: 15,
    programs: ["MBA", "EMBA", "MMS"],
    acceptanceRate: 20.1,
    avgGPA: 3.73,
    totalReports: 156,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=400&h=250&fit=crop"
  },
  {
    id: "ie-business-school",
    name: "IE Business School",
    location: "Madrid",
    country: "西班牙",
    ranking: 16,
    programs: ["MBA", "MiM", "MIF"],
    acceptanceRate: 32.5,
    avgGPA: 3.45,
    totalReports: 64,
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=250&fit=crop"
  },
];

const filters = [
  { label: "全部", icon: Sparkles, active: true },
  { label: "美國", icon: Globe, active: false },
  { label: "英國", icon: Globe, active: false },
  { label: "歐洲", icon: Globe, active: false },
  { label: "亞洲", icon: Globe, active: false },
  { label: "MBA", icon: GraduationCap, active: false },
  { label: "MiM", icon: GraduationCap, active: false },
  { label: "MS Finance", icon: Building2, active: false },
];

const SchoolLibrary = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/20">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-card/60 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                留學資料庫
              </Link>
              <div className="hidden md:flex items-center gap-6">
                <Link to="/schools" className="text-sm font-medium text-primary">學校庫</Link>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">排名</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">錄取回報</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">討論區</a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">登入</Button>
              <Button size="sm" className="shadow-lg shadow-primary/25">註冊</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/10" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            探索 100+ 頂尖學校
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight">
            找到你的夢想學校
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            瀏覽全球頂尖商學院的錄取數據、申請經驗分享，幫助你做出最佳選擇
          </p>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input 
              placeholder="搜尋學校名稱、地區或專業..." 
              className="pl-14 h-14 text-base rounded-2xl border-border/50 bg-card/80 backdrop-blur-sm shadow-xl shadow-primary/5"
            />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl">
              搜尋
            </Button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <section className="border-y border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">100+</div>
              <div className="text-sm text-muted-foreground mt-1">收錄學校</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">1,500+</div>
              <div className="text-sm text-muted-foreground mt-1">錄取回報</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">30+</div>
              <div className="text-sm text-muted-foreground mt-1">國家地區</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">50+</div>
              <div className="text-sm text-muted-foreground mt-1">專業項目</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-16 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            <div className="flex items-center gap-2 text-muted-foreground mr-2">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium whitespace-nowrap">篩選：</span>
            </div>
            {filters.map((filter) => (
              <button
                key={filter.label}
                className={`
                  inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
                  ${filter.active 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                    : 'bg-card border border-border hover:border-primary/50 hover:bg-primary/5 text-foreground'
                  }
                `}
              >
                <filter.icon className="w-4 h-4" />
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* School Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            顯示 <span className="font-semibold text-foreground">{schools.length}</span> 所學校
          </p>
          <select className="px-4 py-2 rounded-lg border border-border bg-card text-sm">
            <option>依排名排序</option>
            <option>依錄取率排序</option>
            <option>依回報數排序</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {schools.map((school) => (
            <Link key={school.id} to={`/school/${school.id}`}>
              <Card className="h-full overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col border-border/50 bg-card/80 backdrop-blur-sm">
                <div className="aspect-[16/10] relative overflow-hidden flex-shrink-0">
                  <img 
                    src={school.image} 
                    alt={school.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-foreground text-xs font-bold shadow-lg">
                      #{school.ranking}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bold text-white text-lg drop-shadow-lg">
                      {school.name}
                    </h3>
                    <div className="flex items-center gap-1 text-white/90 text-sm mt-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{school.location}</span>
                      <span className="mx-1">·</span>
                      <span>{school.country}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-1.5 mb-4 min-h-[28px]">
                    {school.programs.map((program) => (
                      <span 
                        key={program} 
                        className="inline-flex items-center px-2 py-0.5 rounded bg-secondary/80 text-secondary-foreground text-xs font-medium"
                      >
                        {program}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/50 mt-auto">
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-0.5">錄取率</div>
                      <div className="text-sm font-bold text-primary">{school.acceptanceRate}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-0.5">GPA</div>
                      <div className="text-sm font-bold text-foreground">{school.avgGPA}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-muted-foreground mb-0.5">回報</div>
                      <div className="text-sm font-bold text-foreground">{school.totalReports}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-card/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-muted-foreground">
          © 2024 留學資料庫. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default SchoolLibrary;
