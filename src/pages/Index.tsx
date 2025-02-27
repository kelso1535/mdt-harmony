
import { useState } from "react";
import { Shield, AlertTriangle, LogOut, Search, Car, History, FileText, Database, UserCheck, Briefcase, Users } from "lucide-react";
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

const Index = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Code 1");
  const [activeSection, setActiveSection] = useState("dashboard");
  const [callSign, setCallSign] = useState("");

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

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Control Panel */}
        <div className="md:col-span-3 space-y-4">
          {!isLoggedIn ? (
            <div className="flex justify-center items-center min-h-[80vh]">
              <div className="mdt-panel p-4 space-y-6 w-full max-w-md mx-auto">
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

              <button onClick={handleLogout} className="mdt-button">
                <LogOut className="w-4 h-4" />
                Logout of MDT
              </button>
            </div>
          )}
        </div>

        {/* Main MDT Panel */}
        {isLoggedIn && (
          <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-12 gap-4">
            {/* Navigation Panel */}
            <div className="md:col-span-3 mdt-panel p-4 space-y-3">
              <button onClick={() => setActiveSection("search")} className="mdt-button">
                <Search className="w-4 h-4" />
                SEARCH PEOPLE
              </button>
              
              <button onClick={() => setActiveSection("vehicles")} className="mdt-button">
                <Car className="w-4 h-4" />
                SEARCH VEHICLE
              </button>
              
              <button onClick={() => setActiveSection("history")} className="mdt-button">
                <History className="w-4 h-4" />
                SEARCH HISTORY
              </button>
              
              <button onClick={() => setActiveSection("criminal")} className="mdt-button">
                <FileText className="w-4 h-4" />
                CRIM HISTORY
              </button>
              
              <button onClick={() => setActiveSection("traffic")} className="mdt-button">
                <Car className="w-4 h-4" />
                TRAFFIC OFFENCES
              </button>
              
              <button onClick={() => setActiveSection("reports")} className="mdt-button">
                <FileText className="w-4 h-4" />
                REPORTS
              </button>
              
              <button onClick={() => setActiveSection("serials")} className="mdt-button">
                <Database className="w-4 h-4" />
                SERIALS
              </button>
              
              <button onClick={() => setActiveSection("wanted")} className="mdt-button">
                <UserCheck className="w-4 h-4" />
                WANTED
              </button>
              
              <button onClick={() => setActiveSection("actions")} className="mdt-button">
                <Briefcase className="w-4 h-4" />
                ACTIONS
              </button>
              
              <button onClick={() => setActiveSection("financial")} className="mdt-button">
                <Database className="w-4 h-4" />
                FINANCIAL HISTORY
              </button>
              
              <button onClick={() => setActiveSection("units")} className="mdt-button">
                <Users className="w-4 h-4" />
                UNITS
              </button>
            </div>

            {/* Content Panel */}
            <div className="md:col-span-9 mdt-panel p-4">
              <h2 className="text-xl font-bold mb-4 capitalize">
                {activeSection === "dashboard" ? "Welcome to MDT" : activeSection}
              </h2>
              
              {/* Content will be implemented based on activeSection */}
              <p className="text-muted-foreground">
                {activeSection === "dashboard" 
                  ? `Officer ${callSign}, select an option from the left panel to begin.`
                  : `${activeSection} content will be implemented here.`}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
