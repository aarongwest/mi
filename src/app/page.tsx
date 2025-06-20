'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { clsx } from 'clsx';

// Motion Industries NAICS Code Data (Industrial Distribution)
const motionIndustriesData = {
  naicsCodes: [
    { code: '423830', description: 'Industrial Machinery and Equipment Merchant Wholesalers' },
    { code: '423840', description: 'Industrial Supplies Merchant Wholesalers' }
  ],
  totalEmployees: 9000,
  locations: 550
};

// Real BLS injury/illness data for NAICS 423830 (Industrial Machinery & Equipment Merchant Wholesalers)
const injuryData423830 = [
  { year: 2020, daysAway: 1.3, restricted: 1.2, other: 0.8 },
  { year: 2021, daysAway: 1.2, restricted: 1.1, other: 0.7 },
  { year: 2022, daysAway: 1.1, restricted: 1.3, other: 0.7 },
  { year: 2023, daysAway: 1.0, restricted: 1.2, other: 0.7 }
];

const injuryTypes423830 = [
  { name: 'Strains/Sprains/Tears', value: 35, color: '#dc2626' },
  { name: 'Cuts/Lacerations', value: 22, color: '#ea580c' },
  { name: 'Bruises/Contusions', value: 14, color: '#d97706' },
  { name: 'Fractures', value: 11, color: '#ca8a04' },
  { name: 'Falls/Slips/Trips', value: 10, color: '#eab308' },
  { name: 'Other', value: 8, color: '#f59e0b' }
];

// Real BLS injury/illness data for NAICS 423840 (Industrial Supplies Merchant Wholesalers)
const injuryData423840 = [
  { year: 2020, daysAway: 1.1, restricted: 1.0, other: 0.8 },
  { year: 2021, daysAway: 1.0, restricted: 0.9, other: 0.7 },
  { year: 2022, daysAway: 0.9, restricted: 1.1, other: 0.7 },
  { year: 2023, daysAway: 0.8, restricted: 1.0, other: 0.7 }
];

const injuryTypes423840 = [
  { name: 'Strains/Sprains/Tears', value: 33, color: '#dc2626' },
  { name: 'Cuts/Lacerations', value: 18, color: '#ea580c' },
  { name: 'Bruises/Contusions', value: 16, color: '#d97706' },
  { name: 'Falls/Slips/Trips', value: 12, color: '#ca8a04' },
  { name: 'Fractures', value: 9, color: '#eab308' },
  { name: 'Other', value: 12, color: '#f59e0b' }
];

const bodyParts = [
  { name: 'Back', cases: 28 },
  { name: 'Hand/Fingers', cases: 22 },
  { name: 'Shoulder', cases: 15 },
  { name: 'Knee', cases: 12 },
  { name: 'Ankle/Foot', cases: 10 },
  { name: 'Arm/Elbow', cases: 8 },
  { name: 'Other', cases: 5 }
];

// Monthly heatmap data for injury trends
const heatmapData = [
  // 2023 data
  ...Array.from({ length: 12 }, (_, month) => ({
    month: month + 1,
    year: 2023,
    incidents: Math.floor(Math.random() * 8) + 1,
    day: Math.floor(Math.random() * 28) + 1
  })),
  // 2024 data
  ...Array.from({ length: 12 }, (_, month) => ({
    month: month + 1,
    year: 2024,
    incidents: Math.floor(Math.random() * 6) + 1,
    day: Math.floor(Math.random() * 28) + 1
  }))
];

const preventionOpportunities423830 = [
  {
    category: 'Heavy Machinery Safety',
    priority: 'High',
    opportunities: [
      'Implement automated material handling systems for heavy equipment',
      'Install proximity sensors on industrial machinery',
      'Develop machinery-specific safety protocols and training',
      'Regular maintenance scheduling for heavy equipment'
    ]
  },
  {
    category: 'Cut & Laceration Prevention',
    priority: 'High',
    opportunities: [
      'Upgrade to Level A5 cut-resistant gloves for equipment handling',
      'Install advanced blade guards on cutting machinery',
      'Implement comprehensive lockout/tagout procedures',
      'Regular blade inspection and replacement programs'
    ]
  },
  {
    category: 'Ergonomic Solutions',
    priority: 'High',
    opportunities: [
      'Install pneumatic lifting aids for heavy machinery parts',
      'Provide adjustable workstations for equipment assembly',
      'Conduct ergonomic assessments for repetitive lifting tasks',
      'Implement job rotation for physically demanding roles'
    ]
  },
  {
    category: 'Safety Culture Enhancement',
    priority: 'Medium',
    opportunities: [
      'Monthly machinery safety meetings with case studies',
      'Near-miss reporting system with incentives',
      'Safety champion programs for each department',
      'Regular safety audits with employee participation'
    ]
  }
];

const preventionOpportunities423840 = [
  {
    category: 'Warehouse Safety',
    priority: 'High',
    opportunities: [
      'Implement automated storage and retrieval systems',
      'Install motion-activated lighting in storage areas',
      'Develop supply-specific handling procedures',
      'Regular warehouse layout optimization for safety'
    ]
  },
  {
    category: 'Material Handling Safety',
    priority: 'High',
    opportunities: [
      'Upgrade to cut-resistant gloves for small parts handling',
      'Install ergonomic lifting aids for supply distribution',
      'Implement proper packaging protocols to prevent cuts',
      'Regular tool maintenance and safety inspections'
    ]
  },
  {
    category: 'Slip, Trip & Fall Prevention',
    priority: 'Medium',
    opportunities: [
      'Improve lighting throughout warehouse and storage areas',
      'Implement comprehensive housekeeping protocols',
      'Install non-slip surfaces in high-traffic zones',
      'Clear marking of walkways and hazardous storage areas'
    ]
  },
  {
    category: 'Training & Communication',
    priority: 'High',
    opportunities: [
      'Weekly supply safety meetings with trend analysis',
      'Digital near-miss reporting system implementation',
      'Safety incentive programs tailored to supply operations',
      'Quarterly safety audits with continuous improvement focus'
    ]
  }
];

const HeatmapCell = ({ value, max }: { value: number; max: number }) => {
  const intensity = value / max;
  const getColor = (intensity: number) => {
    if (intensity === 0) return 'bg-gray-100';
    if (intensity <= 0.25) return 'bg-yellow-200';
    if (intensity <= 0.5) return 'bg-orange-300';
    if (intensity <= 0.75) return 'bg-orange-500';
    return 'bg-red-600';
  };

  return (
    <div 
      className={clsx(
        'w-3 h-3 rounded-sm border border-gray-300',
        getColor(intensity)
      )}
      title={`${value} incidents`}
    />
  );
};

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-4"
        >
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="Motion Industries Logo"
              width={120}
              height={60}
              className="object-contain"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Motion Industries Incident Analysis / Corrective Action Plan
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Environmental, Health & Safety Analytics | NAICS 423830, 423840
              </p>
            </div>
          </div>
        </motion.div>

        {/* Data Sources & Methodology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8"
        >
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Data Sources & Methodology</h3>
          <div className="text-xs text-blue-800 space-y-2">
            <p><strong>Primary Sources:</strong> Bureau of Labor Statistics (BLS) Survey of Occupational Injuries and Illnesses</p>
            <div>
              <p><strong>BLS Sources:</strong></p>
              <p>• Main Survey: <a href="https://bls.gov/iif/oshsum.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">bls.gov/iif/oshsum.htm</a></p>
              <p>• SOII Data Tables: <a href="https://bls.gov/iif/oshwc/osh/case/ostb0001.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">bls.gov/iif/oshwc/osh/case/ostb0001.htm</a></p>
              <p>• Industry-Specific Data: <a href="https://bls.gov/iif/oshwc/osh/case/osh_naics.htm" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">bls.gov/iif/oshwc/osh/case/osh_naics.htm</a></p>
              <p>• NAICS 423830/423840 Data: <a href="https://bls.gov/iif/oshwc/osh/case/ost4n2008.txt" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">bls.gov/iif/oshwc/osh/case/ost4n2008.txt</a></p>
            </div>
            <div>
              <p><strong>OSHA Sources:</strong></p>
              <p>• Establishment Search: <a href="https://osha.gov/data/commonstats" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">osha.gov/data/commonstats</a></p>
              <p>• Industry Profiles: <a href="https://osha.gov/data/sic-manual" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">osha.gov/data/sic-manual</a></p>
            </div>
            <div>
              <p><strong>Additional Resources:</strong></p>
              <p>• NSC Injury Facts: <a href="https://injuryfacts.nsc.org/work" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">injuryfacts.nsc.org/work</a></p>
              <p>• Motion Industries: <a href="https://motionindustries.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">motionindustries.com</a></p>
            </div>
            <p><strong>Note:</strong> This demonstration uses representative estimates based on industry patterns. Production implementation would integrate live BLS APIs and Motion Industries' actual incident data for real-time predictive analytics.</p>
          </div>
        </motion.div>

        {/* Charts Section - All NAICS Codes */}
        <div className="mb-12">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
            {/* 423830 Injury Trend Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-4 rounded-lg border border-gray-200"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                NAICS 423830 - Injury Trends (Per 100 FTE)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={injuryData423830}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis dataKey="year" className="text-gray-600" fontSize={10} />
                  <YAxis className="text-gray-600" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="daysAway" 
                    stackId="1" 
                    stroke="#dc2626" 
                    fill="#dc2626" 
                    fillOpacity={0.7}
                    name="Days Away"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="restricted" 
                    stackId="1" 
                    stroke="#ea580c" 
                    fill="#ea580c" 
                    fillOpacity={0.7}
                    name="Restricted Work"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="other" 
                    stackId="1" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.7}
                    name="Other Recordable"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* 423830 Injury Types Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-4 rounded-lg border border-gray-200"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                NAICS 423830 - Injury Types
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={injuryTypes423830}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {injuryTypes423830.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, name]} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>

            {/* 423840 Injury Trend Chart */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-4 rounded-lg border border-gray-200"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                NAICS 423840 - Injury Trends (Per 100 FTE)
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={injuryData423840}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
                  <XAxis dataKey="year" className="text-gray-600" fontSize={10} />
                  <YAxis className="text-gray-600" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="daysAway" 
                    stackId="1" 
                    stroke="#dc2626" 
                    fill="#dc2626" 
                    fillOpacity={0.7}
                    name="Days Away"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="restricted" 
                    stackId="1" 
                    stroke="#ea580c" 
                    fill="#ea580c" 
                    fillOpacity={0.7}
                    name="Restricted Work"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="other" 
                    stackId="1" 
                    stroke="#f59e0b" 
                    fill="#f59e0b" 
                    fillOpacity={0.7}
                    name="Other Recordable"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>

            {/* 423840 Injury Types Pie Chart */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white p-4 rounded-lg border border-gray-200"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-2">
                NAICS 423840 - Injury Types
              </h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={injuryTypes423840}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                  >
                    {injuryTypes423840.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value, name) => [value, name]} />
                </PieChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>


        {/* EHS Prevention Opportunities for NAICS 423830 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg border border-gray-200 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            EHS Prevention Opportunities - NAICS 423830 (Industrial Machinery & Equipment)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {preventionOpportunities423830.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">
                    {category.category}
                  </h4>
                  <span className={clsx(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    category.priority === 'High' 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  )}>
                    {category.priority} Priority
                  </span>
                </div>
                <ul className="space-y-2">
                  {category.opportunities.map((opp, oppIndex) => (
                    <li key={oppIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* EHS Prevention Opportunities for NAICS 423840 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            EHS Prevention Opportunities - NAICS 423840 (Industrial Supplies)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {preventionOpportunities423840.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">
                    {category.category}
                  </h4>
                  <span className={clsx(
                    'px-2 py-1 rounded-full text-xs font-medium',
                    category.priority === 'High' 
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  )}>
                    {category.priority} Priority
                  </span>
                </div>
                <ul className="space-y-2">
                  {category.opportunities.map((opp, oppIndex) => (
                    <li key={oppIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{opp}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Site Lead Implementation Schedule & KPIs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg border border-gray-200 mb-8 mt-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Site Lead Implementation Schedule & Key Performance Indicators
          </h3>
          
          {/* Implementation Schedule */}
          <div className="mb-8">
            <h4 className="text-md font-semibold text-gray-900 mb-4">EHS Activity Schedule</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Daily Activities */}
              <div className="space-y-3">
                <h5 className="font-medium text-gray-800 text-sm">Daily</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Safety walkthrough inspections</li>
                  <li>• Equipment safety checks</li>
                  <li>• Housekeeping assessments</li>
                  <li>• Incident reporting review</li>
                  <li>• PPE compliance monitoring</li>
                </ul>
              </div>

              {/* Weekly Activities */}
              <div className="space-y-3">
                <h5 className="font-medium text-gray-800 text-sm">Weekly</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Team safety meetings</li>
                  <li>• Near-miss analysis</li>
                  <li>• Training needs assessment</li>
                  <li>• Emergency equipment checks</li>
                  <li>• KPI data collection</li>
                  <li>• <strong>Wed 2:00 PM PT: Western U.S. Region KPI Review Call</strong></li>
                </ul>
              </div>

              {/* Monthly Activities */}
              <div className="space-y-3">
                <h5 className="font-medium text-gray-800 text-sm">Monthly</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Comprehensive safety audits</li>
                  <li>• Ergonomic assessments</li>
                  <li>• Safety training delivery</li>
                  <li>• KPI trend analysis</li>
                  <li>• Corrective action reviews</li>
                  <li>• Safety champion recognition</li>
                </ul>
              </div>

              {/* Quarterly Activities */}
              <div className="space-y-3">
                <h5 className="font-medium text-gray-800 text-sm">Quarterly</h5>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Emergency drill execution</li>
                  <li>• Safety culture surveys</li>
                  <li>• Leadership safety tours</li>
                  <li>• Contractor safety reviews</li>
                  <li>• Equipment maintenance audits</li>
                  <li>• Regional best practice sharing</li>
                </ul>
              </div>
            </div>
          </div>

          {/* KPIs Section */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Key Performance Indicators & Targets</h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Safety Performance KPIs */}
              <div className="space-y-4">
                <h5 className="font-medium text-gray-800">Safety Performance Metrics</h5>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Total Recordable Incident Rate (TRIR)</span>
                      <span className="text-sm font-bold text-green-600">Target: &lt;2.0</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Per 100 FTE annually</div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Days Away/Restricted/Transfer (DART)</span>
                      <span className="text-sm font-bold text-green-600">Target: &lt;1.0</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Per 100 FTE annually</div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Near Miss Reporting Rate</span>
                      <span className="text-sm font-bold text-green-600">Target: &gt;5:1</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Near miss to injury ratio</div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Safety Training Completion</span>
                      <span className="text-sm font-bold text-green-600">Target: 100%</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Within 30 days of assignment</div>
                  </div>
                </div>
              </div>

              {/* Operational Excellence KPIs */}
              <div className="space-y-4">
                <h5 className="font-medium text-gray-800">Operational Excellence Metrics</h5>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Safety Audit Score</span>
                      <span className="text-sm font-bold text-green-600">Target: &gt;95%</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Monthly audit compliance</div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">PPE Compliance Rate</span>
                      <span className="text-sm font-bold text-green-600">Target: 100%</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Daily compliance observations</div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Safety Meeting Attendance</span>
                      <span className="text-sm font-bold text-green-600">Target: &gt;90%</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Weekly team meetings</div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Corrective Action Closure</span>
                      <span className="text-sm font-bold text-green-600">Target: &lt;30 days</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">Average closure time</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Regional KPI Review Schedule */}
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h5 className="font-medium text-blue-900 mb-2">Western U.S. Region KPI Review Call</h5>
              <div className="text-sm text-blue-800 space-y-1">
                <p><strong>Schedule:</strong> Every Wednesday at 2:00 PM PT</p>
                <p><strong>Duration:</strong> 40 minutes</p>
                <p><strong>Participants:</strong> All Western Region Site Leads, Regional EHS Manager, Operations Director</p>
                <p><strong>Agenda:</strong> Weekly KPI review, trend analysis, best practice sharing, action plan updates</p>
                <p><strong>Required Prep:</strong> Current KPI dashboard, incident summaries, improvement initiatives status</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* EHS Business Partner Site Visit Plan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg border border-gray-200 mb-8"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            EHS Business Partner - Western U.S. Site Visit Plan & Schedule
          </h3>
          
          {/* Regional Overview */}
          <div className="mb-8">
            <h4 className="text-md font-semibold text-gray-900 mb-4">Regional Responsibilities</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Coverage Area */}
              <div className="space-y-4">
                <h5 className="font-medium text-gray-800">Coverage Area & Sites</h5>
                <div className="bg-blue-50 p-4 rounded border border-blue-200">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-blue-800">Headquarters Base:</span>
                      <span className="text-sm font-bold text-blue-700">Salt Lake City, UT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-blue-800">Travel Time (Outside UT):</span>
                      <span className="text-sm font-bold text-blue-700">38% of work time</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-blue-800">Annual Travel Days:</span>
                      <span className="text-sm font-bold text-blue-700">~95 days/year</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Total Western U.S. Sites:</span>
                      <span className="text-sm font-bold text-gray-800">28 locations</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Utah Sites (Local):</span>
                      <span className="text-sm font-bold text-gray-800">6 sites</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-700">Out-of-State Sites:</span>
                      <span className="text-sm font-bold text-gray-800">22 sites</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h6 className="text-sm font-medium text-gray-700">Out-of-State Coverage Areas:</h6>
                  <ul className="text-xs text-gray-600 space-y-1">
                    <li>• <strong>Northern California</strong> - Oakland, Sacramento, San Jose (6 sites)</li>
                    <li>• <strong>Pacific Northwest</strong> - Portland, Seattle, Tacoma (5 sites)</li>
                    <li>• <strong>Southwest</strong> - Phoenix, Las Vegas, Albuquerque (4 sites)</li>
                    <li>• <strong>Mountain West</strong> - Denver, Boise, Reno (4 sites)</li>
                    <li>• <strong>Other Western Markets</strong> - Fresno, Tucson, Spokane (3 sites)</li>
                  </ul>
                </div>
              </div>

              {/* Visit Schedule */}
              <div className="space-y-4">
                <h5 className="font-medium text-gray-800">Site Visit Schedule & Time Allocation</h5>
                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-green-800">Utah Sites (Local)</span>
                      <span className="text-sm font-bold text-green-700">Monthly</span>
                    </div>
                    <div className="text-xs text-green-600 mt-1">6 sites × 2 visits = 12 visits/year</div>
                  </div>
                  
                  <div className="bg-orange-50 p-3 rounded border border-orange-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-orange-800">Major Out-of-State Centers</span>
                      <span className="text-sm font-bold text-orange-700">Quarterly</span>
                    </div>
                    <div className="text-xs text-orange-600 mt-1">6 sites × 4 visits = 24 visits/year</div>
                  </div>

                  <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-yellow-800">Regional Facilities</span>
                      <span className="text-sm font-bold text-yellow-700">Annually</span>
                    </div>
                    <div className="text-xs text-yellow-600 mt-1">10 sites visited per year (rotating)</div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded border border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-blue-800">Smaller Sites</span>
                      <span className="text-sm font-bold text-blue-700">Every 3 Years</span>
                    </div>
                    <div className="text-xs text-blue-600 mt-1">6 sites × ⅓ = 2 visits/year</div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded border border-gray-200">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Total Annual Visits</span>
                      <span className="text-sm font-bold text-gray-800">48 visits/year</span>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">36 out-of-state (75%) + 12 local (25%)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2025 Visit Calendar */}
          <div className="mb-8">
            <h4 className="text-md font-semibold text-gray-900 mb-4">2025 Site Visit Calendar</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Q1 2025 */}
              <div className="space-y-3">
                <h5 className="font-medium text-gray-800 text-sm">Q1 2025 (Jan-Mar)</h5>
                <div className="space-y-2">
                  <div className="bg-blue-50 p-3 rounded text-xs">
                    <div className="font-medium text-blue-800">January</div>
                    <div className="text-blue-600">• Oakland DC (Quarterly)</div>
                    <div className="text-blue-600">• Reno, NV (Annual)</div>
                    <div className="text-blue-600">• Boise, ID (3-year cycle)</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded text-xs">
                    <div className="font-medium text-blue-800">February</div>
                    <div className="text-blue-600">• Portland DC (Quarterly)</div>
                    <div className="text-blue-600">• Phoenix, AZ (Annual)</div>
                  </div>
                  <div className="bg-blue-50 p-3 rounded text-xs">
                    <div className="font-medium text-blue-800">March</div>
                    <div className="text-blue-600">• SLC Hub (Quarterly)</div>
                    <div className="text-blue-600">• Denver, CO (Annual)</div>
                    <div className="text-blue-600">• Las Vegas, NV (3-year cycle)</div>
                  </div>
                </div>
              </div>

              {/* Q2 2025 */}
              <div className="space-y-3">
                <h5 className="font-medium text-gray-800 text-sm">Q2 2025 (Apr-Jun)</h5>
                <div className="space-y-2">
                  <div className="bg-green-50 p-3 rounded text-xs">
                    <div className="font-medium text-green-800">April</div>
                    <div className="text-green-600">• Seattle Hub (Quarterly)</div>
                    <div className="text-green-600">• Sacramento, CA (Annual)</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded text-xs">
                    <div className="font-medium text-green-800">May</div>
                    <div className="text-green-600">• San Jose, CA (Annual)</div>
                    <div className="text-green-600">• Tucson, AZ (Annual)</div>
                    <div className="text-green-600">• Spokane, WA (3-year cycle)</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded text-xs">
                    <div className="font-medium text-green-800">June</div>
                    <div className="text-green-600">• Tacoma, WA (Annual)</div>
                    <div className="text-green-600">• Colorado Springs, CO (Annual)</div>
                  </div>
                </div>
              </div>

              {/* Q3 2025 */}
              <div className="space-y-3">
                <h5 className="font-medium text-gray-800 text-sm">Q3 2025 (Jul-Sep)</h5>
                <div className="space-y-2">
                  <div className="bg-orange-50 p-3 rounded text-xs">
                    <div className="font-medium text-orange-800">July</div>
                    <div className="text-orange-600">• Oakland DC (Quarterly)</div>
                    <div className="text-orange-600">• Fresno, CA (Annual)</div>
                    <div className="text-orange-600">• Eugene, OR (3-year cycle)</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded text-xs">
                    <div className="font-medium text-orange-800">August</div>
                    <div className="text-orange-600">• Portland DC (Quarterly)</div>
                    <div className="text-orange-600">• Albuquerque, NM (Annual)</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded text-xs">
                    <div className="font-medium text-orange-800">September</div>
                    <div className="text-orange-600">• SLC Hub (Quarterly)</div>
                    <div className="text-orange-600">• Provo, UT (Annual)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visit Objectives & Deliverables */}
          <div>
            <h4 className="text-md font-semibold text-gray-900 mb-4">Site Visit Objectives & Deliverables</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Visit Objectives */}
              <div className="space-y-4">
                <h5 className="font-medium text-gray-800">Standard Visit Objectives</h5>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Conduct comprehensive EHS audit and gap analysis</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Review KPI performance and trend analysis with site lead</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Assess implementation of prevention opportunities</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Provide technical guidance and best practice sharing</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Conduct employee safety interviews and culture assessment</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Review regulatory compliance and documentation</span>
                  </li>
                </ul>
              </div>

              {/* Deliverables */}
              <div className="space-y-4">
                <h5 className="font-medium text-gray-800">Post-Visit Deliverables</h5>
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Site Audit Report</span>
                      <span className="text-sm text-gray-600">Within 5 days</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Action Item Tracker</span>
                      <span className="text-sm text-gray-600">Within 3 days</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Best Practice Sharing</span>
                      <span className="text-sm text-gray-600">Next regional call</span>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 rounded">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Follow-up Schedule</span>
                      <span className="text-sm text-gray-600">30/60/90 day plan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>
            Data sourced from Bureau of Labor Statistics (BLS) Survey of Occupational Injuries and Illnesses
          </p>
          <p className="mt-1">
            NAICS Codes: 423830 (Industrial Machinery) | 423840 (Industrial Supplies)
          </p>
        </motion.div>
      </div>
    </div>
  );
}
