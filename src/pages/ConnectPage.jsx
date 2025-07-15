import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function ConnectPage() {
  const [mode, setMode] = useState(null); // "mentor" or "mentee"
  const [userList, setUserList] = useState([]);
  const [connectionStatus, setConnectionStatus] = useState({}); // { userId: "pending" | "accepted" | "none" }

  // Fetch mentees or mentors based on selected mode
  useEffect(() => {
    if (!mode) return;

    const token = localStorage.getItem("authToken");

    fetch(`/api/${mode === "mentor" ? "mentees" : "mentors"}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        setUserList(data);
        // fetch connection status as well if needed
      });
  }, [mode]);

  const handleSendRequest = async (targetId) => {
    const token = localStorage.getItem("authToken");

    try {
      const res = await fetch(`/api/connect/request/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ targetId })
      });

      if (res.ok) {
        setConnectionStatus(prev => ({ ...prev, [targetId]: "pending" }));
      }
    } catch (err) {
      console.error("Request failed", err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {!mode && (
        <div className="text-center">
          <h2 className="text-2xl text-purple-500 font-bold mb-4">Who are you looking for?</h2>
          <div className="flex justify-center gap-4">
            <Button onClick={() => setMode("mentor")}>Find a Mentor</Button>
            <Button onClick={() => setMode("mentee")} variant="outline">Find a Mentee</Button>
          </div>
        </div>
      )}

      {mode && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">
              {mode === "mentor" ? "Available Mentors" : "Available Mentees"}
            </h3>
            <Button variant="ghost" onClick={() => setMode(null)}>← Back</Button>
          </div>

          {userList.length === 0 ? (
            <p className="text-gray-500">No users available right now.</p>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {userList.map(user => (
                <div key={user.id} className="p-4 border rounded-md shadow-sm bg-white">
                  <h4 className="text-lg font-semibold">{user.name}</h4>
                  <p className="text-sm text-gray-600">
                    {mode === "mentor" ? user.Field_of_Interest?.join(", ") : user.Expertise?.join(", ")}
                  </p>

                  <div className="mt-2">
                    {connectionStatus[user.id] === "accepted" ? (
                      <span className="text-green-600 font-medium">Accepted</span>
                    ) : connectionStatus[user.id] === "pending" ? (
                      <span className="text-yellow-500 font-medium">Pending</span>
                    ) : (
                      <Button size="sm" onClick={() => handleSendRequest(user.id)}>
                        Send Request
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
