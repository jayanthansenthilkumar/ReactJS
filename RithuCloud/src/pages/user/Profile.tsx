
import React from "react";
import UserLayout from "@/components/layouts/UserLayout";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  const planFeatures = {
    free: [
      { title: "Storage Space", value: "5 GB" },
      { title: "File Upload Size", value: "100 MB" },
      { title: "Bandwidth", value: "10 GB / Month" },
      { title: "Ad-Free Experience", value: "No" },
      { title: "Priority Support", value: "No" },
    ],
    pro: [
      { title: "Storage Space", value: "50 GB" },
      { title: "File Upload Size", value: "5 GB" },
      { title: "Bandwidth", value: "100 GB / Month" },
      { title: "Ad-Free Experience", value: "Yes" },
      { title: "Priority Support", value: "Yes" },
    ],
  };

  const handleSave = () => {
    toast({
      title: "Profile updated",
      description: "Your profile information has been saved",
    });
  };

  return (
    <UserLayout title="Profile">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs defaultValue="account">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>
                    Update your account details and personal information.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="bg-cloud-blue text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-semibold">
                      {user?.name.charAt(0) || 'J'}
                    </div>
                    <div>
                      <Button variant="outline" size="sm">
                        Change Avatar
                      </Button>
                    </div>
                  </div>
                  
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Full Name
                        </label>
                        <Input
                          id="name"
                          placeholder="Your name"
                          defaultValue={user?.name || 'John Doe'}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@example.com"
                          defaultValue={user?.email || 'john@example.com'}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="bio" className="text-sm font-medium">
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        className="w-full min-h-[100px] p-2 border rounded-md"
                        placeholder="Tell us a little about yourself"
                      ></textarea>
                    </div>
                    
                    <Button type="button" onClick={handleSave} className="bg-cloud-blue hover:bg-blue-600">
                      Save Changes
                    </Button>
                  </form>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Account Preferences</CardTitle>
                  <CardDescription>
                    Manage your notification and display settings.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-500">
                          Receive updates about account activity
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-cloud-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cloud-blue"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">File Activity Alerts</p>
                        <p className="text-sm text-gray-500">
                          Get notified when files are shared with you
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-cloud-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cloud-blue"></div>
                      </label>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-gray-500">
                          Switch between light and dark mode
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:ring-2 peer-focus:ring-cloud-blue rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cloud-blue"></div>
                      </label>
                    </div>
                  </div>
                  
                  <Button type="button" variant="outline" className="mt-6">
                    Save Preferences
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security" className="mt-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Password</CardTitle>
                  <CardDescription>
                    Update your password to keep your account secure.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="current-password" className="text-sm font-medium">
                      Current Password
                    </label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="••••••••••"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="new-password" className="text-sm font-medium">
                        New Password
                      </label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="••••••••••"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="confirm-password" className="text-sm font-medium">
                        Confirm Password
                      </label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="••••••••••"
                      />
                    </div>
                  </div>
                  
                  <Button type="button" className="bg-cloud-blue hover:bg-blue-600">
                    Update Password
                  </Button>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">
                        Two-Factor Authentication is <span className="text-red-500">disabled</span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Add an extra layer of security by enabling 2FA.
                      </p>
                    </div>
                    <Button type="button">Enable 2FA</Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Sessions</CardTitle>
                  <CardDescription>
                    Manage your active sessions across devices.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Chrome on Windows • 192.168.1.1 • Active now
                        </p>
                      </div>
                      <Badge variant="outline" className="border-green-500 text-green-600">
                        Active
                      </Badge>
                    </div>
                    
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-xs text-gray-500 mt-1">
                          iPhone 13 • 192.168.1.2 • 2 hours ago
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700 hover:border-red-200">
                        Logout
                      </Button>
                    </div>
                    
                    <div className="text-center">
                      <Button variant="outline" className="w-full">Logout from all devices</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="billing" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>
                    View your current plan and upgrade if needed.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 border rounded-lg p-4 mb-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge className={user?.storage?.plan === "pro" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                          {user?.storage?.plan === "pro" ? "Pro Plan" : "Free Plan"}
                        </Badge>
                        <p className="mt-2 font-semibold text-xl">
                          {user?.storage?.plan === "pro" ? "$9.99/month" : "Free"}
                        </p>
                      </div>
                      
                      {user?.storage?.plan === "free" ? (
                        <Button className="bg-cloud-blue hover:bg-blue-600">
                          Upgrade to Pro
                        </Button>
                      ) : (
                        <Button variant="outline">
                          Manage Subscription
                        </Button>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-sm font-medium mb-2">Your plan includes:</p>
                      <ul className="text-sm space-y-1">
                        {(user?.storage?.plan === "pro" ? planFeatures.pro : planFeatures.free).map((feature, index) => (
                          <li key={index} className="flex justify-between">
                            <span className="text-gray-600">{feature.title}</span>
                            <span className="font-medium">{feature.value}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  {user?.storage?.plan === "free" && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold">Compare Plans</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead className="border-b">
                            <tr>
                              <th className="text-left pb-2">Feature</th>
                              <th className="text-left pb-2">Free</th>
                              <th className="text-left pb-2">Pro</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            <tr>
                              <td className="py-2">Storage</td>
                              <td className="py-2">5 GB</td>
                              <td className="py-2 font-medium">50 GB</td>
                            </tr>
                            <tr>
                              <td className="py-2">File Upload Size</td>
                              <td className="py-2">100 MB</td>
                              <td className="py-2 font-medium">5 GB</td>
                            </tr>
                            <tr>
                              <td className="py-2">Bandwidth</td>
                              <td className="py-2">10 GB / Month</td>
                              <td className="py-2 font-medium">100 GB / Month</td>
                            </tr>
                            <tr>
                              <td className="py-2">Ad-Free</td>
                              <td className="py-2">❌</td>
                              <td className="py-2 font-medium">✓</td>
                            </tr>
                            <tr>
                              <td className="py-2">Priority Support</td>
                              <td className="py-2">❌</td>
                              <td className="py-2 font-medium">✓</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      
                      <div className="text-center mt-6">
                        <Button className="bg-cloud-blue hover:bg-blue-600">
                          Upgrade to Pro for $9.99/month
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Member since</span>
                  <span className="font-medium">April 2023</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Plan</span>
                  <Badge className={user?.storage?.plan === "pro" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                    {user?.storage?.plan === "pro" ? "Pro" : "Free"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Storage</span>
                  <span className="font-medium">
                    {(user?.storage?.used / 1000).toFixed(1)} / {user?.storage?.total / 1000} GB
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Files</span>
                  <span className="font-medium">124</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    Export Account Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-amber-600 hover:text-amber-700 hover:bg-amber-50">
                    Delete All Files
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                    Delete Account
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Referral Program</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Invite friends and get 1 GB free storage for each referral.
              </p>
              
              <div className="flex">
                <Input
                  readOnly
                  value="https://cloudcanvas.com/ref/john123"
                  className="rounded-r-none"
                />
                <Button className="rounded-l-none bg-cloud-blue hover:bg-blue-600">
                  Copy
                </Button>
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Referrals</span>
                  <span className="font-medium">2</span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm text-gray-500">Bonus Storage</span>
                  <span className="font-medium">2 GB</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
