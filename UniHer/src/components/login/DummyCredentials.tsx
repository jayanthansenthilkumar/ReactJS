
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const dummyUsers = [
  { role: 'Student', email: 'student@uniher.edu', password: 'student123', name: 'Jane Doe' },
  { role: 'Mentor', email: 'mentor@uniher.edu', password: 'mentor123', name: 'Dr. Sarah Johnson' },
  { role: 'Admin', email: 'admin@uniher.edu', password: 'admin123', name: 'Admin User' },
];

const DummyCredentials = () => {
  return (
    <Card className="mt-6 mb-4">
      <CardHeader>
        <CardTitle className="text-lg text-center">Demo Credentials</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Password</TableHead>
              <TableHead>Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyUsers.map((user) => (
              <TableRow key={user.role}>
                <TableCell className="font-medium">{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>{user.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <p className="text-xs text-gray-500 mt-4 text-center">
          These are demo credentials for testing purposes only.
        </p>
      </CardContent>
    </Card>
  );
};

export default DummyCredentials;
