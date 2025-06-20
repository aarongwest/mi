# Motion Industries EHS Dashboard

A comprehensive Environmental, Health & Safety (EHS) analytics dashboard built for Motion Industries, showcasing injury and illness statistics based on NAICS codes 423830 (Industrial Machinery and Equipment Merchant Wholesalers) and 423840 (Industrial Supplies Merchant Wholesalers).

## 🚀 Features

- **Real-time EHS Analytics** - Interactive visualizations of injury and illness trends
- **GitHub-style Heatmap** - Monthly incident activity visualization
- **Prevention Recommendations** - Evidence-based safety improvement suggestions
- **Professional Design** - Clean, white interface with Motion Industries branding
- **Responsive Layout** - Optimized for desktop and mobile viewing
- **Data-driven Insights** - Based on Bureau of Labor Statistics (BLS) data

## 📊 Dashboard Components

### Injury & Illness Trends
- Stacked area chart showing trends over time per 100 FTE
- Categories: Total Cases, Days Away, Restricted Work

### Injury Types Distribution
- Interactive pie chart breaking down injury types
- Categories: Strains/Sprains, Cuts/Lacerations, Bruises/Contusions, Fractures, Burns, Other

### Affected Body Parts Analysis
- Horizontal bar chart showing most affected body parts
- Data-driven prioritization for prevention efforts

### Monthly Incident Activity
- GitHub-style contribution heatmap
- Visual representation of incident frequency patterns

### EHS Prevention Recommendations
- Categorized by priority level (High/Medium)
- Four key areas: Ergonomic Improvements, Cut Prevention, Slip/Trip/Fall Prevention, Training & Culture

## 🛠️ Built With

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Data Source**: Bureau of Labor Statistics (BLS)

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/motion-ehs-dashboard.git
cd motion-ehs-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📈 Data Sources

- **NAICS Codes**: 423830, 423840
- **Statistics Source**: Bureau of Labor Statistics (BLS) Survey of Occupational Injuries and Illnesses
- **Industry Focus**: Industrial Distribution and Equipment Wholesaling

## 🏢 Motion Industries

Motion Industries is a leading distributor of maintenance, repair, and operation (MRO) and automation solutions. With over 550 locations and 9,000+ employees, Motion Industries is committed to workplace safety and continuous improvement in EHS performance.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
motion-ehs-dashboard/
├── src/
│   └── app/
│       ├── page.tsx          # Main dashboard component
│       ├── layout.tsx        # Root layout
│       └── globals.css       # Global styles
├── public/
│   └── logo.png             # Motion Industries logo
├── package.json
└── README.md
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

### Manual Build

```bash
npm run build
npm run start
```

## 📝 License

This project is created for demonstration purposes for Motion Industries EHS analytics.

## 🤝 Contributing

This dashboard was created as a demonstration of EHS analytics capabilities. For production use, please ensure data accuracy and compliance with your organization's reporting requirements.

---

**Note**: This dashboard uses mock data based on industry averages. For production deployment, integrate with your actual EHS data sources and ensure data accuracy and compliance with organizational reporting standards.
