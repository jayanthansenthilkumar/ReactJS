
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Globe, 
  Lock, 
  Shield, 
  Settings, 
  MessageSquare, 
  Users, 
  FileText,
  Mail,
  Database,
  Zap
} from 'lucide-react';

const AdminSettings = () => {
  return (
    <DashboardLayout userType="admin">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-sherise-purple-dark">Platform Settings</h1>
        <p className="text-gray-600">Configure and manage platform settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <div className="bg-white rounded-md border border-sherise-purple/10 p-1">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 bg-transparent">
            <TabsTrigger value="general" className="data-[state=active]:bg-sherise-purple data-[state=active]:text-white">
              General
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-sherise-purple data-[state=active]:text-white">
              Users
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-sherise-purple data-[state=active]:text-white">
              Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-sherise-purple data-[state=active]:text-white">
              Notifications
            </TabsTrigger>
            <TabsTrigger value="advanced" className="data-[state=active]:bg-sherise-purple data-[state=active]:text-white">
              Advanced
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="general">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-sherise-purple" />
                  Platform Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Platform Name</p>
                    <p className="font-medium">SheRise</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Version</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">2.4.1</p>
                      <Badge className="bg-green-500">Latest</Badge>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Environment</p>
                    <p className="font-medium">Production</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">June 5, 2025</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-sherise-purple/10">
                  <p className="text-sm text-gray-500">Domains</p>
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="font-medium">sherise.org</p>
                      <p className="text-xs text-gray-500">Primary domain</p>
                    </div>
                    <Badge className="bg-green-500">Active</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t border-sherise-purple/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Maintenance Mode</p>
                      <p className="text-xs text-gray-500">Takes the platform offline for maintenance</p>
                    </div>
                    <Switch id="maintenance-mode" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5 text-sherise-purple" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Default Language</p>
                    <p className="text-xs text-gray-500">Primary language for new users</p>
                  </div>
                  <select className="rounded-md border border-sherise-purple/20 px-3 py-1 text-sm">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>Hindi</option>
                    <option>Arabic</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-sherise-purple/10 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Time Zone</p>
                    <p className="text-xs text-gray-500">Default system time zone</p>
                  </div>
                  <select className="rounded-md border border-sherise-purple/20 px-3 py-1 text-sm">
                    <option>UTC (GMT+0)</option>
                    <option>Eastern Time (GMT-5)</option>
                    <option>Pacific Time (GMT-8)</option>
                    <option>IST (GMT+5:30)</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-sherise-purple/10">
                  <p className="font-medium mb-2">Data Retention</p>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="border border-sherise-purple/10 p-2 rounded-md">
                      <p className="font-medium">User Activity</p>
                      <select className="w-full mt-1 rounded-md border border-sherise-purple/20 px-2 py-1 text-xs">
                        <option>30 days</option>
                        <option>60 days</option>
                        <option>90 days</option>
                        <option>180 days</option>
                        <option>1 year</option>
                      </select>
                    </div>
                    <div className="border border-sherise-purple/10 p-2 rounded-md">
                      <p className="font-medium">Session Logs</p>
                      <select className="w-full mt-1 rounded-md border border-sherise-purple/20 px-2 py-1 text-xs">
                        <option>14 days</option>
                        <option>30 days</option>
                        <option>60 days</option>
                        <option>90 days</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5 text-sherise-purple" />
                  Platform Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="border border-sherise-purple/10 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Terms of Service</h3>
                      <Badge variant="outline" className="text-xs">Last updated: May 10, 2025</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Legal agreement between SheRise and its users.</p>
                    <Button variant="outline" size="sm" className="border-sherise-purple/20 text-xs">
                      Edit Terms of Service
                    </Button>
                  </div>
                  
                  <div className="border border-sherise-purple/10 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Privacy Policy</h3>
                      <Badge variant="outline" className="text-xs">Last updated: May 12, 2025</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">How SheRise collects and processes user data.</p>
                    <Button variant="outline" size="sm" className="border-sherise-purple/20 text-xs">
                      Edit Privacy Policy
                    </Button>
                  </div>
                  
                  <div className="border border-sherise-purple/10 p-4 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">Community Guidelines</h3>
                      <Badge variant="outline" className="text-xs">Last updated: June 1, 2025</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Rules and standards for platform behavior.</p>
                    <Button variant="outline" size="sm" className="border-sherise-purple/20 text-xs">
                      Edit Guidelines
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5 text-sherise-purple" />
                  User Management Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">User Registration</p>
                    <p className="text-xs text-gray-500">Allow new users to register</p>
                  </div>
                  <Switch id="user-registration" defaultChecked />
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Verification</p>
                    <p className="text-xs text-gray-500">Require email verification for new accounts</p>
                  </div>
                  <Switch id="email-verification" defaultChecked />
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Anonymous Access</p>
                    <p className="text-xs text-gray-500">Allow access to certain features without an account</p>
                  </div>
                  <Switch id="anonymous-access" defaultChecked />
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10">
                  <p className="font-medium mb-2">User Role Management</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between border border-sherise-purple/10 p-3 rounded-md">
                      <div>
                        <p>Default User Role</p>
                        <p className="text-xs text-gray-500">Role assigned to new registrations</p>
                      </div>
                      <select className="rounded-md border border-sherise-purple/20 px-3 py-1 text-sm">
                        <option>Standard User</option>
                        <option>Premium User</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between border border-sherise-purple/10 p-3 rounded-md">
                      <div>
                        <p>Mentor Application</p>
                        <p className="text-xs text-gray-500">Allow users to apply for mentor status</p>
                      </div>
                      <Switch id="mentor-application" defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-sherise-purple" />
                  Content Moderation
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Automated Content Filtering</p>
                    <p className="text-xs text-gray-500">Filter inappropriate content using AI</p>
                  </div>
                  <Switch id="content-filtering" defaultChecked />
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Pre-moderation</p>
                    <p className="text-xs text-gray-500">Review user content before publishing</p>
                  </div>
                  <Switch id="pre-moderation" />
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10 flex items-center justify-between">
                  <div>
                    <p className="font-medium">User Reporting</p>
                    <p className="text-xs text-gray-500">Allow users to report inappropriate content</p>
                  </div>
                  <Switch id="user-reporting" defaultChecked />
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10">
                  <p className="font-medium mb-2">Content Filtering Level</p>
                  <select className="w-full rounded-md border border-sherise-purple/20 px-3 py-2 text-sm">
                    <option>Standard - Block explicitly harmful content</option>
                    <option>Strict - Also block potentially sensitive content</option>
                    <option>Custom - Use custom filter settings</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Determines how strictly content is filtered</p>
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10">
                  <Button variant="outline" size="sm" className="border-sherise-purple/20">
                    View Moderation Queue (12)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock className="h-5 w-5 text-sherise-purple" />
                  Authentication Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="text-xs text-gray-500">Require 2FA for admin accounts</p>
                  </div>
                  <Switch id="two-factor" defaultChecked />
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Password Requirements</p>
                    <p className="text-xs text-gray-500">Minimum complexity for user passwords</p>
                  </div>
                  <select className="rounded-md border border-sherise-purple/20 px-3 py-1 text-sm">
                    <option>Medium (8+ chars, mixed case)</option>
                    <option>High (10+ chars, symbols required)</option>
                    <option>Custom</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Session Timeout</p>
                    <p className="text-xs text-gray-500">Auto-logout after inactivity</p>
                  </div>
                  <select className="rounded-md border border-sherise-purple/20 px-3 py-1 text-sm">
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>4 hours</option>
                    <option>8 hours</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10 flex items-center justify-between">
                  <div>
                    <p className="font-medium">IP Restriction</p>
                    <p className="text-xs text-gray-500">Restrict admin access by IP address</p>
                  </div>
                  <Switch id="ip-restriction" />
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10">
                  <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
                    Update Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-sherise-purple" />
                  Privacy & Data Protection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Encryption</p>
                    <p className="text-xs text-gray-500">Encrypt sensitive user data</p>
                  </div>
                  <Switch id="data-encryption" defaultChecked />
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10 flex items-center justify-between">
                  <div>
                    <p className="font-medium">Anonymize User Data</p>
                    <p className="text-xs text-gray-500">For analytics and reporting</p>
                  </div>
                  <Switch id="anonymize-data" defaultChecked />
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10">
                  <p className="font-medium mb-2">Data Export Requests</p>
                  <div className="flex justify-between items-center border border-sherise-purple/10 p-3 rounded-md bg-sherise-purple/5">
                    <div>
                      <p className="text-sm">Pending Data Export Requests</p>
                      <p className="text-xs text-gray-500">User requests for personal data</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500">3 Pending</Badge>
                      <Button variant="outline" size="sm" className="border-sherise-purple/20 text-xs">
                        View Requests
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10">
                  <p className="font-medium mb-2">Data Deletion Requests</p>
                  <div className="flex justify-between items-center border border-sherise-purple/10 p-3 rounded-md bg-sherise-purple/5">
                    <div>
                      <p className="text-sm">Pending Data Deletion Requests</p>
                      <p className="text-xs text-gray-500">User requests for account deletion</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-amber-500">2 Pending</Badge>
                      <Button variant="outline" size="sm" className="border-sherise-purple/20 text-xs">
                        View Requests
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10">
                  <Button variant="outline" className="border-sherise-purple text-sherise-purple">
                    Generate Data Protection Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="notifications">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bell className="h-5 w-5 text-sherise-purple" />
                  System Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border border-sherise-purple/10 p-4 rounded-md">
                    <p className="font-medium mb-3">Security Alerts</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Login Attempts</p>
                        <Switch id="login-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Suspicious Activity</p>
                        <Switch id="suspicious-activity" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Permission Changes</p>
                        <Switch id="permission-changes" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-sherise-purple/10 p-4 rounded-md">
                    <p className="font-medium mb-3">System Status</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Performance Issues</p>
                        <Switch id="performance-issues" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Downtime Alerts</p>
                        <Switch id="downtime-alerts" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Database Usage</p>
                        <Switch id="database-usage" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-sherise-purple/10 p-4 rounded-md">
                    <p className="font-medium mb-3">User Activity</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">New Registrations</p>
                        <Switch id="new-registrations" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Content Reports</p>
                        <Switch id="content-reports" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Mentor Applications</p>
                        <Switch id="mentor-applications" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-sherise-purple/10 p-4 rounded-md">
                    <p className="font-medium mb-3">Support & Crisis</p>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Support Queue Alerts</p>
                        <Switch id="support-queue" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Crisis Interventions</p>
                        <Switch id="crisis-interventions" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm">Response Time Warnings</p>
                        <Switch id="response-time" defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Mail className="h-5 w-5 text-sherise-purple" />
                  Notification Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-xs text-gray-500">Send system alerts via email</p>
                      </div>
                      <Switch id="email-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-sherise-purple/10">
                      <div>
                        <p className="font-medium">Mobile Push Notifications</p>
                        <p className="text-xs text-gray-500">Send alerts to admin mobile app</p>
                      </div>
                      <Switch id="push-notifications" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-sherise-purple/10">
                      <div>
                        <p className="font-medium">Slack Integration</p>
                        <p className="text-xs text-gray-500">Send critical alerts to Slack channel</p>
                      </div>
                      <Switch id="slack-notifications" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="border border-sherise-purple/10 p-4 rounded-md">
                    <p className="font-medium mb-3">Email Settings</p>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm mb-1">Admin Email Recipients</p>
                        <input 
                          type="text" 
                          className="w-full rounded-md border border-sherise-purple/20 px-3 py-1 text-sm" 
                          value="admin@sherise.org, alerts@sherise.org" 
                          readOnly
                        />
                        <p className="text-xs text-gray-500 mt-1">Separate multiple emails with commas</p>
                      </div>
                      
                      <div>
                        <p className="text-sm mb-1">Email Frequency</p>
                        <select className="w-full rounded-md border border-sherise-purple/20 px-3 py-1 text-sm">
                          <option>Real-time (as events occur)</option>
                          <option>Hourly digest</option>
                          <option>Daily digest</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end mt-4">
                  <Button className="bg-sherise-purple text-white hover:bg-sherise-purple-dark">
                    Save Notification Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="advanced">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Database className="h-5 w-5 text-sherise-purple" />
                  Database Management
                </CardTitle>
                <CardDescription>Configure database settings and maintenance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Database Status</p>
                  <div className="flex items-center gap-2">
                    <div className="size-3 rounded-full bg-green-500"></div>
                    <p className="text-sm">Connected and healthy</p>
                  </div>
                  <p className="text-xs text-gray-500">Last checked: 10 minutes ago</p>
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10 grid grid-cols-2 gap-4">
                  <Button variant="outline" size="sm" className="border-sherise-purple/20">
                    Backup Database
                  </Button>
                  <Button variant="outline" size="sm" className="border-sherise-purple/20">
                    Optimization
                  </Button>
                  <Button variant="outline" size="sm" className="border-sherise-purple/20">
                    View Logs
                  </Button>
                  <Button variant="outline" size="sm" className="border-sherise-purple/20 text-red-500 hover:bg-red-500/5 hover:text-red-600">
                    Clear Cache
                  </Button>
                </div>
                
                <div className="pt-4 border-t border-sherise-purple/10">
                  <p className="text-sm font-medium mb-2">Automatic Backups</p>
                  <select className="w-full rounded-md border border-sherise-purple/20 px-3 py-2 text-sm">
                    <option>Daily (at 2:00 AM)</option>
                    <option>Every 12 hours</option>
                    <option>Weekly (Sunday at 2:00 AM)</option>
                    <option>Custom Schedule</option>
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Last backup: June 7, 2025 at 2:00 AM</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Zap className="h-5 w-5 text-sherise-purple" />
                  API & Integrations
                </CardTitle>
                <CardDescription>Manage API access and third-party integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">API Access</p>
                      <p className="text-xs text-gray-500">Allow external API access</p>
                    </div>
                    <Switch id="api-access" defaultChecked />
                  </div>
                  
                  <div className="pt-4 border-t border-sherise-purple/10">
                    <p className="text-sm font-medium mb-2">Active Integrations</p>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center border border-sherise-purple/10 p-3 rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="size-8 bg-blue-100 rounded-md flex items-center justify-center text-blue-600">S</div>
                          <div>
                            <p className="font-medium">Slack</p>
                            <p className="text-xs text-gray-500">Notifications & alerts</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500">Connected</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center border border-sherise-purple/10 p-3 rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="size-8 bg-purple-100 rounded-md flex items-center justify-center text-purple-600">Z</div>
                          <div>
                            <p className="font-medium">Zoom</p>
                            <p className="text-xs text-gray-500">Mentoring sessions</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500">Connected</Badge>
                      </div>
                      
                      <div className="flex justify-between items-center border border-sherise-purple/10 p-3 rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="size-8 bg-red-100 rounded-md flex items-center justify-center text-red-600">G</div>
                          <div>
                            <p className="font-medium">Google Analytics</p>
                            <p className="text-xs text-gray-500">Usage analytics</p>
                          </div>
                        </div>
                        <Badge variant="outline" className="border-amber-500 text-amber-500">Needs Update</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-sherise-purple/10">
                    <Button className="w-full bg-sherise-purple text-white hover:bg-sherise-purple-dark">
                      Manage Integrations
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Settings className="h-5 w-5 text-sherise-purple" />
                  System Maintenance
                </CardTitle>
                <CardDescription>Advanced system maintenance and optimization tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="border border-sherise-purple/10 p-4 rounded-md">
                    <h3 className="font-medium mb-2">Performance Optimization</h3>
                    <p className="text-sm text-gray-600 mb-3">Optimize application performance</p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full border-sherise-purple/20 text-xs">
                        Clear Application Cache
                      </Button>
                      <Button variant="outline" size="sm" className="w-full border-sherise-purple/20 text-xs">
                        Rebuild Assets
                      </Button>
                      <Button variant="outline" size="sm" className="w-full border-sherise-purple/20 text-xs">
                        Run Performance Tests
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border border-sherise-purple/10 p-4 rounded-md">
                    <h3 className="font-medium mb-2">System Logs</h3>
                    <p className="text-sm text-gray-600 mb-3">View and manage system logs</p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full border-sherise-purple/20 text-xs">
                        Error Logs
                      </Button>
                      <Button variant="outline" size="sm" className="w-full border-sherise-purple/20 text-xs">
                        Access Logs
                      </Button>
                      <Button variant="outline" size="sm" className="w-full border-sherise-purple/20 text-xs">
                        System Events
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border border-sherise-purple/10 p-4 rounded-md bg-red-50">
                    <h3 className="font-medium mb-2 text-red-600">Danger Zone</h3>
                    <p className="text-sm text-red-600 mb-3">Irreversible system actions</p>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full border-red-200 text-red-600 hover:bg-red-100 text-xs">
                        Purge All Data
                      </Button>
                      <Button variant="outline" size="sm" className="w-full border-red-200 text-red-600 hover:bg-red-100 text-xs">
                        Reset System
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default AdminSettings;
