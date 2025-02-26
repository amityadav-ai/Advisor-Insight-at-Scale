import React, { useState } from 'react';
import { 
  BarChart3, 
  Headphones, 
  FileText,
  FileBarChart, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  MessageSquare,
  LineChart,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  Volume2,
  Play,
  Pause,
  X
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';

interface EarningsCall {
  company: string;
  time: string;
  status: 'upcoming' | 'ongoing' | 'past';
}

type AnalysisTab = 'sentiment' | 'financial' | 'investor' | 'market-impact';

function App() {
  const [selectedCompany, setSelectedCompany] = useState('Innovation Labs');
  const [activeTab, setActiveTab] = useState<AnalysisTab>('sentiment');
  const [timeframe, setTimeframe] = useState<'short' | 'medium' | 'long'>('short');
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);

  // Mock data
  const currentPrice = 185.75;
  const priceChange = 2.5;
  const priceChangePercent = 1.35;

  const calls: EarningsCall[] = [
    { company: 'Tech Corp', time: '2:00:00 PM', status: 'upcoming' },
    { company: 'Global Industries', time: '3:30:00 PM', status: 'ongoing' },
    { company: 'Innovation Labs', time: '10:00:00 AM', status: 'past' },
  ];

  const priceData = Array.from({ length: 24 }, (_, i) => ({
    time: `${i}:00`,
    price: 180 + Math.random() * 10
  }));

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(parseInt(e.target.value));
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderTranscriptModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">Q4 2023 Earnings Call Transcript</h3>
          <button
            onClick={() => setShowTranscript(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Opening Remarks - CEO John Smith</h4>
              <p className="text-gray-700">
                "Good morning everyone, and thank you for joining us today. I'm pleased to report another strong quarter for Innovation Labs, with revenue growth exceeding our expectations and significant progress across all our key initiatives..."
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Financial Overview - CFO Sarah Johnson</h4>
              <p className="text-gray-700">
                "Our Q4 revenue reached $89.5 billion, representing an 8% year-over-year increase. Operating margin improved to 28.5%, up 250 basis points from the previous quarter..."
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Q&A Session</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 italic">Analyst (Morgan Stanley):</p>
                  <p className="text-gray-700">"Can you provide more color on the expansion plans in the APAC region?"</p>
                  <p className="text-gray-600 italic mt-2">CEO Response:</p>
                  <p className="text-gray-700">"Certainly. We're seeing tremendous opportunity in the APAC market..."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSummaryModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-3/4 max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">Call Summary</h3>
          <button
            onClick={() => setShowSummary(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-120px)]">
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">Key Highlights</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Revenue growth of 8% year-over-year, exceeding analyst expectations</li>
                <li>Operating margin improvement to 28.5%</li>
                <li>Announced expansion plans in APAC region</li>
                <li>New product line launch scheduled for Q2</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">Financial Performance</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Revenue</div>
                  <div className="text-xl font-bold text-gray-900">$89.5B</div>
                  <div className="text-sm text-green-600">↑ 8% YoY</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">EPS</div>
                  <div className="text-xl font-bold text-gray-900">$2.45</div>
                  <div className="text-sm text-green-600">↑ 15% vs Expected</div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-3">Strategic Initiatives</h4>
              <div className="space-y-3">
                <div className="flex items-center text-gray-700">
                  <ChevronRight className="w-4 h-4 mr-2 text-green-500" />
                  <span>APAC market expansion planned for Q2</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <ChevronRight className="w-4 h-4 mr-2 text-green-500" />
                  <span>Strategic acquisition of TechStart ($500M)</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <ChevronRight className="w-4 h-4 mr-2 text-green-500" />
                  <span>Cost reduction initiative targeting $2B by 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSentimentAnalysis = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-3 gap-6">
        {/* Executive Sentiment */}
        <div className="bg-blue-50 rounded-lg p-6">
          <h4 className="text-sm font-medium text-blue-900 mb-4">Executive Sentiment</h4>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-blue-600">+85%</span>
            <span className="ml-2 text-green-600">↑</span>
          </div>
          <p className="mt-2 text-sm text-blue-600">
            Positive tone increase from last call
          </p>
        </div>

        {/* Keyword Analysis */}
        <div className="bg-green-50 rounded-lg p-6">
          <h4 className="text-sm font-medium text-green-900 mb-4">Keyword & Emotion Detection</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-green-700">Positive Words</span>
              <span className="font-medium text-green-900">78</span>
            </div>
            <div className="flex justify-between">
              <span className="text-red-700">Negative Words</span>
              <span className="font-medium text-red-900">12</span>
            </div>
            <div className="flex justify-between">
              <span className="text-orange-700">Hesitation Markers</span>
              <span className="font-medium text-orange-900">5</span>
            </div>
          </div>
        </div>

        {/* Comparative Analysis */}
        <div className="bg-purple-50 rounded-lg p-6">
          <h4 className="text-sm font-medium text-purple-900 mb-4">Comparative Analysis</h4>
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-purple-600">Top 15%</span>
          </div>
          <p className="mt-2 text-sm text-purple-600">vs Industry Average</p>
          <div className="mt-4 text-sm">
            <div className="flex items-center text-purple-700">
              <ArrowUpRight className="w-4 h-4 mr-1" />
              <span>25% more positive than competitors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinancialMetrics = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        {/* Revenue & Earnings */}
        <div className="bg-white rounded-lg border p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Revenue & Earnings Metrics</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">EPS</div>
              <div className="text-xl font-bold text-gray-900">$2.45</div>
              <div className="text-sm text-green-600">↑ 15% vs Expected</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Revenue</div>
              <div className="text-xl font-bold text-gray-900">$89.5B</div>
              <div className="text-sm text-green-600">↑ 8% YoY</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Operating Margin</div>
              <div className="text-xl font-bold text-gray-900">28.5%</div>
              <div className="text-sm text-green-600">↑ 2.5pts</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Cash Flow</div>
              <div className="text-xl font-bold text-gray-900">$12.3B</div>
              <div className="text-sm text-green-600">↑ 12% QoQ</div>
            </div>
          </div>
        </div>

        {/* Forward Guidance */}
        <div className="bg-white rounded-lg border p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Forward Guidance & Outlook</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Revenue Forecast</span>
              <span className="font-medium text-green-600">$92-95B (Q1 2024)</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">EPS Forecast</span>
              <span className="font-medium text-green-600">$2.50-2.60</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Cost Reduction Target</span>
              <span className="font-medium text-blue-600">$2B by 2024</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Growth Signals */}
        <div className="bg-white rounded-lg border p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Growth Signals</h4>
          <div className="space-y-3">
            <div className="flex items-center text-gray-700">
              <ChevronRight className="w-4 h-4 mr-2 text-green-500" />
              <span>Expansion into APAC market planned for Q2</span>
            </div>
            <div className="flex items-center text-gray-700">
              <ChevronRight className="w-4 h-4 mr-2 text-green-500" />
              <span>New product line launch in development</span>
            </div>
            <div className="flex items-center text-gray-700">
              <ChevronRight className="w-4 h-4 mr-2 text-green-500" />
              <span>Strategic acquisition of TechStart ($500M)</span>
            </div>
          </div>
        </div>

        {/* Risk Factors */}
        <div className="bg-white rounded-lg border p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Risk Factors</h4>
          <div className="space-y-3">
            <div className="p-3 bg-red-50 rounded-lg">
              <div className="flex items-center text-red-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span>Supply chain disruptions in Asia</span>
              </div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="flex items-center text-yellow-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span>Regulatory changes in EU market</span>
              </div>
            </div>
            <div className="p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center text-orange-700">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <span>Increased competition in core markets</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInvestorReactions = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-6">
        {/* Live Q&A Analysis */}
        <div className="bg-white rounded-lg border p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Live Q&A Analysis</h4>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700">Response Quality</div>
              <div className="flex items-center mt-2">
                <div className="flex-1 h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="ml-2 text-sm text-gray-600">85%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Questions Addressed</span>
                <span className="font-medium text-gray-900">12/15</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Follow-up Questions</span>
                <span className="font-medium text-gray-900">8</span>
              </div>
            </div>
          </div>
        </div>

        {/* Past Calls Comparison */}
        <div className="bg-white rounded-lg border p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Comparison with Past Calls</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Confidence Level</span>
              <span className="font-medium text-green-600">↑ 15% vs Last Call</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Key Terms Changed</span>
              <span className="font-medium text-blue-600">+3 New Terms</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Social Media Sentiment */}
        <div className="bg-white rounded-lg border p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Social Media & News Sentiment</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-green-700">Positive Mentions</span>
              <span className="font-medium text-green-900">1,245</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
              <span className="text-red-700">Negative Mentions</span>
              <span className="font-medium text-red-900">234</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-blue-700">News Coverage</span>
              <span className="font-medium text-blue-900">85% Positive</span>
            </div>
          </div>
        </div>

        {/* Stock Price Impact */}
        <div className="bg-white rounded-lg border p-6">
          <h4 className="text-lg font-medium text-gray-900 mb-4">Stock Price Correlation</h4>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700">Price Movement</div>
              <div className="mt-2 flex items-baseline">
                <span className="text-2xl font-bold text-green-600">+4.2%</span>
                <span className="ml-2 text-sm text-gray-600">After Call</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Volume Increase</span>
                <span className="font-medium text-gray-900">+156%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Volatility</span>
                <span className="font-medium text-gray-900">High</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMarketImpact = () => (
    <div className="space-y-8">
      {/* Time Frame Selector */}
      <div className="flex space-x-4">
        {['short', 'medium', 'long'].map((frame) => (
          <button
            key={frame}
            onClick={() => setTimeframe(frame as 'short' | 'medium' | 'long')}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              timeframe === frame
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {frame.charAt(0).toUpperCase() + frame.slice(1)} Term
          </button>
        ))}
      </div>

      {timeframe === 'short' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Volatility Analysis</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Intraday Range</div>
                <div className="text-xl font-bold text-gray-900">$182.5 - $189.3</div>
                <div className="text-sm text-blue-600">3.7% Spread</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Volume</div>
                  <div className="font-medium text-gray-900">2.5M shares</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">VWAP</div>
                  <div className="font-medium text-gray-900">$185.75</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Options Activity</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Call Volume</div>
                  <div className="text-xl font-bold text-gray-900">12,450</div>
                  <div className="text-sm text-green-600">↑ 234% vs Avg</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Put Volume</div>
                  <div className="text-xl font-bold text-gray-900">8,320</div>
                  <div className="text-sm text-red-600">↑ 156% vs Avg</div>
                </div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Put/Call Ratio</div>
                <div className="font-medium text-gray-900">0.67</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {timeframe === 'medium' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Analyst Ratings</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-sm text-green-700">Buy</p>
                  <p className="text-lg font-medium text-green-900">15</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-yellow-700">Hold</p>
                  <p className="text-lg font-medium text-yellow-900">8</p>
                </div>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-sm text-red-700">Sell</p>
                  <p className="text-lg font-medium text-red-900">2</p>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">Target</p>
                  <p className="text-lg font-medium text-blue-900">$185</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Sector Comparison</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Relative Performance</div>
                <div className="text-xl font-bold text-green-600">+2.8%</div>
                <div className="text-sm text-gray-600">vs Sector Average</div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Sector Rank</div>
                  <div className="font-medium text-gray-900">#3 of 25</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Beta</div>
                  <div className="font-medium text-gray-900">1.15</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {timeframe === 'long' && (
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Executive Credibility</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Promise Delivery Rate</div>
                <div className="flex items-center mt-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div className="h-2 bg-green-500 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-600">85%</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">Guidance Accuracy</div>
                  <div className="font-medium text-gray-900">92%</div>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-sm text-gray-500">CEO Confidence</div>
                  <div className="font-medium text-green-600">High</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border p-6">
            <h4 className="text-lg font-medium text-gray-900 mb-4">Market Response Patterns</h4>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-500">Key Phrase Impact</div>
                <div className="mt-2 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">"Strategic Investment"</span>
                    <span className="font-medium text-green-600">+1.2%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">"Market Challenges"</span>
                    <span className="font-medium text-red-600">-0.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-white">
        <div className="p-4">
          <h1 className="text-xl font-semibold text-gray-900">Real-Time Advisor</h1>
        </div>
        
        <div className="px-4 py-2">
          <h2 className="text-sm font-medium text-gray-500">Earnings Calls</h2>
        </div>

        <div className="px-4 py-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search company..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
            />
          </div>
        </div>

        <div className="mt-2">
          {calls.map((call) => (
            <button
              key={call.company}
              onClick={() => setSelectedCompany(call.company)}
              className={`w-full px-4 py-3 flex flex-col text-left hover:bg-gray-50 ${
                selectedCompany === call.company ? 'bg-gray-50' : ''
              }`}
            >
              <span className="font-medium text-gray-900">{call.company}</span>
              <div className="flex items-center mt-1">
                <span className="text-sm text-gray-500">{call.time}</span>
                <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                  call.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                  call.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {call.status}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">{selectedCompany}</h2>
              <div className="mt-2 flex items-baseline">
                <span className="text-3xl font-bold">${currentPrice.toFixed(2)}</span>
                <span className={`ml-2 flex items-center ${priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {priceChange >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {Math.abs(priceChangePercent).toFixed(2)}%
                </span>
              </div>
            </div>
            <div className="flex gap-3">
              <button 
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                onClick={() => setShowAudioPlayer(!showAudioPlayer)}
              >
                <Headphones className="w-5 h-5 mr-2" />
                Listen to Call
              </button>
              <button 
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                onClick={() => setShowSummary(true)}
              >
                <FileBarChart className="w-5 h-5 mr-2" />
                Call Summary
              </button>
              <button 
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                onClick={() => setShowTranscript(true)}
              >
                <FileText className="w-5 h-5 mr-2" />
                View Transcript
              </button>
            </div>
          </div>

          {/* Audio Player */}
          {showAudioPlayer && (
            <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Q4 2023 Earnings Call</h3>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Volume2 className="w-5 h-5 text-gray-500 mr-2" />
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={handleVolumeChange}
                        className="w-24"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-2 rounded-full hover:bg-gray-100"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 text-gray-700" />
                    ) : (
                      <Play className="w-6 h-6 text-gray-700" />
                    )}
                  </button>
                  <div className="flex-1 flex items-center space-x-4">
                    <span className="text-sm text-gray-500 w-12">{formatTime(currentTime)}</span>
                    <input
                      type="range"
                      min="0"
                      max="3600"
                      value={currentTime}
                      onChange={handleSeek}
                      className="flex-1"
                    />
                    <span className="text-sm text-gray-500 w-12">60:00</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-sm text-gray-500 text-center">
                Audio playback is not available for this earnings call.
              </div>
            </div>
          )}

          {/* Stock Price Chart */}
          <div className="mb-8 bg-white p-6 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Stock Price</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="time"
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis 
                    domain={['auto', 'auto']}
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `$${value.toFixed(2)}`}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                    labelFormatter={(label) => `Time: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#4F46E5"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="flex gap-6 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab('sentiment')}
              className={`flex items-center pb-4 ${
                activeTab === 'sentiment'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Activity className="w-5 h-5 mr-2" />
              Sentiment Analysis
            </button>
            <button
              onClick={() => setActiveTab('financial')}
              className={`flex items-center pb-4 ${
                activeTab === 'financial'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <DollarSign className="w-5 h-5 mr-2" />
              Financial Metrics
            </button>
            <button
              onClick={() => setActiveTab('investor')}
              className={`flex items-center pb-4 ${
                activeTab === 'investor'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <MessageSquare className="w-5 h-5 mr-2" />
              Investor Reactions
            </button>
            <button
              onClick={() => setActiveTab('market-impact')}
              className={`flex items-center pb-4 ${
                activeTab === 'market-impact'
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              Market Impact
            </button>
          </div>

          <div className="mt-6">
            {activeTab === 'sentiment' && renderSentimentAnalysis()}
            {activeTab === 'financial' && renderFinancialMetrics()}
            {activeTab === 'investor' && renderInvestorReactions()}
            {activeTab === 'market-impact' && renderMarketImpact()}
          </div>
        </div>
      </div>

      {/* Transcript Modal */}
      {showTranscript && renderTranscriptModal()}

      {/* Summary Modal */}
      {showSummary && renderSummaryModal()}
    </div>
  );
}

export default App;