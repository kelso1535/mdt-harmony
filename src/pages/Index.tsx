
import { useState } from "react";
import { Shield, AlertTriangle, LogOut, Search, Car, History, FileText, Database, UserCheck, Briefcase, Users, Fingerprint, Pin, BarChart3, Lock, Shuffle, X, ArrowLeftCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

// Mock data for the search person demo
const mockPersonData = {
  name: "JONES, BRAXTON",
  dob: "1977-3-23",
  sex: "M",
  address: "STRAWBERRY, LOS SANTOS",
  phone: "583214",
  licenseClass: "C[AR] [RIDER]",
  licenseStatus: "CURRENT",
  expires: "2023-11-13 00:00 AM",
  conditions: "NONE",
  demeritPoints: "0 (LAST 7 DAYS)",
  wanted: "NO",
  bail: "NO",
  mentalHealth: "NO",
  possWeapon: "NO",
  violencePolice: "YES",
  violence: "NO",
  weaponLicenses: {
    longarm: "NO",
    handgun: "NO",
  },
  concealCarryPermit: "NO",
  farmProhibOrder: "NO",
};

// Mock data for vehicles
const mockVehicleData = {
  plate: "GTR123",
  make: "ANNIS",
  model: "ELEGY RETRO CUSTOM",
  color: "RED/BLACK",
  owner: "JONES, BRAXTON",
  registration: "VALID",
  insurance: "CURRENT",
  stolen: "NO",
  flag: "NONE",
  notes: "MODIFIED EXHAUST, LOWERED SUSPENSION",
};

// Mock data for reports
const mockReports = [
  {
    id: "RP-2023-001",
    title: "DUI Incident",
    officer: "Officer Johnson",
    date: "2023-09-15",
    status: "FILED",
  },
  {
    id: "RP-2023-002",
    title: "Domestic Disturbance",
    officer: "Officer Smith",
    date: "2023-10-03",
    status: "PENDING",
  },
  {
    id: "RP-2023-003",
    title: "Traffic Violation",
    officer: "Officer Martinez",
    date: "2023-10-12",
    status: "COMPLETED",
  },
];

// Mock data for criminal history
const mockCriminalHistory = [
  {
    id: "CR-2023-001",
    charge: "DUI",
    date: "2023-05-22",
    sentence: "Fine $500, License suspended 3 months",
    notes: "Blood alcohol level 0.12%",
  },
  {
    id: "CR-2023-002",
    charge: "Assault",
    date: "2022-11-10",
    sentence: "Probation 12 months",
    notes: "Bar fight with minor injuries",
  },
];

// Mock data for wanted persons
const mockWantedPersons = [
  {
    id: "W-2023-001",
    name: "STEVENS, MICHAEL",
    reason: "Armed Robbery",
    lastSeen: "Downtown Los Santos",
    dangerLevel: "HIGH",
  },
  {
    id: "W-2023-002",
    name: "WILLIAMS, SARAH",
    reason: "Drug Trafficking",
    lastSeen: "Sandy Shores",
    dangerLevel: "MEDIUM",
  },
];

// Mock data for active units
const mockUnits = [
  { callSign: "1-ADAM-12", officer: "Johnson", status: "Code 1", location: "Downtown" },
  { callSign: "2-LINCOLN-14", officer: "Smith", status: "Code 2", location: "Beach" },
  { callSign: "3-MARY-10", officer: "Martinez", status: "Code 4", location: "Highway" },
];

const Index = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Code 1");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [callSign, setCallSign] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState<null | typeof mockPersonData>(null);
  const [searchPlate, setSearchPlate] = useState("");
  const [vehicleResults, setVehicleResults] = useState<null | typeof mockVehicleData>(null);
  const [reportTitle, setReportTitle] = useState("");
  const [reportContent, setReportContent] = useState("");
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const handleLogin = () => {
    if (!callSign.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter your call sign to continue",
      });
      return;
    }
    
    setIsLoggedIn(true);
    toast({
      title: "Logged In",
      description: `Officer ${callSign} successfully logged into MDT`,
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveSection("dashboard");
    setCallSign("");
    setSearchResults(null);
    setVehicleResults(null);
    setSearchHistory([]);
    toast({
      title: "Logged Out",
      description: "Successfully logged out of MDT",
    });
  };

  const handleDuress = () => {
    toast({
      variant: "destructive",
      title: "DURESS ACTIVATED",
      description: "Emergency services have been notified",
    });
  };

  const handleStatusChange = (status: string) => {
    setCurrentStatus(status);
    toast({
      title: "Status Updated",
      description: `Status changed to ${status}`,
    });
  };

  const handleSearch = () => {
    if (!searchName.trim()) {
      toast({
        variant: "destructive",
        title: "Search Error",
        description: "Please enter a name to search",
      });
      return;
    }
    
    // In a real application, this would fetch data from an API
    setSearchResults(mockPersonData);
    // Add to search history
    setSearchHistory(prev => [...prev, `Person: ${searchName}`]);
    toast({
      title: "Search Completed",
      description: `Found records for ${searchName}`,
    });
  };

  const handleVehicleSearch = () => {
    if (!searchPlate.trim()) {
      toast({
        variant: "destructive",
        title: "Search Error",
        description: "Please enter a plate number to search",
      });
      return;
    }
    
    // In a real application, this would fetch data from an API
    setVehicleResults(mockVehicleData);
    // Add to search history
    setSearchHistory(prev => [...prev, `Vehicle: ${searchPlate}`]);
    toast({
      title: "Vehicle Search Completed",
      description: `Found vehicle with plate ${searchPlate}`,
    });
  };

  const handleReportSubmit = () => {
    if (!reportTitle.trim() || !reportContent.trim()) {
      toast({
        variant: "destructive",
        title: "Report Error",
        description: "Please enter both a title and content for your report",
      });
      return;
    }
    
    // In a real application, this would submit data to an API
    toast({
      title: "Report Submitted",
      description: "Your report has been filed successfully",
    });
    setReportTitle("");
    setReportContent("");
  };

  const statusColors: Record<string, string> = {
    "Code 1": "bg-green-500",
    "Code 2": "bg-blue-500",
    "Code 4": "bg-yellow-500",
    "Code 5": "bg-purple-500",
    "Code 6": "bg-red-500",
  };

  const statusDescriptions: Record<string, string> = {
    "Code 1": "On Patrol",
    "Code 2": "Arrived at Station",
    "Code 4": "Traffic Stop",
    "Code 5": "Arrived on Scene",
    "Code 6": "Unavailable",
  };

  // Render the search person section
  const renderSearchPerson = () => {
    return (
      <div className="mdt-search-container h-full">
        <h2 className="text-xl font-bold text-center text-blue-400 mb-4">Search Person</h2>
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter name (e.g. Braxton Jones)"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="mdt-search-field flex-grow"
          />
          <button 
            onClick={handleSearch} 
            className="mdt-search-button"
          >
            Run Person Check
          </button>
        </div>
        
        {searchResults && (
          <div className="mdt-data-table h-[calc(100vh-260px)] overflow-y-auto">
            <div className="mdt-section-header">----------LEAP DATABASE ENTRY----------</div>
            
            <div className="mdt-data-section">
              <div className="mdt-data-row">
                <span className="mdt-data-label">NAME:</span>
                <span className="mdt-data-value">{searchResults.name}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">DOB:</span>
                <span className="mdt-data-value">{searchResults.dob}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">SEX:</span>
                <span className="mdt-data-value">{searchResults.sex}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">HOME ADDR:</span>
                <span className="mdt-data-value">{searchResults.address}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">PHONE NO:</span>
                <span className="mdt-data-value">{searchResults.phone}</span>
              </div>
            </div>
            
            <div className="mdt-section-header">----------ROAD TRAFFIC AUTHORITY----------</div>
            <div className="mdt-data-section">
              <div className="mdt-data-row">
                <span className="mdt-data-label">LIC CLASS:</span>
                <span className="mdt-data-value">{searchResults.licenseClass}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">LIC STATUS:</span>
                <span className="mdt-data-value">{searchResults.licenseStatus}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">EXPIRES:</span>
                <span className="mdt-data-value">{searchResults.expires}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">CONDITIONS:</span>
                <span className="mdt-data-value">{searchResults.conditions}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">DEMERIT PTS:</span>
                <span className="mdt-data-value">{searchResults.demeritPoints}</span>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="mdt-section-header">----------ALERTS----------</div>
                <div className="mdt-data-section">
                  <div className="mdt-data-row">
                    <span className="mdt-data-label">WANTED:</span>
                    <span className={searchResults.wanted === "YES" ? "mdt-data-negative" : "mdt-data-value"}>{searchResults.wanted}</span>
                  </div>
                  <div className="mdt-data-row">
                    <span className="mdt-data-label">BAIL:</span>
                    <span className={searchResults.bail === "YES" ? "mdt-data-negative" : "mdt-data-value"}>{searchResults.bail}</span>
                  </div>
                  <div className="mdt-data-row">
                    <span className="mdt-data-label">MEN. HEALTH:</span>
                    <span className={searchResults.mentalHealth === "YES" ? "mdt-data-negative" : "mdt-data-value"}>{searchResults.mentalHealth}</span>
                  </div>
                  <div className="mdt-data-row">
                    <span className="mdt-data-label">POS WEAP:</span>
                    <span className={searchResults.possWeapon === "YES" ? "mdt-data-negative" : "mdt-data-value"}>{searchResults.possWeapon}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="mdt-section-header">----------FLAGS----------</div>
                <div className="mdt-data-section">
                  <div className="mdt-data-row">
                    <span className="mdt-data-label">VIOLENCE POLICE:</span>
                    <span className={searchResults.violencePolice === "YES" ? "mdt-data-negative" : "mdt-data-value"}>{searchResults.violencePolice}</span>
                  </div>
                  <div className="mdt-data-row">
                    <span className="mdt-data-label">VIOLENCE:</span>
                    <span className={searchResults.violence === "YES" ? "mdt-data-negative" : "mdt-data-value"}>{searchResults.violence}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-4 mt-2">
              <div className="flex-1">
                <div className="mdt-section-header">----------WEAPON LONGARM----------</div>
                <div className="mdt-data-section">
                  <div className="mdt-data-row">
                    <span className="mdt-data-label">CONCEAL CARRY PERMIT:</span>
                    <span className="mdt-data-value">{searchResults.concealCarryPermit}</span>
                  </div>
                  <div className="mdt-data-row">
                    <span className="mdt-data-label">FARM PROHIB ORDER:</span>
                    <span className="mdt-data-value">{searchResults.farmProhibOrder}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="mdt-section-header">----------WEAPON LICENCES----------</div>
                <div className="mdt-data-section">
                  <div className="mdt-data-row">
                    <span className="mdt-data-label">LONGARM:</span>
                    <span className="mdt-data-value">{searchResults.weaponLicenses.longarm}</span>
                  </div>
                  <div className="mdt-data-row">
                    <span className="mdt-data-label">HANDGUN:</span>
                    <span className="mdt-data-value">{searchResults.weaponLicenses.handgun}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4">
              <img 
                src="public/lovable-uploads/d5951bbb-1492-4f9a-a61d-1c3637b37e16.png" 
                alt="Person thumbnail" 
                className="mdt-thumb h-32 w-32"
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render the search vehicle section
  const renderSearchVehicle = () => {
    return (
      <div className="mdt-search-container h-full">
        <h2 className="text-xl font-bold text-center text-blue-400 mb-4">Search Vehicle</h2>
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter plate number (e.g. GTR123)"
            value={searchPlate}
            onChange={(e) => setSearchPlate(e.target.value)}
            className="mdt-search-field flex-grow"
          />
          <button 
            onClick={handleVehicleSearch} 
            className="mdt-search-button"
          >
            Run Vehicle Check
          </button>
        </div>
        
        {vehicleResults && (
          <div className="mdt-data-table h-[calc(100vh-260px)] overflow-y-auto">
            <div className="mdt-section-header">----------VEHICLE DATABASE ENTRY----------</div>
            
            <div className="mdt-data-section">
              <div className="mdt-data-row">
                <span className="mdt-data-label">PLATE:</span>
                <span className="mdt-data-value">{vehicleResults.plate}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">MAKE:</span>
                <span className="mdt-data-value">{vehicleResults.make}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">MODEL:</span>
                <span className="mdt-data-value">{vehicleResults.model}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">COLOR:</span>
                <span className="mdt-data-value">{vehicleResults.color}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">OWNER:</span>
                <span className="mdt-data-value">{vehicleResults.owner}</span>
              </div>
            </div>
            
            <div className="mdt-section-header">----------VEHICLE STATUS----------</div>
            <div className="mdt-data-section">
              <div className="mdt-data-row">
                <span className="mdt-data-label">REGISTRATION:</span>
                <span className="mdt-data-value">{vehicleResults.registration}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">INSURANCE:</span>
                <span className="mdt-data-value">{vehicleResults.insurance}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">STOLEN:</span>
                <span className={vehicleResults.stolen === "YES" ? "mdt-data-negative" : "mdt-data-value"}>{vehicleResults.stolen}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">FLAG:</span>
                <span className="mdt-data-value">{vehicleResults.flag}</span>
              </div>
            </div>
            
            <div className="mdt-section-header">----------VEHICLE NOTES----------</div>
            <div className="mdt-data-section">
              <div className="mdt-data-value">{vehicleResults.notes}</div>
            </div>
            
            <div className="flex justify-end mt-4">
              <div className="mdt-vehicle-image">
                <Car className="w-32 h-32 text-[#00ff00]" />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Render the search history section
  const renderSearchHistory = () => {
    return (
      <div className="mdt-search-container h-full">
        <h2 className="text-xl font-bold text-center text-blue-400 mb-4">Search History</h2>
        
        {searchHistory.length > 0 ? (
          <div className="mdt-data-table h-[calc(100vh-260px)] overflow-y-auto">
            <div className="mdt-section-header">----------RECENT SEARCHES----------</div>
            
            <div className="mdt-data-section">
              {searchHistory.map((search, index) => (
                <div key={index} className="mdt-data-row border-b border-dashed border-[#00ff00] py-2">
                  <span className="mdt-data-label">SEARCH {searchHistory.length - index}:</span>
                  <span className="mdt-data-value">{search}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="mdt-data-section flex justify-center items-center h-[calc(100vh-260px)]">
            <p className="text-[#00ff00]">No search history available.</p>
          </div>
        )}
      </div>
    );
  };

  // Render the criminal history section
  const renderCriminalHistory = () => {
    return (
      <div className="mdt-search-container h-full">
        <h2 className="text-xl font-bold text-center text-blue-400 mb-4">Criminal History</h2>
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter name to search criminal history"
            className="mdt-search-field flex-grow"
          />
          <button className="mdt-search-button">
            Search Records
          </button>
        </div>
        
        <div className="mdt-data-table h-[calc(100vh-260px)] overflow-y-auto">
          <div className="mdt-section-header">----------CRIMINAL RECORDS----------</div>
          
          {mockCriminalHistory.map((record, index) => (
            <div key={index} className="mdt-data-section mb-4">
              <div className="mdt-data-row">
                <span className="mdt-data-label">CASE ID:</span>
                <span className="mdt-data-value">{record.id}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">CHARGE:</span>
                <span className="mdt-data-value">{record.charge}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">DATE:</span>
                <span className="mdt-data-value">{record.date}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">SENTENCE:</span>
                <span className="mdt-data-value">{record.sentence}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">NOTES:</span>
                <span className="mdt-data-value">{record.notes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render the traffic offences section
  const renderTrafficOffences = () => {
    return (
      <div className="mdt-search-container h-full">
        <h2 className="text-xl font-bold text-center text-blue-400 mb-4">Traffic Offences</h2>
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter name or license number"
            className="mdt-search-field flex-grow"
          />
          <button className="mdt-search-button">
            Search Violations
          </button>
        </div>
        
        <div className="mdt-data-table h-[calc(100vh-260px)] overflow-y-auto">
          <div className="mdt-section-header">----------TRAFFIC OFFENCES DATABASE----------</div>
          
          <div className="mdt-data-section mb-4">
            <div className="mdt-section-header">VIOLATION #1</div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">DATE:</span>
              <span className="mdt-data-value">2023-09-15</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">OFFENCE:</span>
              <span className="mdt-data-value">Speeding (80mph in 55mph zone)</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">FINE:</span>
              <span className="mdt-data-value">$250</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">POINTS:</span>
              <span className="mdt-data-value">3</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">OFFICER:</span>
              <span className="mdt-data-value">Smith</span>
            </div>
          </div>
          
          <div className="mdt-data-section">
            <div className="mdt-section-header">VIOLATION #2</div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">DATE:</span>
              <span className="mdt-data-value">2023-08-22</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">OFFENCE:</span>
              <span className="mdt-data-value">Running red light</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">FINE:</span>
              <span className="mdt-data-value">$150</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">POINTS:</span>
              <span className="mdt-data-value">2</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">OFFICER:</span>
              <span className="mdt-data-value">Johnson</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render the reports section
  const renderReports = () => {
    return (
      <div className="mdt-search-container h-full">
        <h2 className="text-xl font-bold text-center text-blue-400 mb-4">Reports</h2>
        
        <div className="flex flex-col gap-4 mb-4">
          <div className="mdt-section-header">CREATE NEW REPORT</div>
          <Input
            placeholder="Report Title"
            value={reportTitle}
            onChange={(e) => setReportTitle(e.target.value)}
            className="mdt-search-field"
          />
          <textarea
            placeholder="Report Content"
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            className="mdt-search-field h-32 resize-none"
          />
          <button
            onClick={handleReportSubmit}
            className="mdt-search-button"
          >
            Submit Report
          </button>
        </div>
        
        <div className="mdt-data-table h-[calc(100vh-470px)] overflow-y-auto">
          <div className="mdt-section-header">----------RECENT REPORTS----------</div>
          
          {mockReports.map((report, index) => (
            <div key={index} className="mdt-data-section mb-4">
              <div className="mdt-data-row">
                <span className="mdt-data-label">REPORT ID:</span>
                <span className="mdt-data-value">{report.id}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">TITLE:</span>
                <span className="mdt-data-value">{report.title}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">OFFICER:</span>
                <span className="mdt-data-value">{report.officer}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">DATE:</span>
                <span className="mdt-data-value">{report.date}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">STATUS:</span>
                <span className="mdt-data-value">{report.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render the serials section
  const renderSerials = () => {
    return (
      <div className="mdt-search-container h-full">
        <h2 className="text-xl font-bold text-center text-blue-400 mb-4">Serials</h2>
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter serial number"
            className="mdt-search-field flex-grow"
          />
          <button className="mdt-search-button">
            Search Serial
          </button>
        </div>
        
        <div className="mdt-data-table h-[calc(100vh-260px)] overflow-y-auto">
          <div className="mdt-section-header">----------SERIAL NUMBER DATABASE----------</div>
          
          <div className="mdt-data-section">
            <div className="mdt-data-row">
              <span className="mdt-data-label">SERIAL:</span>
              <span className="mdt-data-value">WP-A12345</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">TYPE:</span>
              <span className="mdt-data-value">Firearm</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">MODEL:</span>
              <span className="mdt-data-value">Pistol - FN Five-Seven</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">OWNER:</span>
              <span className="mdt-data-value">JONES, BRAXTON</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">STATUS:</span>
              <span className="mdt-data-value">REGISTERED</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">NOTES:</span>
              <span className="mdt-data-value">Legally acquired, properly registered.</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render the wanted section
  const renderWanted = () => {
    return (
      <div className="mdt-search-container h-full">
        <h2 className="text-xl font-bold text-center text-blue-400 mb-4">Wanted Persons</h2>
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter name to add to wanted list"
            className="mdt-search-field flex-grow"
          />
          <button className="mdt-search-button">
            Add To Wanted
          </button>
        </div>
        
        <div className="mdt-data-table h-[calc(100vh-260px)] overflow-y-auto">
          <div className="mdt-section-header">----------MOST WANTED LIST----------</div>
          
          {mockWantedPersons.map((person, index) => (
            <div key={index} className="mdt-data-section mb-4">
              <div className="mdt-data-row">
                <span className="mdt-data-label">ID:</span>
                <span className="mdt-data-value">{person.id}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">NAME:</span>
                <span className="mdt-data-negative">{person.name}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">WANTED FOR:</span>
                <span className="mdt-data-value">{person.reason}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">LAST SEEN:</span>
                <span className="mdt-data-value">{person.lastSeen}</span>
              </div>
              <div className="mdt-data-row">
                <span className="mdt-data-label">DANGER LEVEL:</span>
                <span className="mdt-data-negative">{person.dangerLevel}</span>
              </div>
              <div className="flex justify-end mt-2">
                <button className="mdt-search-button">
                  Remove From List
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render the actions section
  const renderActions = () => {
    return (
      <div className="mdt-search-container h-full">
        <h2 className="text-xl font-bold text-center text-blue-400 mb-4">Officer Actions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="mdt-action-button">
            <Shield className="w-6 h-6" />
            <span>Request Backup</span>
          </button>
          
          <button className="mdt-action-button">
            <AlertTriangle className="w-6 h-6" />
            <span>Report Incident</span>
          </button>
          
          <button className="mdt-action-button">
            <Car className="w-6 h-6" />
            <span>Request Tow</span>
          </button>
          
          <button className="mdt-action-button">
            <Fingerprint className="w-6 h-6" />
            <span>Request Forensics</span>
          </button>
          
          <button className="mdt-action-button">
            <Users className="w-6 h-6" />
            <span>Request EMS</span>
          </button>
          
          <button className="mdt-action-button">
            <Pin className="w-6 h-6" />
            <span>Mark Location</span>
          </button>
          
          <button className="mdt-action-button">
            <BarChart3 className="w-6 h-6" />
            <span>View Statistics</span>
          </button>
          
          <button className="mdt-action-button">
            <Lock className="w-6 h-6" />
            <span>Access Evidence Locker</span>
          </button>
        </div>
      </div>
    );
  };

  // Render the financial history section
  const renderFinancialHistory = () => {
    return (
      <div className="mdt-search-container h-full">
        <h2 className="text-xl font-bold text-center text-blue-400 mb-4">Financial History</h2>
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter name or account number"
            className="mdt-search-field flex-grow"
          />
          <button className="mdt-search-button">
            Search Financial Records
          </button>
        </div>
        
        <div className="mdt-data-table h-[calc(100vh-260px)] overflow-y-auto">
          <div className="mdt-section-header">----------FINANCIAL RECORDS----------</div>
          
          <div className="mdt-data-section mb-4">
            <div className="mdt-section-header">ACCOUNT SUMMARY</div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">NAME:</span>
              <span className="mdt-data-value">JONES, BRAXTON</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">BANK:</span>
              <span className="mdt-data-value">Maze Bank</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">ACCT NUMBER:</span>
              <span className="mdt-data-value">******8742</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">BALANCE:</span>
              <span className="mdt-data-value">$12,450</span>
            </div>
          </div>
          
          <div className="mdt-section-header">RECENT TRANSACTIONS</div>
          
          <div className="mdt-data-section">
            <div className="mdt-data-row">
              <span className="mdt-data-label">2023-10-15:</span>
              <span className="mdt-data-value">-$2,500 (ATM Withdrawal)</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">2023-10-12:</span>
              <span className="mdt-data-value">+$3,700 (Direct Deposit)</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">2023-10-08:</span>
              <span className="mdt-data-value">-$850 (Premium Deluxe Motorsport)</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">2023-10-05:</span>
              <span className="mdt-data-value">-$1,200 (Weapon Shop Purchase)</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">2023-10-01:</span>
              <span className="mdt-data-value">+$3,700 (Direct Deposit)</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render the units section
  const renderUnits = () => {
    return (
      <div className="mdt-search-container h-full">
        <h2 className="text-xl font-bold text-center text-blue-400 mb-4">Active Units</h2>
        
        <div className="mdt-data-table h-[calc(100vh-200px)] overflow-y-auto">
          <div className="mdt-section-header">----------ACTIVE UNITS----------</div>
          
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4 mt-4">
            {mockUnits.map((unit, index) => (
              <div key={index} className="mdt-data-section">
                <div className="flex justify-between items-center">
                  <div className="text-xl font-bold text-[#00ff00]">{unit.callSign}</div>
                  <div className={`px-2 py-1 rounded ${
                    unit.status === "Code 1" ? "bg-green-500" :
                    unit.status === "Code 2" ? "bg-blue-500" :
                    unit.status === "Code 4" ? "bg-yellow-500" :
                    unit.status === "Code 5" ? "bg-purple-500" :
                    "bg-red-500"
                  } text-white`}>
                    {unit.status}
                  </div>
                </div>
                
                <div className="mdt-data-row mt-2">
                  <span className="mdt-data-label">OFFICER:</span>
                  <span className="mdt-data-value">{unit.officer}</span>
                </div>
                
                <div className="mdt-data-row">
                  <span className="mdt-data-label">LOCATION:</span>
                  <span className="mdt-data-value">{unit.location}</span>
                </div>
                
                <div className="flex justify-end mt-2">
                  <button className="mdt-search-button mr-2">
                    Contact Unit
                  </button>
                  <button className="mdt-search-button">
                    Send Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Render the flag section
  const renderFlag = () => {
    return (
      <div className="mdt-search-container h-full">
        <h2 className="text-xl font-bold text-center text-blue-400 mb-4">Flag Police Unit Stolen</h2>
        
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Enter police vehicle ID"
            className="mdt-search-field flex-grow"
          />
          <button className="mdt-search-button bg-red-600 hover:bg-red-700">
            Flag As Stolen
          </button>
        </div>
        
        <div className="mdt-data-table h-[calc(100vh-260px)] overflow-y-auto">
          <div className="mdt-section-header">----------FLAGGED VEHICLES----------</div>
          
          <div className="mdt-data-section">
            <div className="mdt-data-row">
              <span className="mdt-data-label">VEHICLE ID:</span>
              <span className="mdt-data-negative">LSPD-112</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">MODEL:</span>
              <span className="mdt-data-value">Police Interceptor</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">LICENSE:</span>
              <span className="mdt-data-value">PD-1244</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">STATUS:</span>
              <span className="mdt-data-negative">STOLEN</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">TIME REPORTED:</span>
              <span className="mdt-data-value">2023-10-16 14:23</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">REPORTED BY:</span>
              <span className="mdt-data-value">Officer Johnson</span>
            </div>
            <div className="flex justify-end mt-2">
              <button className="mdt-search-button">
                Remove Flag
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Render the law section
  const renderLaw = () => {
    return (
      <div className="mdt-search-container h-full">
        <h2 className="text-xl font-bold text-center text-blue-400 mb-4">Law Enforcement Assistance Program (LEAP)</h2>
        
        <div className="mdt-data-table h-[calc(100vh-200px)] overflow-y-auto">
          <div className="mdt-section-header">----------PENAL CODE REFERENCE----------</div>
          
          <div className="mdt-data-section mb-4">
            <div className="mdt-section-header">TRAFFIC VIOLATIONS</div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">T-101:</span>
              <span className="mdt-data-value">Speeding (1-15 over) - $100</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">T-102:</span>
              <span className="mdt-data-value">Speeding (16-30 over) - $250</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">T-103:</span>
              <span className="mdt-data-value">Speeding (31+ over) - $500</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">T-104:</span>
              <span className="mdt-data-value">Running Red Light - $150</span>
            </div>
          </div>
          
          <div className="mdt-data-section mb-4">
            <div className="mdt-section-header">MISDEMEANORS</div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">M-201:</span>
              <span className="mdt-data-value">Petty Theft - $500</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">M-202:</span>
              <span className="mdt-data-value">Trespassing - $750</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">M-203:</span>
              <span className="mdt-data-value">Assault - $1,000</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">M-204:</span>
              <span className="mdt-data-value">Public Intoxication - $500</span>
            </div>
          </div>
          
          <div className="mdt-data-section">
            <div className="mdt-section-header">FELONIES</div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">F-301:</span>
              <span className="mdt-data-value">Grand Theft - $2,500</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">F-302:</span>
              <span className="mdt-data-value">Armed Robbery - $5,000</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">F-303:</span>
              <span className="mdt-data-value">Assault with a Deadly Weapon - $7,500</span>
            </div>
            <div className="mdt-data-row">
              <span className="mdt-data-label">F-304:</span>
              <span className="mdt-data-value">Drug Trafficking - $10,000</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Control Panel */}
        <div className="md:col-span-3 space-y-4">
          {!isLoggedIn ? (
            <div className="flex justify-center items-center min-h-[80vh] md:col-span-12 md:absolute md:inset-0 md:z-10">
              <div className="mdt-panel p-4 space-y-6 w-full max-w-md mx-auto">
                <div className="flex justify-center mb-4">
                  <Fingerprint className="w-16 h-16 text-gray-400" />
                </div>
                <h2 className="text-2xl font-bold text-center mb-6">MDT Login</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="callsign" className="text-sm font-medium">
                      Enter Call Sign
                    </label>
                    <Input
                      id="callsign"
                      placeholder="1-ADAM-12"
                      value={callSign}
                      onChange={(e) => setCallSign(e.target.value)}
                      className="bg-accent text-foreground"
                    />
                  </div>
                  
                  <button 
                    onClick={handleLogin} 
                    className="mdt-button w-full mx-auto mt-6"
                  >
                    <Shield className="w-4 h-4" />
                    Login to MDT
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="mdt-panel p-4 space-y-3">
              <h2 className="text-lg font-bold mb-4">Control Panel</h2>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Current Status</p>
                <div className={`mdt-status ${statusColors[currentStatus]}`}>
                  {currentStatus} - {statusDescriptions[currentStatus]}
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground">Change Status</label>
                <Select defaultValue={currentStatus} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full bg-accent text-foreground">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border">
                    {Object.keys(statusColors).map((status) => (
                      <SelectItem key={status} value={status}>
                        {status} - {statusDescriptions[status]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <button onClick={handleDuress} className="mdt-button-danger">
                <AlertTriangle className="w-4 h-4" />
                DURESS
              </button>

              <button onClick={() => setActiveSection("law")} className="mdt-button">
                <Shield className="w-4 h-4" />
                Law Enforcement Assistance Program (LEAP)
              </button>
              
              <button onClick={() => setActiveSection("flag")} className="mdt-button">
                <Car className="w-4 h-4" />
                Flag Police Unit Stolen
              </button>

              <button onClick={handleLogout} className="mdt-button">
                <LogOut className="w-4 h-4" />
                Logout of MDT
              </button>
              
              <button className="mdt-button">
                <X className="w-4 h-4" />
                Exit
              </button>
            </div>
          )}
        </div>

        {/* Main MDT Panel */}
        {isLoggedIn && (
          <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Navigation Panel */}
            <div className="md:col-span-3 mdt-panel p-4 space-y-3">
              <button 
                onClick={() => setActiveSection("search")} 
                className={`mdt-button ${activeSection === "search" ? "bg-[#ff3a00] text-white" : ""}`}
              >
                <Search className="w-4 h-4" />
                SEARCH PEOPLE
              </button>
              
              <button 
                onClick={() => setActiveSection("vehicles")} 
                className={`mdt-button ${activeSection === "vehicles" ? "bg-[#ff3a00] text-white" : ""}`}
              >
                <Car className="w-4 h-4" />
                SEARCH VEHICLE
              </button>
              
              <button 
                onClick={() => setActiveSection("history")} 
                className={`mdt-button ${activeSection === "history" ? "bg-[#ff3a00] text-white" : ""}`}
              >
                <History className="w-4 h-4" />
                SEARCH HISTORY
              </button>
              
              <button 
                onClick={() => setActiveSection("criminal")} 
                className={`mdt-button ${activeSection === "criminal" ? "bg-[#ff3a00] text-white" : ""}`}
              >
                <FileText className="w-4 h-4" />
                CRIM HISTORY
              </button>
              
              <button 
                onClick={() => setActiveSection("traffic")} 
                className={`mdt-button ${activeSection === "traffic" ? "bg-[#ff3a00] text-white" : ""}`}
              >
                <Car className="w-4 h-4" />
                TRAFFIC OFFENCES
              </button>
              
              <button 
                onClick={() => setActiveSection("reports")} 
                className={`mdt-button ${activeSection === "reports" ? "bg-[#ff3a00] text-white" : ""}`}
              >
                <FileText className="w-4 h-4" />
                REPORTS
              </button>
              
              <button 
                onClick={() => setActiveSection("serials")} 
                className={`mdt-button ${activeSection === "serials" ? "bg-[#ff3a00] text-white" : ""}`}
              >
                <Database className="w-4 h-4" />
                SERIALS
              </button>
              
              <button 
                onClick={() => setActiveSection("wanted")} 
                className={`mdt-button ${activeSection === "wanted" ? "bg-[#ff3a00] text-white" : ""}`}
              >
                <UserCheck className="w-4 h-4" />
                WANTED
              </button>
              
              <button 
                onClick={() => setActiveSection("actions")} 
                className={`mdt-button ${activeSection === "actions" ? "bg-[#ff3a00] text-white" : ""}`}
              >
                <Briefcase className="w-4 h-4" />
                ACTIONS
              </button>
              
              <button 
                onClick={() => setActiveSection("financial")} 
                className={`mdt-button ${activeSection === "financial" ? "bg-[#ff3a00] text-white" : ""}`}
              >
                <Database className="w-4 h-4" />
                FINANCIAL HISTORY
              </button>
              
              <button 
                onClick={() => setActiveSection("units")} 
                className={`mdt-button ${activeSection === "units" ? "bg-[#ff3a00] text-white" : ""}`}
              >
                <Users className="w-4 h-4" />
                UNITS
              </button>
              
              <button 
                onClick={() => setActiveSection("dashboard")}
                className="mdt-button mt-4"
              >
                <ArrowLeftCircle className="w-4 h-4" />
                EXIT
              </button>
            </div>

            {/* Content Panel */}
            <div className="md:col-span-9 mdt-panel p-4 h-[calc(100vh-120px)]">
              {activeSection === "search" ? (
                renderSearchPerson()
              ) : activeSection === "vehicles" ? (
                renderSearchVehicle()
              ) : activeSection === "history" ? (
                renderSearchHistory()
              ) : activeSection === "criminal" ? (
                renderCriminalHistory()
              ) : activeSection === "traffic" ? (
                renderTrafficOffences()
              ) : activeSection === "reports" ? (
                renderReports()
              ) : activeSection === "serials" ? (
                renderSerials()
              ) : activeSection === "wanted" ? (
                renderWanted()
              ) : activeSection === "actions" ? (
                renderActions()
              ) : activeSection === "financial" ? (
                renderFinancialHistory()
              ) : activeSection === "units" ? (
                renderUnits()
              ) : activeSection === "flag" ? (
                renderFlag()
              ) : activeSection === "law" ? (
                renderLaw()
              ) : (
                <div>
                  <h2 className="text-xl font-bold mb-4 capitalize">
                    {activeSection === "dashboard" ? "Welcome to MDT" : activeSection}
                  </h2>
                  
                  <p className="text-muted-foreground">
                    {activeSection === "dashboard" 
                      ? `Officer ${callSign}, select an option from the left panel to begin.`
                      : `${activeSection} content will be implemented here.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
