import { useState } from "react";
import { Shield, AlertTriangle, LogOut, Search, Car, History, FileText, Database, UserCheck, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("Code 1");
  const [activeSection, setActiveSection] = useState("dashboard");

  const handleLogin = () => {
    setIsLoggedIn(true);
    toast({
      title: "Logged In",
      description: "Successfully logged into MDT",
    });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveSection("dashboard");
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

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Left Control Panel */}
        <div className="md:col-span-3 space-y-4">
          <div className="mdt-panel p-4 space-y-3">
            <h2 className="text-lg font-bold mb-4">Control Panel</h2>
            
            {!isLoggedIn ? (
              <button onClick={handleLogin} className="mdt-button">
                <Shield className="w-4 h-4" />
                Login to MDT
              </button>
            ) : (
              <>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Current Status</p>
                  <div className={`mdt-status ${statusColors[currentStatus]}`}>
                    {currentStatus}
                  </div>
                </div>
                
                <div className="space-y-2">
                  {Object.keys(statusColors).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      className="mdt-button"
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <button onClick={handleDuress} className="mdt-button-danger">
                  <AlertTriangle className="w-4 h-4" />
                  DURESS
                </button>

                <button onClick={handleLogout} className="mdt-button">
                  <LogOut className="w-4 h-4" />
                  Logout of MDT
                </button>
              </>
            )}
          </div>
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
                  ? "Select an option from the left panel to begin."
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