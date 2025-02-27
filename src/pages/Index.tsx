
import { useState } from "react";
import { Shield, AlertTriangle, LogOut, Search, Car, History, FileText, Database, UserCheck, Briefcase, Users, FingerPrint, Pin, BarChart3, Lock, Shuffle, X, ArrowLeftCircle } from "lucide-react";
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

const Index = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Code 1");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [callSign, setCallSign] = useState("");
  const [searchName, setSearchName] = useState("");
  const [searchResults, setSearchResults] = useState<null | typeof mockPersonData>(null);

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
    toast({
      title: "Search Completed",
      description: `Found records for ${searchName}`,
    });
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

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Control Panel */}
        <div className="md:col-span-3 space-y-4">
          {!isLoggedIn ? (
            <div className="flex justify-center items-center min-h-[80vh] md:col-span-12 md:absolute md:inset-0 md:z-10">
              <div className="mdt-panel p-4 space-y-6 w-full max-w-md mx-auto">
                <div className="flex justify-center mb-4">
                  <FingerPrint className="w-16 h-16 text-gray-400" />
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
              ) : (
                <>
                  <h2 className="text-xl font-bold mb-4 capitalize">
                    {activeSection === "dashboard" ? "Welcome to MDT" : activeSection}
                  </h2>
                  
                  <p className="text-muted-foreground">
                    {activeSection === "dashboard" 
                      ? `Officer ${callSign}, select an option from the left panel to begin.`
                      : `${activeSection} content will be implemented here.`}
                  </p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
