import React from 'react';
import { 
  Calendar, 
  BookOpen, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Bot
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const StudyPlanner = () => {
  const tasks = [
    {
      id: 1,
      title: 'English Literature Essay',
      course: 'ENG 301',
      dueDate: 'Tomorrow',
      estimatedTime: '3 hours',
      priority: 'high',
      completed: false
    },
    {
      id: 2,
      title: 'Calculus Problem Set',
      course: 'MATH 201',
      dueDate: 'Friday',
      estimatedTime: '2 hours',
      priority: 'medium',
      completed: false
    },
    {
      id: 3,
      title: 'Psychology Reading',
      course: 'PSYCH 101',
      dueDate: 'Thursday',
      estimatedTime: '1 hour',
      priority: 'low',
      completed: true
    }
  ];
  
  const upcomingEvents = [
    {
      title: 'Physics Lab',
      time: '10:00 AM - 12:00 PM',
      location: 'Science Building 302'
    },
    {
      title: 'Study Group - Computer Science',
      time: '2:00 PM - 4:00 PM',
      location: 'Library, Room 101'
    },
    {
      title: 'Office Hours - Professor Johnson',
      time: '4:30 PM - 5:30 PM',
      location: 'Faculty Building, Room 204'
    }
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-heading font-semibold">Smart Study Planner</h3>
        <Button variant="outline" size="sm">
          <Calendar className="h-4 w-4 mr-2" /> View Schedule
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Study Tasks</span>
                <Button variant="ghost" size="sm" className="text-xs h-auto py-1">
                  View All
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map(task => (
                  <div 
                    key={task.id} 
                    className={`p-4 rounded-lg border border-border ${
                      task.completed ? 'bg-gray-50' : 'bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div>
                          {task.completed ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : task.priority === 'high' ? (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          ) : (
                            <BookOpen className="h-5 w-5 text-uniher-purple" />
                          )}
                        </div>
                        
                        <div>
                          <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : ''}`}>
                            {task.title}
                          </h4>
                          <p className="text-sm text-gray-600">{task.course}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs">
                            <span className="flex items-center text-gray-600">
                              <Calendar className="h-3 w-3 mr-1" /> Due: {task.dueDate}
                            </span>
                            <span className="flex items-center text-gray-600">
                              <Clock className="h-3 w-3 mr-1" /> Est: {task.estimatedTime}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <Button 
                          variant={task.completed ? "outline" : "default"} 
                          size="sm"
                          className={task.completed ? "" : "bg-uniher-purple hover:bg-uniher-purple-dark"}
                        >
                          {task.completed ? "Completed" : "Start Task"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingEvents.map((event, i) => (
                  <div key={i} className="flex items-center p-3 rounded-lg border border-border">
                    <div className="w-1 h-14 bg-uniher-purple rounded-full mr-4"></div>
                    <div>
                      <h4 className="font-medium">{event.title}</h4>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" /> {event.time}
                        </span>
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">Study Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-uniher-purple bg-opacity-10 border border-uniher-purple border-opacity-30">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-uniher-purple flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                    <h4 className="font-medium">AI Recommendation</h4>
                  </div>
                  <p className="text-sm">
                    Based on your cycle tracking and historical performance data, your focus is likely to be highest tomorrow morning. Consider tackling your English essay then.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Weekly Progress</h4>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-uniher-purple w-[65%] rounded-full"></div>
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-gray-600">
                    <span>13/20 tasks completed</span>
                    <span>65%</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Focus Times</h4>
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Morning</span>
                    <span>High Focus</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-green-500 w-[85%] rounded-full"></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Afternoon</span>
                    <span>Medium Focus</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div className="h-full bg-yellow-500 w-[60%] rounded-full"></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Evening</span>
                    <span>Low Focus</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 w-[35%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;
